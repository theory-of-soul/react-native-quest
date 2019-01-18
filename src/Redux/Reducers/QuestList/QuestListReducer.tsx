import * as Immutable from 'immutable';
import {ApplicationActionType} from '../../../Controllers/ApplicationActionType';
import {ReducerInterface} from '../ReducerInterface';
import {QuestListActionsEnum} from './QuestListActionsEnum';

export class QuestListReducer implements ReducerInterface {

    public getReducerMethod(
        state: Immutable.Map<string, any> = Immutable.Map({}),
        action: ApplicationActionType = {}
    ): Immutable.Map<string, any> {

        switch (action.type) {
            case QuestListActionsEnum.TOGGLE_FILTER_BUTTON:
                return state.setIn(['showFilterTags'], action.showFilterTags);
            default:
                return state;
        }
    }
}
