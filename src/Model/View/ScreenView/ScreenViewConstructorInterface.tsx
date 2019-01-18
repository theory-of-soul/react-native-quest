import {ScreenViewInterface} from './ScreenViewInterface';

export interface ScreenViewConstructorInterface<S, D, O> {
    new (props: S & D & O): ScreenViewInterface<S, D, O>;
}