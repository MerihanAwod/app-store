import {
  Component,
  DestroyRef,
  ElementRef,
  inject,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { ICONS } from '../../models/icons/icon.const';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LanguageSwitcherComponent } from '../../../shared/components/language-switcher/language-switcher.component';
import { IAppState } from '../../../store/app.store';
import { TranslateModule } from '@ngx-translate/core';
import { AuthenticationActions } from '@store-app/core/pages/authentication/store/authentication.actions';
import { Roles } from '@store-app/core/pages/authentication/pages/login/models/types/role.type';
import { ROLES } from '@store-app/core/pages/authentication/pages/login/models/const/login.const';

@Component({
  selector: 'h-nav-bar',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitcherComponent,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
    NgOptimizedImage
  ],
  templateUrl: './h-nav-bar.component.html',
  styleUrl: './h-nav-bar.component.scss',
})
export class HNavBarComponent {
  // Inject
  private _formBuilder = inject(FormBuilder);
  private _store: Store<IAppState> = inject(Store);
  private _authenticationService: AuthenticationService = inject(
    AuthenticationService
  );
  private _router: Router = inject(Router);
  private _destroyRef: DestroyRef = inject(DestroyRef);

  // Public
  public ICONS = ICONS;
  public isUserAuthorized: WritableSignal<boolean> =
    this._authenticationService.isUserAuthorized;
  public searchForm: FormControl<string | null> = this._formBuilder.control('');

  ngOnInit(): void {}

  public onLogOut() {
    this._store.dispatch(AuthenticationActions.lOGOUT())
  }
  
  public navigateToHome() {
    this._navigateBasedOnRole(this._authenticationService.getUserRole()!);
  }
  
  private _navigateBasedOnRole(role: Roles) {
    switch (role) {
      case ROLES.admin:
        this._router.navigateByUrl('/admin');
        break;
      case ROLES.user:
        this._router.navigateByUrl('/');
        break;
    }
  }

}
