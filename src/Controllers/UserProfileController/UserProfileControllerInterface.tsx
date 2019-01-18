import {ControllerActionType} from '../ControllerActionType';
import {ControllerInterface} from '../ControllerInterface';

export interface UserProfileControllerInterface extends ControllerInterface  {

    showLoadImage(): ControllerActionType;

    goToQuestListScreen(): ControllerActionType;
}
