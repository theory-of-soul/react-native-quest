import {ControllerInterface} from './ControllerInterface';
import {TranslateConfiguratorInterface} from '../Model/TranslateConfigurator/TranslateConfiguratorInterface';
import {TranslateConfigurator} from '../Model/TranslateConfigurator/TranslateConfigurator';
import {NavigatorInterface} from '../Navigation/Navigator/NavigatorInterface';
import {Navigator} from '../Navigation/Navigator/Navigator';
import {FileLoaderInterface} from '../Model/FileLoader/FileLoaderInterface';
import {FileLoader} from '../Model/FileLoader/FileLoader';
import {BackendlessApiProviderInterface} from '../Model/BackendlessApiProvider/BackendlessApiProviderInterface';
import {BackendlessApiProvider} from '../Model/BackendlessApiProvider/BackendlessApiProvider';
import {BackendlessUserApiProvider} from '../Model/BackendlessApiProvider/BackendlessUserApiProvider/BackendlessUserApiProvider';
import {UserType} from '../Model/BackendlessApiProvider/BackendlessUserApiProvider/UserType';
import {ApplicationStateType} from './ApplicationStateType';

export class AbstractController implements ControllerInterface {

    private apiProvider = new BackendlessApiProvider(new BackendlessUserApiProvider());

    public getTranslateConfigurator(): TranslateConfiguratorInterface {
        return TranslateConfigurator.getInstance();
    }

    public getNavigator(): NavigatorInterface {
        return Navigator.getInstance();
    }

    public getFileLoader(): FileLoaderInterface {
        return FileLoader.getInstance();
    }

    public getApiProvider(): BackendlessApiProviderInterface {
        return this.apiProvider;
    }

    protected getUser(getState: () => ApplicationStateType): UserType {
        const state = getState();
        return state.users.get(state.users.get('lastUserId'));
    }

}