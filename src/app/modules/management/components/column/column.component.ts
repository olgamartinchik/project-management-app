import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

interface ColumnModel {
  id: string;
  title: string;
  order: number;
  tasks: Task[];
}

interface Task {
  title: string;
}

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() public columnData!: ColumnModel;

  public drop(event: CdkDragDrop<string[]>): void {
    console.log(event);
    moveItemInArray(this.columnData.tasks, event.previousIndex, event.currentIndex);
  }
}
