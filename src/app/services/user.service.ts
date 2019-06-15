import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }
  register(user): Observable<any> {
    return new Observable(observer => {
      this.http.post('/api/user', user).subscribe((data: any) => {
        observer.next(data);
        //set user
        //save token
        observer.complete();
      })
    });
  }
}
