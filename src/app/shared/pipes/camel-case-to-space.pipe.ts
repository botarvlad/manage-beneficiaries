import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToSpace',
  standalone: true,
})
export class CamelCaseToSpacePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2') // Separate camelCase words with spaces
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }
}
