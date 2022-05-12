import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskService {
  public isNewTaskPopup$ = new BehaviorSubject(false);

  public isEditTaskPopup$ = new BehaviorSubject(false);
}
