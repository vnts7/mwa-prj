import { Component, OnInit } from '@angular/core';
import { TrackerService } from './tracker.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  startDate = new Date(2000, 0, 1);

  myDatepicker: Date;
  bfoods: [];
  lfoods: [];
  dfoods: [];
  sfoods: [];
  hide: boolean = true;

  constructor(private trackerService: TrackerService) { }

  addTracker() {
    this.trackerService.addTracker(this.myDatepicker);
    this.hide = false;
  }

  removeFood(id, type: number) {
    // this.trackerService.removeFoodFromMeal(id, type, this.myDatepicker);
  }

  getTracker() {
    this.hide = false;
  }

  removeTracker() {
   // this.trackerService.removeTracker(this.myDatepicker);
    this.hide = false;
  }

  clearAllTrackers() {
   // this.trackerService.clearAllTrackers();
    this.hide = false;
  }

  ngOnInit() {
    this.trackerService.getTracker(this.myDatepicker).subscribe((t) => {
      this.bfoods = t.meals[0].foods;
      this.lfoods = t.meals[1].foods;
      this.dfoods = t.meals[2].foods;
      this.sfoods = t.meals[3].foods;
    }); 
  }

}
