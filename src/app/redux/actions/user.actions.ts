import { UserModel } from './../../modules/core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const getUsers = createAction('[GET USER] GET USER BY ID', props<{ users: UserModel[] }>());
