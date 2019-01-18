import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {ApplicationStateType} from '../../Controllers/ApplicationStateType';

export interface DispatchProviderInterface {

    getDispatch(): ThunkDispatch<ApplicationStateType, any, AnyAction>;
}
