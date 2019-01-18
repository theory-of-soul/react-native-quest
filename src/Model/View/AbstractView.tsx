import {ViewInterface} from './ViewInterface';
import {ApplicationStateType} from '../../Controllers/ApplicationStateType';
import {DispatchType} from '../../Redux/Dispatch/DispatchType';
import * as React from 'react';
import {ActionCreatorsMapObject} from 'redux';
import {ViewWrapper} from './ViewWrapper/ViewWrapper';
import {ViewConstructor} from './ViewConstructor';
import {Dimensions, Platform} from 'react-native';
import {ComponentType} from 'react';
import {ControllerCollectionInterface} from '../../Controllers/ControllerCollection/ControllerCollectionInterface';
import {ControllerCollection} from '../../Controllers/ControllerCollection/ControllerCollection';

type LocalS = {
};

type LocalD = {
};

type LocalO = {
};

export abstract class AbstractView<S extends LocalS = LocalS, D extends LocalD = LocalD, O extends LocalO = LocalO>
    extends React.Component<S & D & O>
    implements ViewInterface<S, D, O> {

    public abstract render(): React.ReactElement<S & D & O>;

    protected readonly controllerCollection: ControllerCollectionInterface = ControllerCollection.getInstance();

    protected readonly screenHeight = Dimensions.get('screen').height;
    protected readonly screenWidth = Dimensions.get('screen').width;

    public getElement(ClassView: ViewConstructor<any, any, any>): ComponentType<any> {

        const view = new ClassView({});

        return new ViewWrapper(view).getComponent()
    }

    public abstract mapStateToProperties(state: ApplicationStateType, ownProps: O): S;

    public abstract mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D>;

    public getAdaptiveSize(size: number): number {

        if (this.screenHeight < 670) {
            return Math.round(Platform.OS === 'ios' ? size * 0.9 : size * 0.6);
        }

        return size;
    }
}