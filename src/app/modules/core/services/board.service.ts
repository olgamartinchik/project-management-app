import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBoard } from '../../management/model/IBoard.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  public isBoardPopup$ = new BehaviorSubject(false);

  public deleteBoard$ = new BehaviorSubject<IBoard>({ id: '', title: '' });
}
