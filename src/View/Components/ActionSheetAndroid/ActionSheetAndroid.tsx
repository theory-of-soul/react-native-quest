import React from 'react';
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
import * as Immutable from 'immutable';

type S = {
    buttons: string[];
    actions: Immutable.List<() => {}>
}

type D = {}

type O = {
    componentId: string;
}

export class ActionSheetAndroid extends AbstractScreenView<S, D, O> {


    public getScreenId() {
        return 'ActionSheetAndroid';
    };

    public render() {

        const buttons = this.props.buttons.map((text: string, index: number) => {
            return (
                <TouchableOpacity
                    key={'actionSheetAndroidButton_' + index}
                    onPress={() => {
                        Navigation.dismissModal(this.props.componentId);
                        this.props.actions.get(index)();
                    }}
                    style={this.styles.button}
                >
                    <Text style={this.styles.buttonText}>{text}</Text>
                </TouchableOpacity>
            )
        });

        return (
            <TouchableOpacity
                onPress={() => {
                    Navigation.dismissModal(this.props.componentId);
                }}
                style={this.styles.modalWrapper}>
                <View style={this.styles.buttonsWrapper}>
                    {buttons}
                </View>
            </TouchableOpacity>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            buttons: state.actionSheetAndroid.get('buttons', []),
            actions: state.actionSheetAndroid.get('actions', Immutable.List())
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        return {}
    }

    private readonly styles = StyleSheet.create({
        modalWrapper: {
            flexDirection: 'column',
            justifyContent: 'flex-end',
            height: '100%'
        },
        buttonsWrapper: {
            backgroundColor: ColorEnum.WHITE,
            position: 'relative',
            zIndex: 2,
            paddingVertical: 10
        },
        button: {
            padding: 20,
        },
        buttonText: {
            color: ColorEnum.DARK_BLUE,
            fontSize: 18
        }
    });
}
