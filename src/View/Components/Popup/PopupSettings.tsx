import React, {ComponentType} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ColorEnum} from '../../colorEnum';
import {Navigation} from 'react-native-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ViewConstructor} from '../../../Model/View/ViewConstructor';

type S = {
}

type D = {}

type O = {
    componentId: string;
    children?: ViewConstructor<any, any, any>
}

export class PopupSettings extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'PopupSettings';
    };

    private children?: ComponentType;


    public render() {

        let Children;

        if (this.props.children !== undefined) {
            Children = this.children || this.getElement(this.props.children);
        } else {
            Children = View;
        }

        return (
            <TouchableOpacity
                onPress={() => {
                    Navigation.dismissModal(this.props.componentId);
                }}
                style={this.styles.modalWrapper}>
                <View style={this.styles.childrenWrapper}>
                    { this.props.children !== undefined ?  <Children /> : undefined }
                </View>
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
            justifyContent: 'center',
            alignSelf: 'center',
            height: hp('100%')
        },
        childrenWrapper: {
            backgroundColor: ColorEnum.WHITE,
            position: 'relative',
            zIndex: 2,
            padding: wp('5%'),
            width: wp('59%'),
            borderRadius: 30,
            flex: 0,
        },
    });
}
