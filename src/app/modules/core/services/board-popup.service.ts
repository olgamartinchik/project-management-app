import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToggleScrollService } from './toggle-scroll.service';
import { PopupFunction } from '../models/board-popup.service.model';
import { BOARD_POPUP_SERVICE_INITIAL_VALUE } from '../constants/board-popup.service.constants';

@Injectable({
  providedIn: 'root',
})
export class BoardPopupService {
  public boardPopupSubject$ = new BehaviorSubject(BOARD_POPUP_SERVICE_INITIAL_VALUE);

  constructor(private toggleScrollService: ToggleScrollService) {}

  public open(popupFunction: PopupFunction): void {
    this.boardPopupSubject$.next({ isOpen: true, popupFunction });
    this.toggleScrollService.hiddenScroll();
  }

  public close(): void {
    this.boardPopupSubject$.next({ isOpen: false, popupFunction: 'create' });
    this.toggleScrollService.showScroll();
  }
}
