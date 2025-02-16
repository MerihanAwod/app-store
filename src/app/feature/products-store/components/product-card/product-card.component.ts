import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, InputSignal } from '@angular/core';
import { IProduct } from '../../models/interfaces/product.interface';
import { Router, RouterModule } from '@angular/router';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChipComponent } from '../../../../shared/components/chip/chip.component';
import { ICONS } from '../../../../core/models/icons/icon.const';

// src/app/feature/products-store/components/product-card/product-card.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { ProductsGqlService } from '../../services/products-gql.service';
import { IProduct } from '../../models/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  template: `
    <div *ngIf="product">  <h3>{{ product.name }}</h3>
      <p>{{ product.price }}</p>
      </div>
  `,
  styles: []
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product | undefined; // If you're receiving product data as input
  // OR
  // product: Product | undefined;  // If you're fetching product details

  constructor(private productsGqlService: ProductsGqlService) { } // Inject the service

  ngOnInit(): void {
    // If you're fetching product details based on an ID or something
    // const productId = '123'; // Get the product ID somehow (e.g., from input)
    // this.productsGqlService.getProductById(productId).subscribe(product => {
    //   this.product = product;
    // });
  }
}

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
