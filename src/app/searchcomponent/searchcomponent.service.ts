import { Injectable, EventEmitter } from "@angular/core";


@Injectable({
  providedIn : 'root'
})

export class SearchService {
  
  selectedItem = new EventEmitter<any>();
  test() : EventEmitter<any> {
    return this.selectedItem;
  } 
}