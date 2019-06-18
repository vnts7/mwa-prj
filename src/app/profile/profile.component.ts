import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service'; 
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { format } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedIndex = 0;
  sub : Subscription;
  message = null;
  user={email : '', weight : ''}
  dateOfBirth : any
  form  = new FormGroup({
    weight : new FormControl(),
    height : new FormControl(),
    gender : new FormControl(),
    dateOfBirth : new FormControl(),
    activities : new FormControl(),
    goal : new FormControl(),
  });
   
  constructor(private http : HttpClient, private profileService : ProfileService, private authService : AuthService) { }
  selected = "1";
  ngOnInit() {
    this.loadData(); 
    
  }
  selectedOption; dateOfBirthyyyyMMdd
  loadData() {
    this.selectedOption = '1';
    this.user= this.authService.user; 
    this.sub = this.profileService.getProfile(this.user.email).subscribe( (res) => {
      this.dateOfBirth = res.dateOfBirth ? moment.unix(res.dateOfBirth).format("MM/DD/YYYY") : '';
      this.user = res; 
      this.setFormData(res);
    });
  }

  setFormData(res) {
      this.form.controls['weight'].setValue(res.weight)
      this.form.controls['height'].setValue(res.height) 
      // "yyyy-MM-dd" for displaying
      this.dateOfBirthyyyyMMdd = res.dateOfBirth ? moment.unix(res.dateOfBirth).format("YYYY-MM-DD") : '';      
      this.form.controls['dateOfBirth'].setValue(this.dateOfBirthyyyyMMdd) 
      if (res.gender != null) {
        this.form.controls['gender'].setValue(res.gender ? "1" : "0"); 
      }
      this.form.controls['activities'].setValue("" + res.activities); 
      this.form.controls['goal'].setValue("" + res.goal);
      
  }

  onSave(event) {
      if (this.form.invalid) return false;
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

  onChangeTab(e){ 
    this.selectedIndex = e.index; 
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
