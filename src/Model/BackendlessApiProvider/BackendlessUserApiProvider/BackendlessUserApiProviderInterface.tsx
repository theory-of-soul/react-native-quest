import {UserType} from './UserType';
import {AccessToken} from 'react-native-fbsdk';

export interface BackendlessUserApiProviderInterface {

    login(username: string, password: string): Promise<UserType>;

    register(username: string, password: string): Promise<UserType>;

    updateUser(user: UserType): Promise<UserType>;

    facebookLogin(data: AccessToken | null): Promise<UserType>;
}