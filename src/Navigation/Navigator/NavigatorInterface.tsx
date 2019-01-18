import * as Immutable from 'immutable';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {ApplicationStateType} from '../../Controllers/ApplicationStateType';
import {ViewConstructor} from '../../Model/View/ViewConstructor';

export interface NavigatorInterface {

    setRoot(screenId: string): void;

    push(reactComponentId: string, nextComponentId: string): void;

    showActionSheet(buttons: string[], actions: Immutable.List<() => void>, dispatch?: ThunkDispatch<ApplicationStateType, void, AnyAction>): void;

    initializeApplicationFirstScreen(screenId: string): void;

    showPopup(children?: ViewConstructor<any, any, any>): void;

    showModal(children: ViewConstructor<any, any, any>): void
}
