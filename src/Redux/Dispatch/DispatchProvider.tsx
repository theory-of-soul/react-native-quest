import {ThunkDispatch} from 'redux-thunk';
import {AnyAction, Store} from 'redux';
import {DispatchProviderInterface} from './DispatchProviderInterface';
import {ApplicationStateType} from '../../Controllers/ApplicationStateType';

export class DispatchProvider implements DispatchProviderInterface {

    private readonly dispatch: ThunkDispatch<ApplicationStateType, any, AnyAction>;

    constructor(store: Store) {
        this.dispatch = store.dispatch;
    }

    public getDispatch(): ThunkDispatch<ApplicationStateType, any, AnyAction> {
        return this.dispatch;
    }
}
