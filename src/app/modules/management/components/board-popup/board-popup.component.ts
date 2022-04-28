import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-board-popup',
  templateUrl: './board-popup.component.html',
  styleUrls: ['./board-popup.component.scss'],
})
export class BoardPopupComponent {
  boardForm?: FormGroup;

  constructor(public boardService: BoardService, private fb: FormBuilder) {
    this.createForm();
  }

  private createForm() {
    this.boardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  public get _title() {
    return this.boardForm?.get('title');
  }

  public closePopup() {
    this.boardService.isBoardPopup$.next(false);
    this.boardForm?.reset();
  }

  public stopPropagation(event: Event) {
    event.stopPropagation();
  }

  public createBoard() {
    this.boardService.isBoardPopup$.next(false);
    this.boardForm?.reset();
  }
}
