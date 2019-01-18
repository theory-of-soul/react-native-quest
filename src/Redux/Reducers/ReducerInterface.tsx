import {ApplicationActionType} from '../../Controllers/ApplicationActionType';
import * as Immutable from 'immutable';

export interface ReducerInterface {

    getReducerMethod(state: Immutable.Map<string, any>, action: ApplicationActionType): Immutable.Map<string, any>
}

