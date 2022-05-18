import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-output-popup',
  templateUrl: './output-popup.component.html',
  styleUrls: ['./output-popup.component.scss'],
})
export class OutputPopupComponent {
  constructor(public confirmService: ConfirmService, public authService: AuthService) {}

  public isOpen = true;

  public cancel(): void {
    this.isOpen = !this.isOpen;
  }

  public logout(): void {
    this.authService.clearStorage();
    this.isOpen = !this.isOpen;
  }
}
