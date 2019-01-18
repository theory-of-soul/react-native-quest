import React from 'react';
import {
    StyleSheet,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import {ApplicationStateType} from '../../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../../Model/View/AbstractView';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FormControllerInterface} from '../../../../Controllers/FormController/FormControllerInterface';

type S = {
    check: boolean;
}

type D = {
    setCheckbox: any;
}

type O = {
    text: string;
    namespace: string[];
}

export class CheckboxComponent extends AbstractView<S, D, O> {

    public render() {

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    this.props.setCheckbox(this.props.namespace, !this.props.check)
                }}
                style={this.styles.checkbox}
            >
                {
                    this.props.check ?
                        <Image
                            style={this.styles.checkboxImage}
                            source={require('../../../../../files/img/general/checkbox/checkbox-check.png')}
                        /> :
                        <Image
                            style={this.styles.checkboxImage}
                            source={require('../../../../../files/img/general/checkbox/checkbox.png')}
                        />
                }
                <Text style={this.styles.checkboxText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            check: ownProps.namespace !== undefined ? state.form.getIn(ownProps.namespace, true) : true,
        }
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<FormControllerInterface>('Form');

        return {
            setCheckbox: controller.setCheckbox.bind(controller)
        }
    }

    private readonly styles = StyleSheet.create({
        checkbox: {
            flex: 0,
            flexDirection: 'row',
            width: wp('85%'),
            top: this.getAdaptiveSize(20),
            alignItems: 'center',
            marginBottom: this.getAdaptiveSize(20),
        },
        checkboxText: {
            flex: 1,
            flexWrap: 'wrap',
            marginLeft: this.getAdaptiveSize(10),
        },
        checkboxImage: {
            height: this.getAdaptiveSize(26),
            resizeMode: 'contain'
        }
    });
}
