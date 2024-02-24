import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {
  transform(value: boolean) {
     return value ? 'Active' : 'Inactive';
  }

}
