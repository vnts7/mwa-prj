import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
    return new Observable(observer$ => {
      this.http.get('/api/profile').subscribe((r) => {
        observer$.next(r);
        observer$.complete();
      });
    })
  }

  updateProfile(user): Observable<any> {
    return new Observable(observer => {
      this.http.put('/api/profile', user).subscribe((r: any) => {
        observer.next(r);
        observer.complete();
      })
    });
  }
}