import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goal'
})
export class GoalPipe implements PipeTransform {

  transform(value: number): any {
    // 0: lose weight, 1: maintain weight, 2: gain weight
    switch (value) {
      case 0:
        return 'lose weight';
      case 1:
        return 'maintain weight';
      case 2:
        return 'gain weight';
      default:
        return '???';
    }
  }

}