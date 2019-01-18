import {ViewWrapperInterface} from './ViewWrapperInterface';
import {ComponentType, default as React} from 'react';
import {ViewInterface} from '../ViewInterface';
import {connect} from 'react-redux';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject, bindActionCreators} from 'redux';

export class ViewWrapper<S, D, O> implements ViewWrapperInterface {

    private readonly component: ComponentType;

    protected readonly view: ViewInterface<S, D, O>;

    public constructor(
        view: ViewInterface<S, D, O>
    ) {
        this.view = view;
        this.component = this.createComponent(view);
    }

    public getComponent(): ComponentType {
        return this.component;
    }

    private createComponent(view: ViewInterface<S, D, O>): ComponentType {
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

        return this.view.render();
    }
}
