import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ColumnService } from '../../services/column.service';
import { ConfirmService } from 'src/app/modules/core/services/confirm.service';

import { ColumnModel } from 'src/app/modules/core/models/column.model';
import { TaskService } from '../../services/task.service';
import { BoardModel } from 'src/app/modules/core/models/board.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() public columnData!: ColumnModel;

  @Input() public boardId!: string;

  @Input() public board!: BoardModel;

  public isInputFocus = false;

  public titleInput = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(30),
  ]);

  constructor(
    public taskService: TaskService,
    private columnService: ColumnService,
    private confirmService: ConfirmService,
  ) {}

  public ngOnInit(): void {
    this.titleInput.setValue(this.columnData.title, { emitEvent: false });
  }

  public confirmationDeleteColumn(): void {
    this.confirmService.open(this.deleteColumn);
  }

  public editTitle(): void {
    if (this.titleInput.value !== this.columnData.title && this.titleInput.valid) {
      this.columnService.editColumn(this.columnData, this.titleInput.value);
    } else {
      this.titleInput.reset(this.columnData.title);
    }
  }

  private deleteColumn = (): void => {
    this.columnService.deleteColumn(this.columnData.id!);
  };

  public addNewTask(): void {
    console.log('columnData', this.columnData);
    this.taskService.isNewTaskPopup$.next(true);
    this.columnService.columnId = this.columnData.id!;
    // this.taskService.getAllUsers()
  }
}
