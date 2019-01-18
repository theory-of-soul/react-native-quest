import {TranslateConfiguratorInterface} from '../Model/TranslateConfigurator/TranslateConfiguratorInterface';
import {NavigatorInterface} from '../Navigation/Navigator/NavigatorInterface';

export interface ControllerInterface {

    getTranslateConfigurator(): TranslateConfiguratorInterface;

    getNavigator(): NavigatorInterface;
}
