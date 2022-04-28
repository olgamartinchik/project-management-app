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
    this._createForm();
  }

  _createForm() {
    this.boardForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
  }

  get _title() {
    return this.boardForm?.get('title');
  }

  closePopup() {
    this.boardService.isBoardPopup$.next(false);
  }

  stopPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  createBoard() {
    this.boardService.isBoardPopup$.next(false);
  }
}
