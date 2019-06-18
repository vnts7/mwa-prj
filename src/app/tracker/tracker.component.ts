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
  
  date = moment().startOf('day');
  tracker = null;
  showFoodError = false;
  food = null;
  constructor(private s: TrackerService) { }

  form = new FormGroup({
    type: new FormControl(null, [Validators.required]),
    quantity: new FormControl(1, [Validators.required]),
  });

  ngOnInit() {
    this.dateChange(this.date);
  }
  dateChange(date: moment.Moment) {
    this.date = date;
    this.s.readByDate(date.unix()).subscribe(r => {
      this.tracker = r.data;
      let c = 0;
      this.tracker.meals.forEach(i => {
        c+= i.calories*i.quantity;
      });
      this.tracker.calories = c;
    })
  }
  submit() {
    if (this.form.invalid) return false;
    if (!this.food) {
      this.showFoodError = true;
      return false;
    }
    const data = { ...this.food, ...this.form.getRawValue() };
    this.s.addMeal(this.date.unix(), data).subscribe(r=>{
      if(!r.success) return;
      this.tracker.meals.push(r.data);
      this.tracker.calories += r.data.calories * r.data.quantity;
      this.food = null;
    })
    console.log(data);
  }
  foodSelect(e) {
    this.showFoodError = false;
    this.food = e;
  }
}
