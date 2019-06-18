import { Injectable } from "@angular/core";
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';



@Injectable({
    providedIn : 'root'
})

export class ProfileService {

    constructor(private http : HttpClient, private userService : UserService, private authService : AuthService){}

    getProfile(username) : Observable<any> {         
        return new Observable( observer$ => {
            this.http.get('/api/profile/'+ username).subscribe( (r) => { 
                observer$.next(r); 
            });
        })
    }

    updateProfile(user): Observable<any> {

        user._id = this.authService.user._id; 

        return new Observable(observer => {
            this.http.put('/api/profile/', user).subscribe((r: any) => {
                console.log('rrrrrrrr', r)
                observer.next(r);            
                observer.complete();
          })
        });
    }
}