import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenVal = localStorage.getItem('auth');
    const clonedRequest = req.clone({
      headers: req
        .headers
        .set('Authorization', tokenVal ? `Bearer ${tokenVal}` : '')
    });
    return next.handle(clonedRequest);
  }
}