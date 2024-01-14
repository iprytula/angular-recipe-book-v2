import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { menu } from '../../../const/menu.const';
import { MenuItem } from '../../../interfaces/menu-item.interface';
import { selectIsAuthenticated } from '../../../store/selectors/auth.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output()
  toggleSidenavEvent = new EventEmitter();
  headerMenu: MenuItem[] = menu;
  isAuthenticated$!: Observable<boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  toggleSidenavClicked() {
    this.toggleSidenavEvent.emit();
  }
}
