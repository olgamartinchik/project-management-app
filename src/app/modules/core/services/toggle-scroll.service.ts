import { Injectable } from '@angular/core';

@Injectable()
export class ToggleScrollService {
  public hiddenScroll(): void {
    document.body.classList.add('modal-open');
  }

  public showScroll(): void {
    document.body.classList.remove('modal-open');
  }
}
