import {AnyAction} from 'redux';
import {ApplicationStateType} from '../ApplicationStateType';
import {ControllerActionType} from '../ControllerActionType';
import {ThunkDispatch} from 'redux-thunk';
import {QuestListControllerInterface} from './QuestListControllerInterface';
import {AbstractController} from '../AbstractController';
import {QuestListActionsEnum} from '../../Redux/Reducers/QuestList/QuestListActionsEnum';

export class QuestListController extends AbstractController implements QuestListControllerInterface {

    public toggleFilterTags(): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
            getState: () => ApplicationStateType
        ): Promise<void> => {

            dispatch({
                type: QuestListActionsEnum.TOGGLE_FILTER_BUTTON,
                showFilterTags: !getState().questList.get('showFilterTags', false)
            });
        }
    }

    public openUserProfile(componentId: string): ControllerActionType {
        return async (
            dispatch: ThunkDispatch<ApplicationStateType, void, AnyAction>,
            getState: () => ApplicationStateType
        ): Promise<void> => {

            this.getNavigator().push(componentId, 'UserProfile')
        }
    }
}