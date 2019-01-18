import {ControllerActionType} from '../ControllerActionType';
import {ControllerInterface} from '../ControllerInterface';

export interface FormControllerInterface extends ControllerInterface  {

    setCheckbox(namespace: string[], check: boolean): ControllerActionType;

}
