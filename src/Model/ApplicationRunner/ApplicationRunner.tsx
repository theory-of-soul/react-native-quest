import {ApplicationRunnerInterface} from './ApplicationRunnerInterface';
import {StoreProvider} from '../../Redux/Store/StoreProvider';
import {NavigationScreenRegister} from '../../Navigation/NavigationScreenRegister/NavigationScreenRegister';
import {ApplicationInitController} from '../../Controllers/ApplicationInitController/ApplicationInitController';
import {DispatchProvider} from '../../Redux/Dispatch/DispatchProvider';
import {Intro} from '../../View/Screens/Intro/Intro';
import {ChooseAuthorization} from '../../View/Screens/Authorization/ChooseAuthorization';
import {SignIn} from '../../View/Screens/Authorization/SignIn';
import Backendless from 'backendless';
import {AuthorizationController} from '../../Controllers/AuthorizationController/AuthorizationController';
import {QuestList} from '../../View/Screens/QuestList/QuestList';
import {SignUp} from '../../View/Screens/Authorization/SignUp';
import {TranslateConfigurator} from '../TranslateConfigurator/TranslateConfigurator';
import {QuestListController} from '../../Controllers/QuestListController/QuestListController';
import {UserProfile} from '../../View/Screens/UserProfile/UserProfile';
import {UserProfileController} from '../../Controllers/UserProfileController/UserProfileController';
import {ActionSheetAndroid} from '../../View/Components/ActionSheetAndroid/ActionSheetAndroid';
import {APPLICATION_SETTINGS} from '../../applicationSettings';
import {Tutorial} from '../../View/Screens/Tutorial/Tutorial';
import {PopupSettings} from '../../View/Components/Popup/PopupSettings';
import {ControllerCollection} from '../../Controllers/ControllerCollection/ControllerCollection';
import {ApplicationInitControllerInterface} from '../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';
import {EmptyModal} from '../../View/Components/Popup/EmptyModal';

export class ApplicationRunner implements ApplicationRunnerInterface {

    protected initBackendless(): void {
        Backendless.initApp(APPLICATION_SETTINGS.BACKENDLESS_APP_ID, APPLICATION_SETTINGS.BACKENDLESS_APP_KEY);
    }

    public run(): void {

        const store = new StoreProvider().getStore();
        const dispatch = new DispatchProvider(store).getDispatch();

        const screenRegister = new NavigationScreenRegister(store);

        this.initBackendless();

        TranslateConfigurator.getInstance();

        const controllerCollection = ControllerCollection.getInstance();
        controllerCollection.setController(ApplicationInitController);

        screenRegister
            .add(Intro)
            .add(Tutorial)
            .add(ChooseAuthorization, AuthorizationController)
            .add(SignIn, AuthorizationController)
            .add(SignUp, AuthorizationController)
            .add(QuestList, QuestListController)
            .add(UserProfile, UserProfileController)
            .add(ActionSheetAndroid)
            .add(EmptyModal)
            .add(PopupSettings);

        store.subscribe(() => {
            console.log('STORE =>', store.getState());
        });

        dispatch((controllerCollection.getController('ApplicationInit') as ApplicationInitControllerInterface).appInitializedAction());
    }
}

