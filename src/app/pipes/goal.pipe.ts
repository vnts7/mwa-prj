import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goal'
})
export class GoalPipe implements PipeTransform {

  transform(value: number): any {
    // 0: lose weight, 1: maintain weight, 2: gain weight
    switch (value) {
      case 0:
        return 'Lose weight';
      case 1:
        return 'Maintain weight';
      case 2:
        return 'Gain weight';
      default:
        return '???';
    }
  }

}