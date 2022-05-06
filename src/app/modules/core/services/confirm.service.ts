import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ConfirmService {
  public isConfirmPopup$ = new BehaviorSubject(false);
}
