import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from './components/ui/header/header.component';
import { menu } from './const/menu.const';
import { AuthData } from './interfaces/auth-data.interface';
import { MenuItem } from './interfaces/menu-item.interface';
import { AuthActions } from './store/actions/auth.actions';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from './store/selectors/auth.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSidenavModule, MatButtonModule, HeaderComponent, RouterModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-recipe-book-v2';
  sidenavMenu: MenuItem[] = menu;
  @ViewChild('drawer', { static: true }) drawer!: MatSidenav;
  isAuthenticated$!: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.logInIfLocalStorageDataIsSet();
    this.toggleDrawer();
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  private toggleDrawer() {
    this.router.events.subscribe(() => {
      this.drawer.opened ? this.drawer.close() : null;
    });
  }

  private logInIfLocalStorageDataIsSet() {
    const authDataString = localStorage.getItem('auth');
    if (authDataString) {
      const authData = JSON.parse(authDataString) as AuthData;
      this.store.dispatch(AuthActions.signInSuccess({ authData: authData }));
    }
  }

  onLogout() {
    this.store.dispatch(AuthActions.logOut());
  }
}
