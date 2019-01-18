import {Navigation} from 'react-native-navigation';
import {NavigationScreenRegisterInterface} from './NavigationScreenRegisterInterface';
import * as React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import {ScreenViewWrapper} from '../../Model/View/ScreenViewWrapper/ScreenViewWrapper';
import {ScreenViewConstructorInterface} from '../../Model/View/ScreenView/ScreenViewConstructorInterface';
import {ControllerInterface} from '../../Controllers/ControllerInterface';
import {ControllerConstructorInterface} from '../../Controllers/ControllerConstructorInterface';
import {ControllerCollection} from '../../Controllers/ControllerCollection/ControllerCollection';

export class NavigationScreenRegister implements NavigationScreenRegisterInterface {

    private readonly store: Store;

    constructor(
        store: Store
    ) {
        this.store = store;
    }

    public add(
        screenConstructor: ScreenViewConstructorInterface<any, any, any>,
        controllerConstructor?: ControllerConstructorInterface<ControllerInterface>
    ): NavigationScreenRegisterInterface {

        if (controllerConstructor !== undefined) {
            ControllerCollection.getInstance().setController(controllerConstructor)
        }

        const component = new ScreenViewWrapper(new screenConstructor({}));

        Navigation.registerComponentWithRedux(
            'FamilyQuest.' + component.getScreenId(),
            () => component.getComponent(),
            Provider,
            this.store
        );

        return this;
    }
}
