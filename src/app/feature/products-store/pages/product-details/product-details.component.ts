import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { TranslateModule } from '@ngx-translate/core';
import { ChipComponent } from '@store-app/shared/components/chip/chip.component';
import { SvgIconComponent } from '@store-app/shared/components/svg-icon/svg-icon.component';
import { IAppState } from '@store-app/store/app.store';
import { of } from 'rxjs/internal/observable/of';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';
import { ProductDetailsSelector } from '../../store/product.selector';
import { ICONS } from '@store-app/core/models/icons/icon.const';
import { ProductsActions } from '../../store/product.action';
import { IProduct } from '../../models/interfaces/product.interface';
import { Observable } from 'rxjs/internal/Observable';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    ChipComponent,
    SvgIconComponent,
    NgOptimizedImage,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  // Injects
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _store: Store<IAppState> = inject(Store);
  // Private
  private _productId: string | null = null;
  // Observables
  public loadShimmer: WritableSignal<boolean> = signal(false);

  // Publix
  public ICONS = ICONS;
  public productDetails: WritableSignal<any | null> = signal(null);

  ngOnInit(): void {
    this._getProductId();
    this._dispatchProductList();
    this._selectProductDetails();
  }

  private _getProductId(): void {

    this._productId = this._activatedRoute.snapshot.params['id'];
  }

  public _dispatchProductList(): void {
    this._store.dispatch(
      ProductsActions.gET_PRODUCT({
        payload: this._productId!,
      })
    );
  }

  private _selectProductDetails(): void {
    this.loadShimmer.set(true);
    this._store
      .select(ProductDetailsSelector)
      .pipe(
        filter((f) => !!f),
        take(1)
      )
      .subscribe({
        next: (details) => {
          this.productDetails.set(details);
        },
        complete: () => {
          this.loadShimmer.set(false);
        },
      });
  }
}
