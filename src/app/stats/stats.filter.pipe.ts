import { Pipe, PipeTransform } from '@angular/core';

// Search bar
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(stats: any, query?: any): any {
    if (!query) return stats;
    return stats.filter((stat) => {
      return (stat.name || '').toLowerCase().includes(query.toLowerCase());
    });
  }
}
