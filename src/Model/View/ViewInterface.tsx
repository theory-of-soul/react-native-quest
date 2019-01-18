import {DispatchType} from '../../Redux/Dispatch/DispatchType';
import {ApplicationStateType} from '../../Controllers/ApplicationStateType';
import * as React from 'react';
import {ActionCreatorsMapObject} from 'redux';
import {ComponentType} from 'react';
import {ViewConstructor} from './ViewConstructor';

export interface ViewInterface<S, D, O> extends React.Component<S & D & O> {

    render(): React.ReactElement<S & D & O>;

    getElement(ClassView: ViewConstructor<any, any, any>): ComponentType;

    mapStateToProperties(state: ApplicationStateType, ownProps: O): S;

    mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D>;

    getAdaptiveSize(size: number): number;
}