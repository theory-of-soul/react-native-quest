import {ControllerInterface} from './ControllerInterface';

export interface ControllerConstructorInterface<T extends ControllerInterface> {
    new (): T;
}
