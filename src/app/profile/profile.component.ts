import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service'; 
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  sub : Subscription;
  
  user={email: 'hmm@gmail.com', name: "Handsome Mohammed"}

  constructor(private http : HttpClient, private profileService : ProfileService) { }

  ngOnInit() { 
      this.sub = this.profileService.getProfile(this.user.email).subscribe( (res) => {
      this.user = res;
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
