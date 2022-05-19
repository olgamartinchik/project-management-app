import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// services
import { ErrorMessagesService } from 'src/app/modules/core/services/error-messages.service';
import { ColumnService } from '../../services/column.service';

// models
import { FormMessagesModel } from 'src/app/modules/core/models/error-messages.services.models';
import { BoardModel } from '../../../core/models/board.model';

// constants
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
    private columnService: ColumnService,
  ) {}

  public ngOnInit(): void {
    this.createForm();
  }

  public closePopup(): void {
    this.addColumnForm.reset();
    this.closingPopup.emit();
  }

  public createColumn(): void {
    this.columnService.createColumn(this.addColumnForm.controls['title'].value, this.board.columns);
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
