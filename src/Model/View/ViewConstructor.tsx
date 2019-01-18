import {ViewInterface} from './ViewInterface';

export interface ViewConstructor<S, D, O> {
    new (props: S & D & O): ViewInterface<S, D, O>;
}