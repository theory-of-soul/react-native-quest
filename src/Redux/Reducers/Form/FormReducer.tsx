import * as Immutable from 'immutable';
import {ApplicationActionType} from '../../../Controllers/ApplicationActionType';
import {ReducerInterface} from '../ReducerInterface';
import {FormActionsEnum} from './FormActionsEnum';

export class FormReducer implements ReducerInterface {

    public getReducerMethod(
        state: Immutable.Map<string, any> = Immutable.Map({}),
        action: ApplicationActionType = {}
    ): Immutable.Map<string, any> {

        switch (action.type) {
            case FormActionsEnum.SET_CHECKBOX:
                return state.setIn([].concat(action.namespace), action.check);
            default:
                return state;
        }
    }
}