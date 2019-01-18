import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    TextInput
} from 'react-native';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../Model/View/AbstractView';
import {ColorEnum} from '../../colorEnum';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type S = {}

type D = {}

type O = {
    border: boolean;
    img: any;
    errorPasswordRepeat?: boolean;
    keyS: string;
}

export default class AuthRow extends AbstractView<S, D, O> {

    public render() {

        let inputStyle = [this.styles.input];

        if (this.props.border === undefined) {
            inputStyle.push(this.styles.border)
        }

        if (this.props.errorPasswordRepeat) {
            inputStyle.push(this.styles.error);
        }

        return (
            <View style={this.styles.inputRow}>
                <Image
                    style={this.styles.icon}
                    source={this.props.img}
                />
                <TextInput
                    key={'input_' + this.props.keyS}
                    style={inputStyle}
                    {...this.props}
                />
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {};
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        return {}
    }

    private readonly styles = StyleSheet.create({
        icon: {
            width: this.getAdaptiveSize(20),
            marginRight: this.getAdaptiveSize(15),
            resizeMode: 'contain'
        },
        inputRow: {
            flex: 0,
            flexDirection: 'row',
            alignItems: 'center'
        },
        input: {
            fontSize: this.getAdaptiveSize(20),
            paddingHorizontal: 0,
            paddingVertical: hp('2.3%'),
            flex: 1,
        },
        border: {
            borderBottomColor: ColorEnum.GRAY,
            borderBottomWidth: this.getAdaptiveSize(2),
            opacity: 0.5
        },
        error: {
            color: ColorEnum.RED,
            borderColor: ColorEnum.RED
        }
    });
}
