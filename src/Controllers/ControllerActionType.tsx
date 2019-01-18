import {AnyAction} from 'redux';
import {ApplicationStateType} from './ApplicationStateType';
import {ThunkAction} from 'redux-thunk';

export type ControllerActionType<R = void> = ThunkAction<R, ApplicationStateType, null, AnyAction>;