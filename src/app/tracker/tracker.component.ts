import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrackerService } from '../services/tracker.service';
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  msg = null;
  date = moment().startOf('day');
  tracker = null;
  showFoodError = false;
  food = null;
  maxCalo = 1500;
  constructor(private s: TrackerService) { }

  form = new FormGroup({
    type: new FormControl(0, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
  });

  ngOnInit() {
    this.dateChange(this.date);
  }
  dateChange(date: moment.Moment) {
    this.date = date;
    this.s.readByDate(date.unix()).subscribe(r => {
      if (!r.success) { this.msg = r.message; return; }
      this.tracker = r.data;
    })
  }
  submit() {
    if (this.form.invalid) return false;
    if (!this.food) {
      this.showFoodError = true;
      return false;
    }
    const data = { ...this.food, ...this.form.getRawValue() };
    this.s.addMeal(this.date.unix(), data).subscribe(r => {
      if (!r.success) { this.msg = r.message; return; }
      this.tracker = r.data;
      this.food = null;
    })
    console.log(data);
  }
  foodSelect(e) {
    this.showFoodError = false;
    this.food = e;
  }
  removeMeal(id) {
    this.s.removeMeal(this.date.unix(), id).subscribe(r => {
      if (!r.success) { this.msg = r.message; return; }
      this.tracker = r.data;
    })
  }
}
