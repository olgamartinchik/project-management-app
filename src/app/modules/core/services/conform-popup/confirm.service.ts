import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  public isConfirmPopup$ = new BehaviorSubject(false);
}
