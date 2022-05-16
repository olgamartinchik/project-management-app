import { UserModel } from './../../modules/core/models/user.model';
import { createAction, props } from '@ngrx/store';

export const getUsers = createAction('[GET USERS] GET ALL USERS', props<{ users: UserModel[] }>());
