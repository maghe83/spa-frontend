import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'momentPipe' })
export class MomentPipe implements PipeTransform {
  defaultDateFormat = 'yyyy/MM/dd, hh:mm:ss';

  transform(
    value: Date | moment.Moment,
    dateFormat: string = this.defaultDateFormat
  ): any {
    return moment(value).format(dateFormat);
  }
}
