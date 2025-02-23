import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { IProduct } from '../../models/interfaces/product.interface';
import { Router, RouterModule } from '@angular/router';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChipComponent } from '../../../../shared/components/chip/chip.component';
import { ICONS } from '../../../../core/models/icons/icon.const';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgOptimizedImage,
    ChipComponent,
    SvgIconComponent,
    TranslateModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  // Inject
  private _router: Router = inject(Router);
  public product: InputSignal<any> = input.required<any>();
  // Public
  public ICONS = ICONS;

  navigateToProductDetails(productId: number): void {
    this._router.navigate(['product-details', productId]);
  }
}
