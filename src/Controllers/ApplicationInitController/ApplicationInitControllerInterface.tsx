import {ControllerActionType} from '../ControllerActionType';
import {ControllerInterface} from '../ControllerInterface';

export interface ApplicationInitControllerInterface extends ControllerInterface {

    appInitializedAction(): ControllerActionType;

    openTutorial(): ControllerActionType;

    skipTutorial(): ControllerActionType;

    showStepTutorial(stepIndex: number): ControllerActionType;

    changeLanguage(locale: string): ControllerActionType;

    toggleLanguageSelect(): ControllerActionType;

    playVideoButton(): ControllerActionType;
}
