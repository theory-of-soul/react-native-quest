import * as Immutable from 'immutable';
import {ApplicationActionType} from '../../../Controllers/ApplicationActionType';
import {ReducerInterface} from '../ReducerInterface';

export class UserProfileReducer implements ReducerInterface {

    public getReducerMethod(
        state: Immutable.Map<string, any> = Immutable.Map({}),
        action: ApplicationActionType = {}
    ): Immutable.Map<string, any> {

        switch (action.type) {
            default:
                return state;
        }
    }
}
