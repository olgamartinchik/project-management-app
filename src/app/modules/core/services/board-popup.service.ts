import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToggleScrollService } from './toggle-scroll.service';

@Injectable({
  providedIn: 'root',
})
export class BoardPopupService {
  public isBoardPopupOpen$ = new BehaviorSubject(false);

  constructor(private toggleScrollService: ToggleScrollService) {}

  public open(): void {
    this.isBoardPopupOpen$.next(true);
    this.toggleScrollService.hiddenScroll();
  }

  public close(): void {
    this.isBoardPopupOpen$.next(false);
    this.toggleScrollService.showScroll();
  }
}
