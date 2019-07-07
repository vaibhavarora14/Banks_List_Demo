import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchValue: string) {
    if (searchValue.length !== 0) {
      return value.filter((obj) => {
        return Object.keys(obj).some((key) => {
          try {
            return obj[key].toUpperCase().includes(searchValue.toUpperCase());
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
