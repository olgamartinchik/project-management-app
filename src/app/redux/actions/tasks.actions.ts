import { ITask } from './../../modules/core/models/ITask.model';
import { createAction, props } from '@ngrx/store';

export const setTask = createAction('[SET TASK] SET TASK BY ID', props<{ task: ITask }>());
