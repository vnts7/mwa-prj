import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private http: HttpClient) { }

  addFoodToMeal(food: Object, quantity: number, type: number, date: Date): Observable<any> {
    return this.http.post('/api/tracker/add-food', { food: food, quantity: quantity, type: type, date: date });
  }

  addTracker(date: Date): Observable<any> {
    return this.http.post('/api/tracker/', { date: date });
  }

  getTracker(date: Date): Observable<any> {
    return this.http.get('/api/tracker/?date=' + date.toString);
  }


}
