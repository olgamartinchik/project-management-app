import { Injectable } from '@angular/core';

@Injectable()
export class ToggleScrollService {
  hiddenScroll() {
    document.body.classList.add('modal-open');
  }

  showScroll() {
    document.body.classList.remove('modal-open');
  }
}
