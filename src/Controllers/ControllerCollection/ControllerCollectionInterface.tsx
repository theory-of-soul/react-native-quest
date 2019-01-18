import {ControllerConstructorInterface} from '../ControllerConstructorInterface';
import {ControllerInterface} from '../ControllerInterface';

export interface ControllerCollectionInterface {

    setController<T extends ControllerInterface>(controller: ControllerConstructorInterface<T>): ControllerCollectionInterface;

    getController<T extends ControllerInterface>(name: string): T;
}
