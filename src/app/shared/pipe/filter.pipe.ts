import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, $name?: any): any[any] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    if ($name) {
      if ($name == 'produit') {
        return items.filter((it) => {
          return it.nom.toLocaleLowerCase().includes(searchText);
        });
      }
      if ($name == 'reference') {
        return items.filter((it) => {
          return it.id.toLocaleLowerCase().includes(searchText);
        });
      }
    }
    if (!$name) {
      return items.filter((it) => {
        return it.toLocaleLowerCase().includes(searchText);
      });
    }
  }
}
