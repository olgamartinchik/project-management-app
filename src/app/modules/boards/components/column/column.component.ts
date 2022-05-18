import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ColumnService } from '../../services/column.service';
import { TaskService } from '../../services/task.service';
import { ConfirmService } from 'src/app/modules/core/services/confirm.service';
import { DragDropService } from '../../services/drag-drop.service';

import { ColumnModel } from 'src/app/modules/core/models/column.model';

import { ITask } from 'src/app/modules/core/models/ITask.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnInit {
  @Input() public columnData!: ColumnModel;

  @Input() public boardId!: string;

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
    private dragDropService: DragDropService,
  ) {}

  public ngOnInit(): void {
    this.titleInput.setValue(this.columnData.title, { emitEvent: false });
  }

  public confirmationDeleteColumn(): void {
    this.confirmService.open(this.deleteColumn);
  }

  public changeTaskOrder(event: CdkDragDrop<string[]>): void {
    if (event.currentIndex !== event.previousIndex) {
      // присваиваем column изменененный список тасок для смены представления
      this.columnData = { ...this.columnData, tasks: this.moveTaskInColumn(event) };

      this.dragDropService.moveTask(
        this.boardId,
        this.columnData.id!,
        this.columnData.tasks!,
        event,
      );
    }
  }

  public editTitle(): void {
    if (this.titleInput.value !== this.columnData.title && this.titleInput.valid) {
      this.columnService.editColumn(this.columnData, this.titleInput.value);
    } else {
      this.titleInput.reset(this.columnData.title);
    }
  }

  public addNewTask(): void {
    this.taskService.newTask$.next(true);
    this.taskService.isTaskPopup$.next(true);
    this.columnService.columnId = this.columnData.id!;
  }

  private deleteColumn = (): void => {
    this.columnService.deleteColumn(this.columnData.id!);
  };

  private moveTaskInColumn({ previousIndex, currentIndex }: CdkDragDrop<string[]>): ITask[] {
    const movingTasks = [...this.columnData.tasks!];
    moveItemInArray(movingTasks, previousIndex, currentIndex);

    return movingTasks;
  }
}
