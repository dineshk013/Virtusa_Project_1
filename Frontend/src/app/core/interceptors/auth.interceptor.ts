import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get token from localStorage
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('revcart_token') : null;

    // Clone request and add Authorization header if token exists
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('revcart_token');
            localStorage.removeItem('revcart_user');
          }
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        } else if (error.status === 403) {
          // Access forbidden
          this.router.navigate(['/']);
        }
        return throwError(() => error);
      })
    );
  }
}
