import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pascalCase'
})
export class PascalCasePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;

    if (value) {
      value = value.slice(0, -1);
    }
    return this.capitalize(value);    
    // return value.split('_').map(word => this.capitalize(word)).join('');

  }
  capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

}
