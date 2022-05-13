import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public isNavOpen = false;

  public disabled = true;

  public isPopupOpen = false;

  constructor(public authService: AuthService) {}

  public openPopupOutput(): void {
    this.isPopupOpen = !this.isPopupOpen;
  }
}
