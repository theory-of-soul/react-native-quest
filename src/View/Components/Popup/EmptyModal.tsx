import React, {ComponentType} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ViewConstructor} from '../../../Model/View/ViewConstructor';
import {Navigation} from 'react-native-navigation';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

type S = {
}

type D = {}

type O = {
    componentId: string;
    children: ViewConstructor<any, any, any>
}

export class EmptyModal extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'EmptyModal';
    };

    private children?: ComponentType;


    public render() {

        let Children = this.children || this.getElement(this.props.children);

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    Navigation.dismissModal(this.props.componentId);
                }}
                style={this.styles.modalWrapper}
            >
                <Children />
            </TouchableOpacity>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {};
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        return {}
    }

    private readonly styles = StyleSheet.create({
        modalWrapper: {
            flexDirection: 'column',
            height: hp('100%'),
            width: wp('100%')
        },
    });
}
