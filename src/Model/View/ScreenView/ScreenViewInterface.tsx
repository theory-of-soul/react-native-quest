import {ViewInterface} from '../ViewInterface';

export interface ScreenViewInterface<S = {}, D = {}, O = {}>
    extends ViewInterface<S, D, O> {

    getScreenId(): string;
}