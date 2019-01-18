import {AnyAction} from 'redux';
import {ApplicationStateType} from '../ApplicationStateType';
import {ControllerActionType} from '../ControllerActionType';
import {ThunkDispatch} from 'redux-thunk';
import {AbstractController} from '../AbstractController';
import {FormControllerInterface} from './FormControllerInterface';
import {FormActionsEnum} from '../../Redux/Reducers/Form/FormActionsEnum';

export class FormController extends AbstractController implements FormControllerInterface {

    public setCheckbox(namespace: string[], check: boolean): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
        ): Promise<void> => {

            dispatch({type: FormActionsEnum.SET_CHECKBOX, namespace: namespace, check: check})
        };
    }
}