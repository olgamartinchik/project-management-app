import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';

import { ApiService } from '../../../core/services/api/api.service';
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages/error-messages.service';

import { addNewColumn } from '../../../../redux/actions/board.actions';

import { IAppState } from 'src/app/redux/state.model';
import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { BoardModel } from '../../../core/models/board.model';
import { ColumnModel } from 'src/app/modules/core/models/column.model';

import { FORM_ERROR_MESSAGES } from 'src/app/modules/core/constants/error-messages.constants';

@Component({
  selector: 'app-column-popup',
  templateUrl: './column-popup.component.html',
  styleUrls: ['./column-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnPopupComponent implements OnInit {
  @Input() public isOpen: boolean = false;

  @Input() public board!: BoardModel;

  @Output() public closingPopup = new EventEmitter();

  public addColumnForm!: FormGroup;

  public messages: FormMessagesModel = FORM_ERROR_MESSAGES;

  constructor(
    public errorMessagesService: ErrorMessagesService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private store: Store<IAppState>,
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public closePopup(): void {
    this.addColumnForm.reset();
    this.closingPopup.emit();

    console.log(this.board);
  }

  public createColumn(): void {
    const columnData: ColumnModel = {
      title: this.addColumnForm.controls['title'].value,
      order:
        this.board.columns.length > 0
          ? this.board.columns[this.board.columns.length - 1].order + 1
          : 0,
    };

    this.apiService
      .createColumn(this.board.id!, columnData)
      .pipe(take(1))
      .subscribe((column) => this.store.dispatch(addNewColumn({ column })));

    this.closePopup();
  }

  public stopPropagation(event: Event): void {
    event.stopPropagation();
  }

  private createForm(): void {
    this.addColumnForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }
}
