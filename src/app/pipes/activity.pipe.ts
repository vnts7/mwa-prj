import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activity'
})
export class ActivityPipe implements PipeTransform {

  transform(value: number): any {
    //0: Sedentary, 1: Lightly active, 2: Moderately active, 3: Active, 4: Very active
    switch (value) {
      case 0:
        return 'Sedentary';
      case 1:
        return 'Lightly active';
      case 2:
        return 'Moderately active';
      case 3:
        return 'Active';
      case 4:
        return 'Very active';
      default:
        return '???';
    }
  }

}