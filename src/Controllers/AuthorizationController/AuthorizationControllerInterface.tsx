import {ControllerActionType} from '../ControllerActionType';
import {ControllerInterface} from '../ControllerInterface';
import {LoginResult} from 'react-native-fbsdk';

export interface AuthorizationControllerInterface extends ControllerInterface  {

    login(username: string, password: string): ControllerActionType;

    register(username: string, password: string, repeatPassword: string, componentId: string): ControllerActionType;

    toSignin(componentId: string): ControllerActionType;

    toSignup(componentId: string): ControllerActionType;

    changeUsernameSignIn(username: string): ControllerActionType;

    changePasswordSignIn(password: string): ControllerActionType;

    goBack(componentId: string): ControllerActionType;

    toPlay(): ControllerActionType;

    google(): ControllerActionType;

    facebook(error: object, result: LoginResult): ControllerActionType;
}
