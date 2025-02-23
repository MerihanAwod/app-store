import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import {
  CategoriesSelector,
  ProductsListSelector,
} from '../../store/product.selector';
import {
  delay,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  of,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { ProductsActions } from '../../store';
import { IPagination } from '../../models/interfaces/pagination.interface';
import { IAppState } from '../../../../store/app.store';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { LocalPaginationPipe } from '../../../../shared/pipes/pagination/local-pagination/local-pagination.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  PRODUCTS_QUERY_PARAM,
  ProductsQueryParam,
} from './models/product-query-param.const';
import { SvgIconComponent } from '../../../../shared/components/svg-icon/svg-icon.component';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CategoriesPipe } from './pipes/categories.pipe';
import { IProduct } from '../../models/interfaces/product.interface';
import { ICONS } from '@store-app/core/models/icons/icon.const';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'products-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    PaginationComponent,
    LocalPaginationPipe,
    SvgIconComponent,
    TranslateModule,
    CategoriesPipe,
    CarouselModule 
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  private _store: Store<IAppState> = inject(Store);
  private _router: Router = inject(Router);
  private _destroyRef: DestroyRef = inject(DestroyRef);
  private _activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private _fb: FormBuilder = inject(FormBuilder);
  // Observables
  public CategoriesList$ = this._store.select(CategoriesSelector).pipe(
    tap((t) => {
      !t.length && this._dispatchProductCategories();
    }),
    shareReplay(1)
  );
  // Signals
  public productList: WritableSignal<Array<IProduct> | null> = signal(null);
  public productListShimmer: WritableSignal<boolean> = signal(false);

  // Forms
  public selectedCategoryForm = this._fb.control<string | null>(null);
  public paginationConfiguration: IPagination = {
    perPage: 10,
    pageNumber: 1,
  };
  // Public
  public ICONS = ICONS;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  ngOnInit(): void {
    this._dispatchProductList();
    this._selectProductList();

    this._listenForPaginationQueryParamChanges();
    this._listenForCategoriesParamChanges();
  }

  public _dispatchProductList(): void {
    this.productListShimmer.set(true);

    this._store.dispatch(ProductsActions.gET_PRODUCT_LIST());
  }

  public _dispatchProductListByCategory(category: string): void {
    this.productListShimmer.set(true);
    if (!!category) {
      this._store.dispatch(
        ProductsActions.gET_PRODUCTS_BY_CATEGORY({
          payload: category,
        })
      );
    }
  }

  public _dispatchProductCategories(): void {
    console.log("_dispatchProductCategories");
    
    this._store.dispatch(ProductsActions.gET_CATEGORY_LIST());
  }

  public onPaginationChange(pageNumber: number): void {
    this._setQueryParam({ pageNumber: pageNumber });
  }

  private _setQueryParam(query: {}): void {
    this._router.navigate([], {
      queryParams: query,
      queryParamsHandling: 'merge',
    });
  }

  private _selectProductList(): void {
    this._store
      .select(ProductsListSelector)
      .pipe(
        // filter((f) => !!f?.length),
        tap(() => {
          this.productList.set(null);
          this.productListShimmer.set(false);
        })
      )
      .subscribe({
        next: (list) => {
          this.productList.set(list);
        },
        complete: () => {},
      });
  }

  private _listenForPaginationQueryParamChanges(): void {
    this._activatedRoute.queryParamMap
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((m) => m.get(PRODUCTS_QUERY_PARAM.pageNumber)),
        distinctUntilChanged(),
        filter((f) => !!f),
        map((m) => +m!),
        tap((t) => {
          if (!t || t === 1) {
            this._deleteQuery(PRODUCTS_QUERY_PARAM.pageNumber);
          }
        })
      )
      .subscribe({
        next: (res) => {
          this.paginationConfiguration = {
            ...this.paginationConfiguration,
            pageNumber: res,
          };
        },
      });
  }

  private _listenForCategoriesParamChanges(): void {
    this._activatedRoute.queryParamMap
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        map((m) => m.get(PRODUCTS_QUERY_PARAM.category)),
        filter((f) => !!f),
        distinctUntilChanged()
      )
      .subscribe({
        next: (res) => {
          this._dispatchProductListByCategory(res!);
        },
      });
  }

  private _deleteQuery(queryName: ProductsQueryParam): void {
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: {
        [queryName]: null,
      },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  public onSelectCategory(category: string) {
    if (!!category) {
      this._setQueryParam({
        [PRODUCTS_QUERY_PARAM.category]: category,
      });
    } else {
      this._dispatchProductList();
    }
    this.selectedCategoryForm.setValue(category);
  }
}
