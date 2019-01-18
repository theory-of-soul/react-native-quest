import {AnyAction, combineReducers} from 'redux';
import {UsersReducer} from './User/UsersReducer';
import {IntroInitApplicationReducer} from './InitializeLocale/IntroInitApplicationReducer';
import {QuestListReducer} from './QuestList/QuestListReducer';
import {UserProfileReducer} from './UserProfile/UserProfileReducer';
import {ActionSheetAndroidReducer} from './ActionSheetAndroid/ActionSheetAndroidReducer';
import {FormReducer} from './Form/FormReducer';

const rootReducer = combineReducers<any, AnyAction>({
    users: new UsersReducer().getReducerMethod,
    initialize: new IntroInitApplicationReducer().getReducerMethod,
    questList: new QuestListReducer().getReducerMethod,
    userProfile: new UserProfileReducer().getReducerMethod,
    actionSheetAndroid: new ActionSheetAndroidReducer().getReducerMethod,
    form: new FormReducer().getReducerMethod
});

export default rootReducer;