import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { IColumn } from 'src/app/modules/core/models/IColumn.model';
import { HttpService } from 'src/app/modules/core/services/http.service';
import { setBoardById } from 'src/app/redux/actions/board.actions';
import { IAppState } from 'src/app/redux/state.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-column-container',
  templateUrl: './column-container.component.html',
  styleUrls: ['./column-container.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnContainerComponent implements OnInit {
  @Input() public column!: IColumn;

  public idBoard: string = '';

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private store: Store<IAppState>,
    public taskService: TaskService,
  ) {}

  public ngOnInit(): void {
    this.idBoard = this.route.snapshot.params['id'];
  }

  public addNewTask(): void {
    this.taskService.isNewTaskPopup$.next(true);
  }

  public deleteColumn(): void {
    this.httpService
      .deleteColumns(this.idBoard, this.column.id!)
      .pipe(
        take(1),
        map(() => {
          this.store.dispatch(setBoardById({ idBoard: this.idBoard }));
        }),
      )
      .subscribe();
  }
}
