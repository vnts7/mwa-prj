import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = new AuthService().readToken();
    const clonedRequest = req.clone({
      headers: req
        .headers
        .set('Authorization', token ? `${token}` : '')
    });
    return next.handle(clonedRequest);
  }
}