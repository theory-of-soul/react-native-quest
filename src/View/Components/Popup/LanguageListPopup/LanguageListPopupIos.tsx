import React from 'react';
import {
    StyleSheet,
    View,
    Picker,
} from 'react-native';
import {ApplicationStateType} from '../../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../../Model/View/AbstractView';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ApplicationInitControllerInterface} from '../../../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';
import {ColorEnum} from '../../../colorEnum';

type S = {
    locale: string;
}

type D = {
    changeLanguage: any;
}

type O = {

}

export class LanguageListPopupIos extends AbstractView<S, D, O> {

    public render() {

        // todo когда появится функция получения языков через бэк переделать через map
        return (
            <View style={this.styles.pickerWrapper}>
                <Picker
                    style={this.styles.picker}
                    selectedValue={this.props.locale}
                    onValueChange={(itemValue) => {
                        this.props.changeLanguage(itemValue);
                    }}>
                    <Picker.Item label="Русский" value="ru" />
                    <Picker.Item label="English" value="en" />
                </Picker>
            </View>
        )
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            locale: state.initialize.get('locale', 'en'),
        }
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<ApplicationInitControllerInterface>('ApplicationInit');

        return {
            changeLanguage: controller.changeLanguage.bind(controller),
        }
    }

    private readonly styles = StyleSheet.create({
        pickerWrapper: {
            width: '100%',
            position: 'absolute',
            zIndex: 20,
            bottom: 0,
            left: 0,
            backgroundColor: ColorEnum.CONTAINER,
            borderTopColor: ColorEnum.GRAY,
            borderTopWidth: 1,
            flex: 0,
            flexDirection: 'column'
        },
        picker: {
            height: hp('25%'),
        },
    });
}
