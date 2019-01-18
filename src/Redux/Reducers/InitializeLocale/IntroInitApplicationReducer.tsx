import * as Immutable from 'immutable';
import {ApplicationActionType} from '../../../Controllers/ApplicationActionType';
import {IntroInitApplicationActionsEnum} from './IntroInitApplicationActionsEnum';
import {ReducerInterface} from '../ReducerInterface';

export class IntroInitApplicationReducer implements ReducerInterface {

    public getReducerMethod(
        state: Immutable.Map<string, any> = Immutable.Map({}),
        action: ApplicationActionType = {}
    ): Immutable.Map<string, any> {

        switch (action.type) {
            case IntroInitApplicationActionsEnum.CHANGE_LOCALE:
                return state.setIn(['locale'], action.locale);
            case IntroInitApplicationActionsEnum.TOGGLE_LANGUAGE_SELECT:
                return state.setIn(['languageSelectOpen'], action.showSelect);
            case IntroInitApplicationActionsEnum.PLAY_VIDEO_BUTTON:
                return state.setIn(['playVideo'], action.playVideo);
            case IntroInitApplicationActionsEnum.SET_SHOW_STEP_NUMBER:
                return state.setIn(['tutorialStep'], action.tutorialStep);
            default:
                return state;
        }
    }
}
