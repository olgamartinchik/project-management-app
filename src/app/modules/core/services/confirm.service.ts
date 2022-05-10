import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INITIAL_VALUE } from '../constants/confirm.service.constants';
import { ConfirmSubject } from '../models/confirm.service.models';
import { ToggleScrollService } from './toggle-scroll.service';

@Injectable()
export class ConfirmService {
  public confirmSubject$ = new BehaviorSubject<ConfirmSubject>(INITIAL_VALUE);

  // public isConfirmPopup$ = new BehaviorSubject(false);
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
