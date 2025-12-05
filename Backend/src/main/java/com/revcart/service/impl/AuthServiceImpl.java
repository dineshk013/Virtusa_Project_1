package com.revcart.service.impl;

import com.revcart.dto.ApiResponse;
import com.revcart.dto.AuthResponse;
import com.revcart.dto.UserDto;
import com.revcart.dto.request.AuthRequest;
import com.revcart.dto.request.OtpVerificationRequest;
import com.revcart.dto.request.PasswordResetRequest;
import com.revcart.dto.request.RegisterRequest;
import com.revcart.entity.OtpToken;
import com.revcart.entity.User;
import com.revcart.enums.UserRole;
import com.revcart.exception.BadRequestException;
import com.revcart.exception.ResourceNotFoundException;
import com.revcart.mapper.UserMapper;
import com.revcart.repository.OtpTokenRepository;
import com.revcart.repository.UserRepository;
import com.revcart.security.JwtTokenProvider;
import com.revcart.service.ActivityLogService;
import com.revcart.service.AuthService;
import com.revcart.service.MailService;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final OtpTokenRepository otpTokenRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final ActivityLogService activityLogService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            MailService mailService,
            OtpTokenRepository otpTokenRepository,
            AuthenticationManager authenticationManager,
            JwtTokenProvider jwtTokenProvider,
            ActivityLogService activityLogService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailService = mailService;
        this.otpTokenRepository = otpTokenRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.activityLogService = activityLogService;
    }

    @Override
    public ApiResponse<String> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered");
        }
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(request.getRole() != null ? request.getRole() : UserRole.CUSTOMER);
        user.getAuthorities().add("ROLE_" + user.getRole().name());
        userRepository.save(user);
        activityLogService.log(user.getId(), "REGISTER", Map.of("email", user.getEmail()));
        createAndSendOtp(user.getEmail());
        return ApiResponse.<String>builder()
                .success(true)
                .message("User registered. Please verify OTP sent to your email.")
                .build();
    }

    @Override
    public ApiResponse<AuthResponse> login(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            if (!user.isEmailVerified()) {
                throw new BadRequestException("Email not verified");
            }
            if (!user.isActive()) {
                throw new BadRequestException("Account is disabled. Please contact administrator.");
            }
            String token = jwtTokenProvider.generateToken(authentication);
            activityLogService.log(user.getId(), "LOGIN", Map.of("email", user.getEmail()));
            AuthResponse payload = AuthResponse.builder()
                    .token(token)
                    .userId(user.getId())
                    .email(user.getEmail())
                    .name(user.getFullName())
                    .role(user.getRole() != null ? user.getRole() : UserRole.CUSTOMER)
                    .build();

            return ApiResponse.<AuthResponse>builder()
                    .success(true)
                    .message("Login successful")
                    .data(payload)
                    .build();
        } catch (org.springframework.security.core.AuthenticationException ex) {
            throw new BadRequestException("Invalid email or password");
        }
    }

    @Override
    public ApiResponse<String> verifyOtp(OtpVerificationRequest request) {
        OtpToken token = otpTokenRepository.findTopByEmailOrderByCreatedAtDesc(request.getEmail())
                .orElseThrow(() -> new BadRequestException("OTP not found"));
        if (token.isConsumed() || token.getExpiresAt().isBefore(Instant.now())) {
            throw new BadRequestException("OTP expired");
        }
        if (!token.getOtpCode().equals(request.getOtp())) {
            throw new BadRequestException("Invalid OTP");
        }
        token.setConsumed(true);
        otpTokenRepository.save(token);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setEmailVerified(true);
        userRepository.save(user);
        return ApiResponse.<String>builder()
                .success(true)
                .message("Email verified successfully")
                .build();
    }

    @Override
    public ApiResponse<String> resendOtp(String email) {
        createAndSendOtp(email);
        return ApiResponse.<String>builder()
                .success(true)
                .message("OTP resent successfully")
                .build();
    }

    @Override
    public ApiResponse<String> forgotPassword(String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        createAndSendOtp(email);
        return ApiResponse.<String>builder()
                .success(true)
                .message("OTP sent to your email")
                .build();
    }

    @Override
    public ApiResponse<UserDto> resetPassword(PasswordResetRequest request) {
        OtpToken token = otpTokenRepository.findTopByEmailOrderByCreatedAtDesc(request.getEmail())
                .orElseThrow(() -> new BadRequestException("OTP not found"));
        if (!token.getOtpCode().equals(request.getOtp()) || token.getExpiresAt().isBefore(Instant.now())) {
            throw new BadRequestException("Invalid OTP");
        }
        token.setConsumed(true);
        otpTokenRepository.save(token);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return ApiResponse.<UserDto>builder()
                .success(true)
                .message("Password reset successful")
                .data(UserMapper.toDto(user))
                .build();
    }

    private void createAndSendOtp(String email) {
        String otp = generateOtp();
        OtpToken token = new OtpToken();
        token.setEmail(email);
        token.setOtpCode(otp);
        token.setExpiresAt(Instant.now().plus(10, ChronoUnit.MINUTES));
        otpTokenRepository.save(token);
        mailService.sendOtp(email, otp);
    }

    private String generateOtp() {
        return String.valueOf(100000 + new SecureRandom().nextInt(900000));
    }

}

