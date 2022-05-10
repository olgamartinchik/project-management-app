import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmPopupComponent {
  constructor(public confirmService: ConfirmService) {}

  public closeConfirmPopup(): void {
    this.confirmService.close();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  public confirm(): void {
    this.confirmService.confirmDelete();
    this.closeConfirmPopup();
  }
}
