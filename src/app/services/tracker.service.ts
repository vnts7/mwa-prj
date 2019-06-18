import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(private http: HttpClient) { }

  addMeal(date, meal): Observable<any> {
    return new Observable(observer => {
      this.http.post(`/api/tracker/${date}`, meal).subscribe((r: any) => {
        observer.next(r);
        observer.complete();
      })
    });
  }
  removeMeal(date, mealId): Observable<any> {
    return new Observable(observer => {
      this.http.delete(`/api/tracker/${date}/${mealId}`).subscribe((r: any) => {
        observer.next(r);
        observer.complete();
      })
    });
  }
  readByDate(date): Observable<any> {
    return new Observable(observer => {
      this.http.get(`/api/tracker/${date}`).subscribe((r: any) => {
        observer.next(r);
        observer.complete();
      })
    });
  }
}
