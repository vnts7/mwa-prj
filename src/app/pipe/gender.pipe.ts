import { Pipe, PipeTransform } from "@angular/core";


@Pipe({name : 'gender'})

export class GenderPipe implements PipeTransform {
    transform(value : Boolean, arg? : any) {
        return value ? 'Female' : 'Male'
    }
}