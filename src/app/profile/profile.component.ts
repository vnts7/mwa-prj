import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedIndex = 0;
  message = null;
  user = null;
  dateOfBirth: any
  form = new FormGroup({
    weight: new FormControl(),
    height: new FormControl(),
    gender: new FormControl(),
    dateOfBirth: new FormControl(),
    activities: new FormControl(),
    goal: new FormControl(),
  });

  constructor(private s: ProfileService, private authService: AuthService) { }
  selected = "1";
  ngOnInit() {
    this.loadData();

  }
  selectedOption; dateOfBirthyyyyMMdd
  loadData() {
    this.selectedOption = '1';
    this.user = this.authService.user;
    this.s.getProfile().subscribe(r => {
      const o = r.data;
      this.dateOfBirth = o.dateOfBirth ? moment.unix(o.dateOfBirth).format("MM/DD/YYYY") : '';
      this.user = o;
      this.setFormData(o);
    });
  }

  setFormData(res) {
    this.form.controls['weight'].setValue(res.weight)
    this.form.controls['height'].setValue(res.height)
    // "yyyy-MM-dd" for displaying
    this.dateOfBirthyyyyMMdd = res.dateOfBirth ? moment.unix(res.dateOfBirth).format("YYYY-MM-DD") : '';
    this.form.controls['dateOfBirth'].setValue(this.dateOfBirthyyyyMMdd);
    this.form.controls['gender'].setValue(res.gender);
    this.form.controls['activities'].setValue(res.activities);
    this.form.controls['goal'].setValue(res.goal);

  }

  onSave(event) {
    if (this.form.invalid) return false;
    this.message = null;
    const o = this.form.getRawValue();
    o.dateOfBirth = moment(o.dateOfBirth, 'YYYY-MM-DD').unix();
    this.s.updateProfile(o).subscribe(r => {
      console.log('onSave', r)
      // this.message = JSON.parse(rs).message;
      this.selectedIndex = 1;
      this.user = r.data;
      this.setFormData(r.data);
      this.dateOfBirth = o.dateOfBirth ? moment.unix(o.dateOfBirth).format("MM/DD/YYYY") : '';
    });
    return false;
  }

  onChangeTab(e) {
    this.selectedIndex = e.index;
  }
}
