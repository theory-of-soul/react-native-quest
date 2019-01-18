import {BackendlessUserApiProviderInterface} from './BackendlessUserApiProviderInterface';
import Backendless from "backendless";
import {UserType} from './UserType';
import {BackendlessServerUserType} from './BackendlessUserType';
import {AccessToken} from 'react-native-fbsdk';

export class BackendlessUserApiProvider implements BackendlessUserApiProviderInterface {

    private userTypeAdaptor(user: BackendlessServerUserType): UserType {
        return {
            email: user.email || '',
            photo: user.photo || '',
            name: user.username || '',
            objectId: user.objectId || '',
            "user-token": user["user-token"],
        }
    }

    public async login(username: string, password: string): Promise<UserType> {

        return new Promise<UserType>((resolve) => {

            Backendless.UserService
                .login<BackendlessServerUserType>( username, password, true )
                .then((user: BackendlessServerUserType) => {
                    return this.userTypeAdaptor(user);
                })
                .then(resolve)
                .catch((error) => {
                    console.log('error', error);
                    if (error.code === 3003) {
                        alert('Invalid login or password.');
                    }
                });
        })
    }

    public register(username: string, password: string): Promise<UserType> {

        return new Promise<UserType>((resolve) => {
            Backendless.UserService
                .register<any>({
                    email: username,
                    password: password
                })
                .then((user: BackendlessServerUserType) => {
                    return this.userTypeAdaptor(user);
                })
                .then(resolve)
                .catch((error: any) => {
                    console.log('error register', error.code);
                    if (error.code === 3040) {
                        alert('Username has to be a email address');
                    } else if (error.code === 3033) {
                        alert('User with the same identity already exists');
                    }
                });
        })
    }

    public updateUser(user: UserType): Promise<UserType> {

        return new Promise<UserType>((resolve) => {

            Backendless.UserService.update<UserType>(user)
                .then(resolve)
                .catch((error: any) => {
                    console.log('Backendless.UserService.update error - ', error);
                })
        })
    }

    public facebookLogin(data: AccessToken | null): Promise<UserType> {

        return new Promise<UserType>((resolve) => {
            if (data !== null) {
                Backendless.UserService.loginWithFacebookSdk(data.accessToken)
                    .then((loggedInUser: BackendlessServerUserType) => {
                        return this.updateUser(loggedInUser);
                    }).then(resolve).catch((error: any) => {
                        console.log('Backendless.UserService.loginWithFacebookSdk error - ', error)
                    }
                )
            }
        })
    }
}
