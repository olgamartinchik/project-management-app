import { ITask } from './../../../core/models/ITask.model';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { SearchService } from 'src/app/modules/core/services/search.service';

import { UsersService } from 'src/app/modules/core/services/users.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  styleUrls: ['./search-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTaskComponent {
  @Input() public task!: ITask;

  constructor(public searchService: SearchService, public usersService: UsersService) {}
}
