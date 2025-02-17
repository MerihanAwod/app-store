import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { IProduct } from '../../models/interfaces/product.interface';
import { Router, RouterModule } from '@angular/router';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChipComponent } from '../../../../shared/components/chip/chip.component';
import { ICONS } from '../../../../core/models/icons/icon.const';
/*
// gql
import { ProductsGqlService } from '../../services/products-gql.service';
import { Component, inject, input, InputSignal, OnInit, Input } from '@angular/core';

export class ProductCardComponent implements OnInit {
  product: IProduct | undefined; // Property to hold the product data
  @Input() productId: number | undefined; // Input for product ID

  constructor(private productsGqlService: ProductsGqlService) { } // Inject the service

  ngOnInit(): void {
    if (this.productId) {
      this.productsGqlService.getProductById(this.productId).subscribe({
        next: (product) => {
          this.product = product; // Update the component's product property
        },
        error: (error) => {
          console.error("Error fetching product:", error);
          // Handle error (e.g., display a message)
        }
      });
    }
  }
}
  */

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
  public product: InputSignal<IProduct> = input.required<IProduct>();
  // Public
  public ICONS = ICONS;

  navigateToProductDetails(productId: number): void {
    this._router.navigate(['product-details', productId]);
  }
}
