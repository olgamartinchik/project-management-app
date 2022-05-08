import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ToggleScrollService } from './toggle-scroll.service';

import { ConfirmSubject } from '../models/confirm.service.models';

import { INITIAL_VALUE } from '../constants/confirm.service.constants';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  public confirmSubject$ = new BehaviorSubject<ConfirmSubject>(INITIAL_VALUE);

  constructor(private toggleScrollService: ToggleScrollService) {}

  public close(): void {
    this.toggleScrollService.showScroll();
    this.confirmSubject$.next({
      deleteFunction: null,
      isOpen: false,
    });
  }

  public confirmDelete(): void {
    if (typeof this.confirmSubject$.value.deleteFunction === 'function') {
      this.confirmSubject$.value.deleteFunction();
    }
  }

  public open(deleteFunction: Function): void {
    this.toggleScrollService.hiddenScroll();
    this.confirmSubject$.next({
      deleteFunction,
      isOpen: true,
    });
  }
}
