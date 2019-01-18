import {ViewWrapperInterface} from '../ViewWrapper/ViewWrapperInterface';

export interface ScreenViewWrapperInterface extends ViewWrapperInterface {

    getScreenId(): string;
}
