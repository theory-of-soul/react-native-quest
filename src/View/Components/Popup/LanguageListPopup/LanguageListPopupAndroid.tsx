import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {ApplicationStateType} from '../../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../../Model/View/AbstractView';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ApplicationInitControllerInterface} from '../../../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';
import {Navigation} from 'react-native-navigation';

type S = {
}

type D = {
    changeLanguage: any;
}

type O = {
}

export class LanguageListPopupAndroid extends AbstractView<S, D, O> {

    public render() {

        // todo когда появится функция получения языков через бэк переделать через map
        return (
            <ScrollView style={this.styles.rowWrapper}>
                <TouchableOpacity
                    key={0}
                    activeOpacity={0.5}
                    onPress={() => {
                        Navigation.dismissAllModals();
                        this.props.changeLanguage('ru');
                    }}
                    style={[this.styles.row, {marginBottom: hp('1%')}]}
                >
                    <Text style={this.styles.rowText}>Русский</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    key={1}
                    activeOpacity={0.5}
                    onPress={() => {
                        Navigation.dismissAllModals();
                        this.props.changeLanguage('en');
                    }}
                    style={this.styles.row}
                >
                    <Text style={this.styles.rowText}>English</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {}
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<ApplicationInitControllerInterface>('ApplicationInit');

        return {
            changeLanguage: controller.changeLanguage.bind(controller),
        }
    }

    private readonly styles = StyleSheet.create({
        rowWrapper: {
            flex: 0,
            flexDirection: 'column',
        },
        row: {
            alignSelf: 'stretch',
        },
        rowText: {
            fontSize: 20,
        },
    });
}
