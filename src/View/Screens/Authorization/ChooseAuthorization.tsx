import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Dimensions,
    Platform
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ColorEnum} from '../../colorEnum';
import {ControllerActionType} from '../../../Controllers/ControllerActionType';
import {ActionCreatorsMapObject} from 'redux';
import ButtonYellow from '../../Components/Button/ButtonYellow';
import ButtonFullColor from '../../Components/Button/ButtonFullColor';
import ButtonTransparent from '../../Components/Button/ButtonTransparent';
import {AuthorizationControllerInterface} from '../../../Controllers/AuthorizationController/AuthorizationControllerInterface';
import i18n from 'i18n-js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

type S = {}

type D = {
    toSignIn: ControllerActionType;
    toSignUp: ControllerActionType;
}

type O = {
    componentId: string;
}

export class ChooseAuthorization extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'ChooseAuthorization';
    }

    public render() {

        const ButtonPlay = this.getElement(ButtonYellow);
        const ButtonSignUp = this.getElement(ButtonTransparent);
        const ButtonSignIn = this.getElement(ButtonFullColor);

        return (
            <SafeAreaView style={this.styles.safeArea}>
                <Image
                    source={require('../../../../files/img/authorization/background.jpg')}
                    style={this.styles.background}
                    resizeMethod={'scale'}
                    resizeMode={'stretch'}
                >
                </Image>
                    <View style={this.styles.wrapper}>
                        <View>
                            <Text style={this.styles.title}>
                                {i18n.t('chooseAuthorization.join')}
                            </Text>
                        </View>
                        <View style={this.styles.buttons}>
                            <ButtonSignIn
                                width={wp('75%')}
                                onPress={this.props.toSignIn}
                                text={i18n.t('signIn')}
                            />
                            <ButtonSignUp
                                width={wp('75%')}
                                onPress={this.props.toSignUp}
                                text={i18n.t('signUp')}
                            />
                            <ButtonPlay
                                style={this.styles.play}
                                width={wp('75%')}
                                onPress={() => {}}
                                text={i18n.t('chooseAuthorization.play')}
                            />
                        </View>
                    </View>
            </SafeAreaView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {};
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<AuthorizationControllerInterface>('Authorization');

        return {
            toSignIn: controller.toSignin.bind(controller, ownProps.componentId),
            toSignUp: controller.toSignup.bind(controller, ownProps.componentId)
        }
    }

    private readonly styles = StyleSheet.create({
        safeArea: {
            backgroundColor: ColorEnum.WHITE,
            width: wp('100%'),
            height: hp('100%'),
        },
        background: {
            width: Dimensions.get('window').width,
            height: Platform.OS === 'ios' ? Dimensions.get('window').height : Dimensions.get('window').height * 1.03,
            position: 'absolute',
            top: Platform.OS === 'ios' ? 0 : -1 * Dimensions.get('window').height * 0.05,
            left: 0,
        },
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },
        title: {
            color: ColorEnum.DARK_BLUE,
            fontSize: this.getAdaptiveSize(32),
            marginTop: hp( '15%'),
            textAlign: 'center',
        },
        buttons: {
            marginTop: hp('21%'),
        },
        play: {
            marginTop: this.getAdaptiveSize(60)
        }
    });
}
