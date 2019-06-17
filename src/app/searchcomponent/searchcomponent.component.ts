import { Component, Output } from '@angular/core'; 
import {FormControl} from '@angular/forms';
import {Observable, of , Subscription} from 'rxjs';
import {debounceTime, map, startWith, switchMap} from 'rxjs/operators';
 
import { HttpClient  } from '@angular/common/http';  

import { environment } from '../../environments/environment';
import {  EventEmitter } from '@angular/core';
import { SearchService } from './searchcomponent.service'; 
 

@Component({
  selector: 'app-searchcomponent',
  templateUrl:'./searchcomponent.component.html',
  styleUrls: ['./searchcomponent.component.css']
})
export class SearchcomponentComponent {

  SUB_SEARCH = environment.mwaNodeServer + '/api/search'
  
  searchInputControl = new FormControl();
   
  selectedDataItem = '';

  filteredData: Observable<Object[]>; 
  httpSubscription : Subscription;

  @Output() tomato: EventEmitter<any> = new EventEmitter() ; 
  
  constructor(private http : HttpClient, private searchService : SearchService) {}

  ngOnInit() {

      this.httpSubscription = this.searchInputControl.valueChanges.pipe(
        debounceTime(400),
       
        switchMap(value => {
           // console.log('value', value);
            if (value.length > 0 && value.length < 30) {
              return this.search(value);
            } 
            return [];
        })
      ).subscribe(res => { 
          this.filteredData =res.data;
          console.log('res', this.filteredData);
      }); 

      
  }
  
  search(keyword): Observable<any> {
    let url = this.SUB_SEARCH  + '?q=' + keyword;
    return (this.http.get(url));
  }

  displayFn(selectedItem): string {

    if (selectedItem != null) {
      this.selectedDataItem = selectedItem;
      
     // this.searchService.test().emit(selectedItem);

      return selectedItem ? selectedItem.name : selectedItem;
    } return;
  }
  
  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
  }

  ngOnChanges(change) {
    console.log('ngOnChanges');
  }
}
