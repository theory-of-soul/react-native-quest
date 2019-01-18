import {ControllerCollectionInterface} from './ControllerCollectionInterface';
import {ControllerInterface} from '../ControllerInterface';
import {ControllerConstructorInterface} from '../ControllerConstructorInterface';

type ControllerCollectionType = {
    [key: string]: ControllerInterface;
}

export class ControllerCollection implements ControllerCollectionInterface {

    private static controllerCollection?: ControllerCollectionInterface;

    private collection: ControllerCollectionType = {};

    static getInstance(): ControllerCollectionInterface {

        if (this.controllerCollection === undefined) {
            this.controllerCollection = new ControllerCollection();
        }

        return this.controllerCollection;
    }

    public setController<T extends ControllerInterface>(controller: ControllerConstructorInterface<T>): ControllerCollectionInterface {

        const controllerName = controller.name.replace('Controller', '');

        if (this.collection[controllerName] === undefined) {

            this.collection[controllerName] = new controller();
        } else {
            console.log(`controller ${controller.name} had been set in the collection`)
        }

        return this;
    }

    public getController<T extends ControllerInterface>(name: string): T {

        const controller = this.collection[name];

        if (controller !== undefined) {
            return (controller as T);
        }

        throw new Error(`controller ${name} wasn't set in the collection`);
    }
}