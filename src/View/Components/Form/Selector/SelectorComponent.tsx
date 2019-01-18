import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {ApplicationStateType} from '../../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../../Model/View/AbstractView';
import i18n from 'i18n-js';
import {ColorEnum} from '../../../colorEnum';
import {ApplicationInitControllerInterface} from '../../../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';

type S = {
    locale?: string;
    languageSelectOpen: boolean;
}

type D = {
    changeLanguage: any;
    toggleLanguageSelect: any;
}

type O = {
    languageSelectOpen: boolean;
}

export class SelectorComponent extends AbstractView<S, D, O> {

    public render() {
        return (
            <View style={this.styles.languageWrapper}>
                <TouchableOpacity
                    onPress={this.props.toggleLanguageSelect}
                    style={this.styles.languageText}
                >
                    <Text style={this.styles.language}>
                        {i18n.t('intro.language')}:
                        <Text style={[this.styles.language, this.styles.bold]}>
                            {' ' + i18n.t('languages.' + this.props.locale)}
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            locale: state.initialize.get('locale', 'en'),
            languageSelectOpen: state.initialize.get('languageSelectOpen', false),
        }
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<ApplicationInitControllerInterface>('ApplicationInit');

        return {
            changeLanguage: controller.changeLanguage.bind(controller),
            toggleLanguageSelect: controller.toggleLanguageSelect.bind(controller)
        }
    }

    private readonly styles = StyleSheet.create({
        languageWrapper: {
            flex: 0,
            flexDirection: 'row',
        },
        languageText: {
            flex: 1,
        },
        language: {
            color: ColorEnum.DARK_BLUE,
            fontSize: this.getAdaptiveSize(20),
            textAlign: 'center'
        },
        bold: {
            fontWeight: 'bold'
        }
    });
}
