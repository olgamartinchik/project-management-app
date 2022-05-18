import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public isNavOpen = false;

  public isPopupOpen = false;

  constructor(public authService: AuthService) {}

  public openPopupOutput(): void {
    this.isNavOpen = false;
    this.isPopupOpen = !this.isPopupOpen;
  }
}
