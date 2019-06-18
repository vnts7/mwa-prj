import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) {

  }
  register(user): Observable<any> {
    return new Observable(observer => {
      this.http.post('/api/user/register', user).subscribe((r: any) => {
        observer.next(r);
        this.auth.saveToken(r.data);
        observer.complete();
      })
    });
  }
  login(user): Observable<any> {
    return new Observable(observer => {
      this.http.post('/api/user/login', user).subscribe((r: any) => {
        observer.next(r);
        this.auth.saveToken(r.data);
        observer.complete();
      })
    });
  }
}
