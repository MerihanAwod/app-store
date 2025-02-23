import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'categories',
  standalone: true,
})
export class CategoriesPipe implements PipeTransform {
  // Inject
  private _translateService = inject(TranslateService);
  transform(
    categories: Array<{ title: string }>
  ): { label: string; value: string | null; icon: string }[] {
    return categories.map((category) => {
      const processedValue = category.title
        // .toLowerCase()
        // .replace(/[\s']/g, '')
        // .replace(/[^a-z0-9-]/g, '');

      return {
        label: this._translateService.instant(`${processedValue}`),
        value: processedValue == 'all' ? null : category.title,
        icon: '',
      };
    });
  }
}
