import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service'; 
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  sub : Subscription;
  
  user={email : ''}

  constructor(private http : HttpClient, private profileService : ProfileService, private authService : AuthService) { }

  ngOnInit() {
      this.user= this.authService.user;
      console.log('this.user.email', this.authService.user);
      this.sub = this.profileService.getProfile(this.user.email).subscribe( (res) => {
      this.user = res;
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
