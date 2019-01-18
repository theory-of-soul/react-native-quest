import {AnyAction, applyMiddleware, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {ApplicationStateType} from '../../Controllers/ApplicationStateType';
import rootReducer from '../Reducers/index';
import {StoreProviderInterface} from './StoreProviderInterface';

export class StoreProvider implements StoreProviderInterface {

    private readonly store: Store<ApplicationStateType>;

    constructor() {
        this.store = createStore<ApplicationStateType, AnyAction, any, any>(
            rootReducer,
            applyMiddleware(thunk)
        );
    }

    public getStore(): Store<ApplicationStateType> {
        return this.store;
    }
}
