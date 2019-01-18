import {Dispatch} from 'redux';
import {ActionType} from '../Action/ActionType';

export type DispatchType = <A extends ActionType = ActionType>(action: A) => A & Dispatch;

