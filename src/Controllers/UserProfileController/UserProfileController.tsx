import {AnyAction} from 'redux';
import {ApplicationStateType} from '../ApplicationStateType';
import {ControllerActionType} from '../ControllerActionType';
import {ThunkDispatch} from 'redux-thunk';
import {AbstractController} from '../AbstractController';
import {UserProfileControllerInterface} from './UserProfileControllerInterface';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import * as Immutable from 'immutable';
import {LoadFileResponseType} from '../../Model/FileLoader/LoadFileResponseType';
import {UserActionsEnum} from '../../Redux/Reducers/User/UserActionsEnum';

export class UserProfileController extends AbstractController implements UserProfileControllerInterface {

    public goToQuestListScreen(): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
            getState: () => ApplicationStateType
        ): Promise<void> => {

            this.getNavigator().setRoot('QuestList');
        }
    }


    public showLoadImage(): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
            getState: () => ApplicationStateType
        ): Promise<void> => {

            const buttons = ['Take photo', 'Choose photo'];
            let user = this.getUser(getState);
            const actions = Immutable.List([
                () => {
                    ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        cropping: true
                    }).then((image: Image | Image[]): any => {
                        if (!(image instanceof Array) && image.data !== null) {
                            return this.getFileLoader().load({
                                    url: image.path,
                                    mime: image.mime,
                                    filename: `user_avatar_${(new Date()).getTime()}.jpg`
                                },
                                `/users/${user.objectId}/avatar`
                            )
                        }
                    }).then((response: LoadFileResponseType) => {

                        dispatch({type: UserActionsEnum.SAVE_USER_PHOTO, photo: response.fileURL});
                        user.photo = response.fileURL;

                        this.getApiProvider().getUserApi().updateUser(user).then((res) => {
                            console.log('afterUpdate', res);
                        });
                    }).catch((error: any) => {
                        console.log('ImagePicker error - ', error);
                    });
                },
                () => {
                    ImagePicker.openPicker({
                        width: 200,
                        height: 200,
                        cropping: true,
                        includeBase64: true,
                        mediaType: 'photo',
                        forceJpg: true,
                        compressImageMaxWidth: 200,
                        compressImageMaxHeight: 200,
                        compressImageQuality: 0.6
                    }).then((image: Image | Image[]): any => {
                        if (!(image instanceof Array) && image.data !== null) {
                            return this.getFileLoader().load({
                                    url: image.path,
                                    mime: image.mime,
                                    filename: `user_avatar_${(new Date()).getTime()}.jpg`
                                },
                                `/users/${user.objectId}/avatar`
                            )
                        }
                    }).then((response: LoadFileResponseType) => {

                        dispatch({type: UserActionsEnum.SAVE_USER_PHOTO, photo: response.fileURL});
                        user.photo = response.fileURL;

                        this.getApiProvider().getUserApi().updateUser(user).then((res) => {
                            console.log('afterUpdate', res);
                        });
                    }).catch((error: any) => {
                        console.log('ImagePicker error - ', error);
                    });
                }
            ]);

            this.getNavigator().showActionSheet(buttons, actions, dispatch);
        }
    }
}