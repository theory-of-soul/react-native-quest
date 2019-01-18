import React from 'react';
import {
    RegisteredStyle,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../Model/View/AbstractView';
import {ColorEnum} from '../../colorEnum';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

type S = {}

type D = {
}

type O = {
    text: string;
    width?: number | string;
    onPress: () => void;
    style: RegisteredStyle<any>;
}

export default class ButtonYellow extends AbstractView<S, D, O> {
    public render() {
        const width = this.props.width || '100%';

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={[
                    this.styles.playButton,
                    {minWidth: width},
                    this.props.style
                ]}
            >
                <Text style={this.styles.playButtonText}>{this.props.text.toUpperCase()}</Text>
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
        playButton: {
            marginTop: this.getAdaptiveSize(20),
            padding: hp('2.2%'),
            borderRadius: this.getAdaptiveSize(30),
            alignItems: 'center',
            backgroundColor: ColorEnum.YELLOW,
        },
        playButtonText: {
            fontSize: this.getAdaptiveSize(18),
            color: ColorEnum.DARK_BLUE,
        }
    });
}
