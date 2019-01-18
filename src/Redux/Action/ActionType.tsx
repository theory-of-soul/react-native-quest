import {Action} from 'redux';

export type ActionType = Action & {
    type: string;
};