import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

const lpad = function(s, padString, length) {
  let str = s + '';
  while (str.length < length) {
    str = padString + str;
  }
  return str;
}

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {
  transform(value: any = '0', unit: string): any {
    const date = moment.duration(<any>value, <any>unit);
    const [hours, minutes, seconds] = ['hours', 'minutes', 'seconds'].map(duration => {
      return lpad(date[duration](), '0', 2)
    });
    return `${hours}:${minutes}:${seconds}`;
  }
}
