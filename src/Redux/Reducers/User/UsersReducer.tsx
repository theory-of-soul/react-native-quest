import * as Immutable from 'immutable';
import {UserActionsEnum} from './UserActionsEnum';
import {ApplicationActionType} from '../../../Controllers/ApplicationActionType';
import {ReducerInterface} from '../ReducerInterface';
import {UserType} from '../../../Model/BackendlessApiProvider/BackendlessUserApiProvider/UserType';

export class UsersReducer implements ReducerInterface {

    public getReducerMethod(
        state: Immutable.Map<string, any> = Immutable.Map({}),
        action: ApplicationActionType = {}
    ): Immutable.Map<string, any> {

        switch (action.type) {
            case UserActionsEnum.AUTH:

                const user: UserType = action.user;
                const userState = state.setIn([user.objectId], user);
                const stateWithoutUsername = userState.remove('username');
                const stateWithoutPassword = stateWithoutUsername.remove('password');

                return stateWithoutPassword.merge(stateWithoutPassword, {
                    'lastUserId': user.objectId,
                });
            case UserActionsEnum.SAVE_USER_PHOTO:

                const lastUserId = state.get('lastUserId');
                let userInfo = state.get(lastUserId);

                userInfo.photo = action.photo;

                return state.set(
                    lastUserId,
                    Object.assign({}, userInfo)
                );
            case UserActionsEnum.SET_USERNAME:
                return state.setIn(['username'], action.username);
            case UserActionsEnum.SET_PASSWORD:
                return state.setIn(['password'], action.password);
            case UserActionsEnum.SIGNUP_ERROR_PASSWORD_REPEAT:
                return state.setIn(['error', 'passwordRepeat'], action.error);

            default:
                return state;
        }
    }
}