import * as Immutable from 'immutable';

export type ApplicationStateType = {
    [reducer: string]: Immutable.Map<string, any>;
}