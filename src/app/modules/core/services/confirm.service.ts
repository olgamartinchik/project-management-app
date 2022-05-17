import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ConfirmSubject } from '../models/confirm.service.model';
import { CONFIRM_SERVICE_INITIAL_VALUE } from '../constants/confirm.service.constants';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  public subject$ = new BehaviorSubject<ConfirmSubject>(CONFIRM_SERVICE_INITIAL_VALUE);

  public close(): void {
    this.subject$.next({ deleteFunction: null, isOpen: false });
  }

  public confirmDelete(): void {
    if (typeof this.subject$.value.deleteFunction === 'function') {
      this.subject$.value.deleteFunction();
    }
  }

  public open(deleteFunction: Function): void {
    this.subject$.next({ deleteFunction, isOpen: true });
  }
}
