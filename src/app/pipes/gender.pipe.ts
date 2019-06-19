import { Pipe, PipeTransform } from "@angular/core";


@Pipe({ name: 'gender' })

export class GenderPipe implements PipeTransform {
    transform(value: Number, arg?: any) {
        if (value == null) { return ' (Input Gender so that I can help you)'; }
        return value == 1 ? 'Female' : 'Male'
    }
}