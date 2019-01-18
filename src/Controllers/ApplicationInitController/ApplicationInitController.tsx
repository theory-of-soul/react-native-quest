import {AnyAction} from 'redux';
import {ApplicationStateType} from '../ApplicationStateType';
import {ControllerActionType} from '../ControllerActionType';
import {ApplicationInitControllerInterface} from './ApplicationInitControllerInterface';
import {ThunkDispatch} from 'redux-thunk';
import {AbstractController} from '../AbstractController';
import {IntroInitApplicationActionsEnum} from '../../Redux/Reducers/InitializeLocale/IntroInitApplicationActionsEnum';
import {Platform} from 'react-native';
import {LanguageListPopupAndroid} from '../../View/Components/Popup/LanguageListPopup/LanguageListPopupAndroid';
import {LanguageListPopupIos} from '../../View/Components/Popup/LanguageListPopup/LanguageListPopupIos';

export class ApplicationInitController extends AbstractController implements ApplicationInitControllerInterface {

    public appInitializedAction(): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
        ): Promise<void> => {

            this.getNavigator().initializeApplicationFirstScreen('Intro');

            dispatch({
                type: IntroInitApplicationActionsEnum.CHANGE_LOCALE,
                locale: this.getTranslateConfigurator().getLocale()
            });
        };
    }

    public openTutorial(): ControllerActionType {
        return async (): Promise<void> => {

            this.getNavigator().setRoot('Tutorial');
        };
    }

    public skipTutorial(): ControllerActionType {
        return async (): Promise<void> => {

            this.getNavigator().setRoot('ChooseAuthorization');
        };
    }

    public showStepTutorial(stepIndex: number): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
        ): Promise<void> => {

            dispatch({
                type: IntroInitApplicationActionsEnum.SET_SHOW_STEP_NUMBER,
                tutorialStep: stepIndex
            });
        };
    }

    public changeLanguage(locale: string): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
        ): Promise<void> => {

            this.getTranslateConfigurator().changeLanguage(locale);

            dispatch({type: IntroInitApplicationActionsEnum.CHANGE_LOCALE, locale: locale});
        };
    }

    public toggleLanguageSelect(): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
            getState: () => ApplicationStateType
        ): Promise<void> => {

            const languageSelectOpen = getState().initialize.get('languageSelectOpen', false);
            dispatch({
                type: IntroInitApplicationActionsEnum.TOGGLE_LANGUAGE_SELECT,
                showSelect: !languageSelectOpen
            });

            if (Platform.OS === 'android') {
                this.getNavigator().showPopup(LanguageListPopupAndroid);
            } else {
                this.getNavigator().showModal(LanguageListPopupIos);
            }
        };
    }

    public playVideoButton(): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
            getState: () => ApplicationStateType
        ): Promise<void> => {

            const playVideo = getState().initialize.get('playVideo', false);
            dispatch({type: IntroInitApplicationActionsEnum.PLAY_VIDEO_BUTTON, playVideo: !playVideo})
        };
    }
}