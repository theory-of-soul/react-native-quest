import {ControllerActionType} from '../ControllerActionType';
import {ControllerInterface} from '../ControllerInterface';

export interface QuestListControllerInterface extends ControllerInterface  {

    toggleFilterTags(): ControllerActionType;

    openUserProfile(componentId: string): ControllerActionType;
}
