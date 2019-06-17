import { Injectable } from "@angular/core";
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
    providedIn : 'root'
})

export class ProfileService {

    constructor(private http : HttpClient, private userService : UserService){}

    getProfile(username) : Observable<any> {         
        return new Observable( observer$ => {
            this.http.get('/api/profile/'+ username).subscribe( (r) => { 
                observer$.next(r); 
            });
        })
    } 
}