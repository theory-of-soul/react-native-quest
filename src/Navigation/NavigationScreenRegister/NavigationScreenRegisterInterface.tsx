import * as React from 'react';
import {ScreenViewConstructorInterface} from '../../Model/View/ScreenView/ScreenViewConstructorInterface';
import {ControllerInterface} from '../../Controllers/ControllerInterface';
import {ControllerConstructorInterface} from '../../Controllers/ControllerConstructorInterface';

export interface NavigationScreenRegisterInterface {

    add(
        screenConstructor: ScreenViewConstructorInterface<any, any, any>,
        controllerConstructor?: ControllerConstructorInterface<ControllerInterface>
    ): NavigationScreenRegisterInterface;
}
