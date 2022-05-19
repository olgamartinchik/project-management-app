import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { PopupFunction } from '../models/board-popup.service.model';
import { BOARD_POPUP_SERVICE_INITIAL_VALUE } from '../constants/board-popup.service.constants';

@Injectable({
  providedIn: 'root',
})
export class BoardPopupService {
  public subject$ = new BehaviorSubject(BOARD_POPUP_SERVICE_INITIAL_VALUE);

  public open(popupFunction: PopupFunction): void {
    this.subject$.next({ isOpen: true, popupFunction });
  }

  public close(): void {
    this.subject$.next({ isOpen: false, popupFunction: 'create' });
  }
}
