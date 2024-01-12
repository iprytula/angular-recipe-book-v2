import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MenuItem } from '../../../interfaces/menu-item.interface';
import { menu } from '../../../const/menu.const';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatToolbarModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output()
  toggleSidenavEvent = new EventEmitter();
  headerMenu: MenuItem[] = menu;

  toggleSidenavClicked() {
    this.toggleSidenavEvent.emit();
  }
}
