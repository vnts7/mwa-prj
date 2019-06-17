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

  SUB_SEARCH = environment.mwaNodeServer + '/api/search/food'
  NUTRIENT_SEARCH = environment.mwaNodeServer + '/api/search/nutrient'
  
  searchInputControl = new FormControl();
   
  selectedDataItem = '';

  filteredData: Observable<Object[]>; 
  httpSubscription : Subscription;

  @Output() selectedAutocomplete: EventEmitter<any> = new EventEmitter() ; 
  
  constructor(private http : HttpClient, private searchService : SearchService) {}

  ngOnInit() {

      this.httpSubscription = this.searchInputControl.valueChanges.pipe(
      debounceTime(400),
      
      switchMap(value => {
          // console.log('value', value);
          if (value.length > 0 && value.length < 30) {
            return this.search(this.SUB_SEARCH , value);
          } 
          return [];
      })
    ).subscribe(res => { 
        this.filteredData =res.data;
        console.log('res', this.filteredData);
    });
  }
  
  search(rout, keyword): Observable<any> {
    let url = rout  + '?q=' + keyword;
    console.log('url', url);
    return (this.http.get(url));
  }

  displayFn(selectedItem): string {

    if (selectedItem != null) {
      this.selectedDataItem = selectedItem;
      return selectedItem ? selectedItem.name : selectedItem;
    } return;
  }

  // selected Food on autocomplete -> search calories
  onSelectionChangeFunction(selectedItem) {
    console.log('onSelectionChangeFunction', selectedItem); 
    // search calories
    let foodId =  selectedItem.ndbno;
    console.log('foodId', foodId);
    this.httpSubscription = this.search(this.NUTRIENT_SEARCH , foodId).subscribe(res => { 
        let data = res.data;
        console.log('nutrient data', data);
        this.selectedAutocomplete.emit(data);
    }); 
  }  

  ngOnDestroy() {
    this.httpSubscription.unsubscribe();
  }

}
