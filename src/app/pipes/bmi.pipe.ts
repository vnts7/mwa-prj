import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bmi'
})
export class BMIPipe implements PipeTransform {

  transform(value: number): any {
//     BMI Classification		
// 18.5 or less		Underweight
// 18.5 to 24.99		Normal Weight
// 25 to 29.99		Overweight
// 30 to 34.99		Obesity (Class 1)
// 35 to 39.99		Obesity (Class 2)
// 40 or greater		Morbid Obesity
    let arr = [40, 35, 30, 25, 18, -1]
    let cls = ["Morbid Obesity", "Obesity (Class 2)", "Obesity (Class 1)", "Overweight", "Normal Weight", "Underweight"]
    for (let i = 0; i < arr.length; i++) {
        if(value >= arr[i]) {
          return cls[i];
        }
    }
  }

}