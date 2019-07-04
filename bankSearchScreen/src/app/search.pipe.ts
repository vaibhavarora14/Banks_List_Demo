import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchValue: string) {
    if (searchValue.length !== 0) {
      return value.filter(function(obj) {
        return Object.keys(obj).some(function(key) {
          debugger;
          try {
            return obj[key].includes(searchValue);
          } catch (e) {
            return false;
          }
        });
      });
    } else {
      return value;
    }
  }

}
