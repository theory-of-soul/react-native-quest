import * as Immutable from 'immutable';
import {ApplicationActionType} from '../../../Controllers/ApplicationActionType';
import {ReducerInterface} from '../ReducerInterface';
import {ActionSheetAndroidActionsEnum} from './ActionSheetAndroidActionsEnum';

export class ActionSheetAndroidReducer implements ReducerInterface {

    public getReducerMethod(
        state: Immutable.Map<string, any> = Immutable.Map({}),
        action: ApplicationActionType = {}
    ): Immutable.Map<string, any> {

        switch (action.type) {
            case ActionSheetAndroidActionsEnum.SHOW_ACTION_SHEET:
                const newState = state.setIn(['buttons'], action.buttons);
                return newState.setIn(['actions'], action.actions);
            default:
                return state;
        }
    }
}
