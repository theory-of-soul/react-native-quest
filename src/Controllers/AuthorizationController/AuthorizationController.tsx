import {AnyAction} from 'redux';
import {ApplicationStateType} from '../ApplicationStateType';
import {ControllerActionType} from '../ControllerActionType';
import {ThunkDispatch} from 'redux-thunk';
import {AuthorizationControllerInterface} from './AuthorizationControllerInterface';
import {UserActionsEnum} from '../../Redux/Reducers/User/UserActionsEnum';
import Backendless from 'backendless';
import {Navigation} from 'react-native-navigation';
import {GoogleSignin} from 'react-native-google-signin';
import {LoginResult, AccessToken, LoginManager} from 'react-native-fbsdk';
import {AbstractController} from '../AbstractController';
import {UserType} from '../../Model/BackendlessApiProvider/BackendlessUserApiProvider/UserType';
import {FormController} from '../FormController/FormController';
import {ControllerCollection} from '../ControllerCollection/ControllerCollection';

export class AuthorizationController extends AbstractController implements AuthorizationControllerInterface {

    public login(username: string, password: string): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
        ): Promise<void> => {

            this.getApiProvider()
                .getUserApi()
                .login(username, password)
                .then((loggedInUser: UserType) => {
                    dispatch({type: UserActionsEnum.AUTH, user: loggedInUser});
                    this.getNavigator().setRoot('QuestList');
                }).catch((error) => {
                    console.log(error.message)
                })
        };
    }

    public register(
        username: string,
        password: string,
        repeatPassword: string,
        componentId: string
    ): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
            getState: () => ApplicationStateType
        ): Promise<void> => {

            dispatch({type: UserActionsEnum.SET_USERNAME, username: username});
            if (!getState().form.getIn(['signup', 'agreement'], true)) {
                alert('You have to accept policy for registration');
            } else if (password === repeatPassword && password.length >= 1) {
                dispatch({type: UserActionsEnum.SIGNUP_ERROR_PASSWORD_REPEAT, error: false});

                this.getApiProvider()
                    .getUserApi()
                    .register(username, password)
                    .then(() => {

                        alert('Successful registration');
                        dispatch({type: UserActionsEnum.SET_PASSWORD, password: undefined});
                        dispatch({type: UserActionsEnum.SET_USERNAME, username: username});
                        this.getNavigator().push(componentId, 'SignIn');

                        // если будет необходимость после регистрации сразу авторизовывать пользователя:
                        // this.getApiProvider()
                        //     .getUserApi()
                        //     .login(username, password)
                        //     .then((loggedInUser: UserType) => {
                        //         dispatch({type: UserActionsEnum.AUTH, user: loggedInUser});
                        //         this.getNavigator().setRoot('QuestList');
                        //     })
                    })
            } else {
                dispatch({type: UserActionsEnum.SIGNUP_ERROR_PASSWORD_REPEAT, error: true});
                alert('Different passwords');
            }
        };
    }

    public toSignin(componentId: string): ControllerActionType {
        return async (): Promise<void> => {

            // this.getFacebookAccessToken(dispatch);
            // this.google();
            this.getNavigator().push(componentId, 'SignIn')
        };
    }

    public toSignup(componentId: string): ControllerActionType {
        return async (): Promise<void> => {

            ControllerCollection.getInstance().setController(FormController);
            this.getNavigator().push(componentId, 'SignUp')
        };
    }

    public changeUsernameSignIn(username: string): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>
        ): Promise<void> => {

            dispatch({type: UserActionsEnum.SET_USERNAME, username: username});
        };
    }

    public changePasswordSignIn(password: string): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>
        ): Promise<void> => {

            dispatch({type: UserActionsEnum.SET_PASSWORD, password: password});
        };
    }

    public goBack(componentId: string): ControllerActionType {
        return async (): Promise<void> => {
            Navigation.pop(componentId);
        };
    }

    public toPlay(): ControllerActionType {
        return async (): Promise<void> => {

        };
    }

    public google(): ControllerActionType {
        return async (dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>): Promise<void> => {
            try {
                await GoogleSignin.configure({
                    webClientId: '67442678365-o953t5qaa26am12gih041g8ieko86rnr.apps.googleusercontent.com',
                    iosClientId: '67442678365-ct4mg38a94cdmpu5aajvrvcqcjpc3e5s.apps.googleusercontent.com',
                });
                await GoogleSignin.hasPlayServices();
                const userInfo = await GoogleSignin.signIn();

                Backendless.UserService.loginWithGooglePlusSdk(userInfo.accessToken, {
                    "photo": "photo",
                    "email": "email",
                    "name": "name"
                }, true)
                    .then((loggedInUser: any) => { // вместо any Backendless.User todo: обновить из d.ts
                            this.getNavigator().setRoot('QuestList');
                            dispatch({type: UserActionsEnum.AUTH, user: loggedInUser});
                        }
                    ).catch((error) => {
                    console.log('loginWithGooglePlusSdk error -', error.message)
                })
            } catch (error) {
                console.log('google+ login error:', error);
            }
        };
    }

    public facebook(error: any, result: LoginResult): ControllerActionType {
        return async (dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>): Promise<void> => {
            const controller = this;

            LoginManager.logInWithReadPermissions(['email']).then(
                function(result) {
                    if (result.isCancelled) {
                        console.log('Login cancelled');
                    } else {
                        console.log('Login success with permissions: ');
                        controller.getFacebookAccessToken(dispatch);
                    }
                },
                function(error) {
                    console.log('Login fail with error: ' + error);
                }
            );
        }
    }

    private getFacebookAccessToken(dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>) {
        AccessToken.getCurrentAccessToken()
            .then((data: AccessToken | null) => {
                return this.getApiProvider().getUserApi().facebookLogin(data)
            })
            .then((user: UserType) => {
                dispatch({type: UserActionsEnum.AUTH, user: user});
                this.getNavigator().setRoot('QuestList');
            }).catch((error) => {
            console.log('facebook login error -', error)
        })
    }
}