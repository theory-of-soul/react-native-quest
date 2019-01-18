import {ComponentType, default as React} from 'react';
import {connect} from 'react-redux';
import {ScreenViewWrapperInterface} from './ScreenViewWrapperInterface';
import {ScreenViewInterface} from '../ScreenView/ScreenViewInterface';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';
import {Navigation} from 'react-native-navigation';

export class ScreenViewWrapper<S, D, O> implements ScreenViewWrapperInterface {

    private readonly component: ComponentType;

    protected readonly view: ScreenViewInterface<S, D, O>;

    public constructor(
        view: ScreenViewInterface<S, D, O>,
    ) {
        this.view = view;
        this.component = this.createComponent(view);
    }

    public getComponent(): ComponentType {
        return this.component;
    }

    public getScreenId(): string {
        return this.view.getScreenId();
    }

    private createComponent(view: ScreenViewInterface<S, D, O>): ComponentType {

        const mapDispatchToPropertiesWrapper = (dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> => {
            return bindActionCreators(
                view.mapDispatchToProperties(dispatch, ownProps),
                dispatch
            );
        };

        return connect(
            view.mapStateToProperties.bind(view),
            mapDispatchToPropertiesWrapper.bind(view)
        )(this.render.bind(this)) as any;
    }

    private render(properties: S & D & O): React.ReactElement<S & D & O> {
        this.view.props = properties;
        Navigation.events().bindComponent(this.view);

        return this.view.render();
    }
}
