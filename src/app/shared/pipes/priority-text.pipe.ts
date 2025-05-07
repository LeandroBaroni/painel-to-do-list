import { Pipe, PipeTransform } from '@angular/core';
import { PriorityEnum, PriorityEnumLabel } from '@enums/priority';

@Pipe({
  name: 'priorityText'
})
export class PriorityTextPipe implements PipeTransform {

  transform(value: PriorityEnum): string {
    if (!value) {
      return null
    }

    return PriorityEnumLabel.get(value);
  }

}
