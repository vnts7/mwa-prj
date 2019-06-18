import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service'; 
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedIndex = 0;
  sub : Subscription;
  message = null;
  user={email : ''}
  form  = new FormGroup({
    weight : new FormControl(),
    height : new FormControl(),
    gender : new FormControl(),
    dob : new FormControl(),
    activity : new FormControl(),
    goal : new FormControl(),
  });

  constructor(private http : HttpClient, private profileService : ProfileService, private authService : AuthService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.user= this.authService.user; 
    this.sub = this.profileService.getProfile(this.user.email).subscribe( (res) => {
      this.user = res; 
    });
  }

  onSave(event) {
      this.message = null; 
      const formData = this.form.getRawValue(); 
      this.sub = this.profileService.updateProfile(formData).subscribe( rs => {     
        console.log('onSave', rs) 
        // this.message = JSON.parse(rs).message;
        this.selectedIndex = 1;
        this.loadData();
      });
      this.selectedIndex = 1;
      return false;
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
