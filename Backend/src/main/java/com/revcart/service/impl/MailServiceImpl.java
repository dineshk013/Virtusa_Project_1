package com.revcart.service.impl;

import com.revcart.service.MailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    private static final Logger log = Logger.getLogger(MailServiceImpl.class.getName());

    private final JavaMailSender mailSender;

    @Value("${spring.mail.from:#{null}}")
    private String configuredFrom;

    @Value("${spring.application.name:RevCart}")
    private String appName;

    public MailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendOtp(String email, String otp) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(
                    message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            helper.setTo(email);
            helper.setSubject(appName + " OTP Verification");
            if (configuredFrom != null && !configuredFrom.isBlank()) {
//                helper.setFrom(configuredFrom, appName + " Support");
            }
            helper.setText(buildHtmlBody(otp), true);
            mailSender.send(message);
        } catch (MessagingException | MailException ex) {
            log.warning("Failed to send email, falling back to log-only mode: " + ex.getMessage());
            log.info("OTP for " + email + " is " + otp);
        }
    }

    private String buildHtmlBody(String otp) {
        return """
                <div style="font-family: Arial, sans-serif; color:#0f172a;">
                  <h2 style="color:#2563eb;">%s Email Verification</h2>
                  <p>Use the following One-Time Password to verify your account. It expires in 10 minutes.</p>
                  <div style="font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 16px 24px; background:#eef2ff; border-radius:12px; display:inline-block; margin: 16px 0;">
                    %s
                  </div>
                  <p>If you did not request this, please ignore this email.</p>
                  <p>— The %s Team</p>
                </div>
                """.formatted(appName, otp, appName);
    }
}

