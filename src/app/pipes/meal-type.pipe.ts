import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mealtype'
})
export class MealTypePipe implements PipeTransform {

  transform(value: number): any {
    //0: breakfast, 1: lunch, 2: dinner, 3: snacks
    switch (value) {
      case 0:
        return 'Breakfast';
      case 1:
        return 'Lunch';
      case 2:
        return 'Dinner';
      case 3:
        return 'Snacks';
      default:
        return '???';
    }
  }

}