import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Image,
    Platform
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ColorEnum} from '../../colorEnum';
import {ActionCreatorsMapObject} from 'redux';
import ButtonFullColor from '../../Components/Button/ButtonFullColor';
import ButtonTransparent from '../../Components/Button/ButtonTransparent';
import AuthRow from '../../Components/InputRow/AuthRow';
import {AuthorizationControllerInterface} from '../../../Controllers/AuthorizationController/AuthorizationControllerInterface';
import {SocialNetButtons} from '../../Components/SocialNetButtons/SocialNetButtons';
import i18n from 'i18n-js';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

type S = {
    username: string;
    password: string;
}

type D = {
    login: any;
    toSignUp: any;
    goBack: any;
    changeUsername: any;
    changePassword: any;
}

type O = {
    componentId: string;
}

export class SignIn extends AbstractScreenView<S, D, O> {

    private InputRow = this.getElement(AuthRow);

    public getScreenId() {
        return 'SignIn';
    }

    private getInputRows(): React.ReactElement<S & D & O> {
        const InputRow = this.InputRow;

        return (
            <View style={this.styles.form}>
                <InputRow
                    img={require('../../../../files/img/authorization/login.png')}
                    textContentType={'username'}
                    placeholder={'Username'}

                    value={this.props.username}
                    onChangeText={(text: string) => {
                        this.props.changeUsername(text);
                    }}
                />
                <InputRow
                    img={require('../../../../files/img/authorization/key.png')}
                    placeholder={'Password'}
                    textContentType={'password'}
                    secureTextEntry={true}
                    border={false}

                    value={this.props.password}

                    key={'signin_password'}
                    onChangeText={(text: string) => {
                        this.props.changePassword(text);
                    }}
                />
            </View>
        )
    }

    public render() {

        const ButtonSignIn = this.getElement(ButtonFullColor);
        const ButtonSignUp = this.getElement(ButtonTransparent);
        const SocialNets= this.getElement(SocialNetButtons);

        return (
            <SafeAreaView style={this.styles.safeArea}>
                <Image
                    source={require('../../../../files/img/authorization/background.jpg')}
                    style={this.styles.background}
                    resizeMethod={'scale'}
                    resizeMode={'stretch'}
                >
                </Image>
                    <View style={this.styles.mainWrapper}>
                        <TouchableOpacity
                            style={this.styles.arrowBack}
                            onPress={this.props.goBack}
                        >
                            <Image
                                style={this.styles.arrowBackImage}
                                resizeMode={'contain'}
                                source={require('../../../../files/img/general/right-arrow.png')}
                            />
                        </TouchableOpacity>
                        <View style={{flex: 0}}>
                            <Text style={this.styles.title}>{i18n.t('signIn')}</Text>
                        </View>
                        <View style={this.styles.wrapper}>
                            <View style={this.styles.formWrapper}>

                                {this.getInputRows()}

                                <ButtonSignIn
                                    style={this.styles.button}
                                    width={wp('71%')}
                                    onPress={() => {
                                        this.props.login(this.props.username, this.props.password)
                                    }}
                                    text={i18n.t('signIn')}
                                />
                                <View style={this.styles.socnetWrapper}>
                                    <Text style={this.styles.text}>
                                        {i18n.t('SignInScreen.enter')}
                                    </Text>

                                    <SocialNets />
                                </View>
                            </View>
                        </View>
                        <View style={this.styles.signup}>
                            <ButtonSignUp
                                width={wp('71%')}
                                onPress={this.props.toSignUp}
                                text={i18n.t('signUp')}
                                thin={true}
                            />
                            <TouchableOpacity activeOpacity={0.9}>
                                <Text style={this.styles.text}>
                                    {i18n.t('SignInScreen.forgot')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </SafeAreaView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            username: state.users.get('username', undefined),
            password: state.users.get('password', undefined)
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<AuthorizationControllerInterface>('Authorization');

        return {
            login: controller.login.bind(controller),
            toSignUp: controller.toSignup.bind(controller, ownProps.componentId),
            goBack: controller.goBack.bind(controller, ownProps.componentId),
            changeUsername: controller.changeUsernameSignIn.bind(controller),
            changePassword: controller.changePasswordSignIn.bind(controller)
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
        mainWrapper: {
            flex: 1,
            justifyContent: 'space-around',
            flexDirection: 'column'
        },
        arrowBack: {
            flex: 0,
            alignSelf: 'flex-start',
            paddingHorizontal: wp('2%'),
            position: 'absolute',
            top: hp('2.5%'),
            left: wp('4%'),
            zIndex: 2,
        },
        arrowBackImage: {
            width: wp('6.5%'),
            height: wp('6.5%')
        },
        wrapper: {
            flex: 0,
            flexDirection: 'column',
            alignItems: 'center'
        },
        title: {
            color: ColorEnum.DARK_BLUE,
            fontSize: this.getAdaptiveSize(32),
            marginTop: hp( '15%'),
            marginBottom: hp('3%'),
            textAlign: 'center'
        },
        formWrapper: {
            width: wp('89%'),
            alignItems: 'center'
        },
        form: {
            backgroundColor: ColorEnum.WHITE,
            paddingHorizontal: hp('3%'),
            paddingVertical: wp('3%'),
            paddingBottom: hp('5%'),
            borderRadius: this.getAdaptiveSize(20),
            width: '100%',
            marginBottom: -1 * this.getAdaptiveSize(50)
        },
        button: {
            position: 'relative',
        },
        text: {
            color: ColorEnum.WHITE,
            fontSize: this.getAdaptiveSize(16),
            marginBottom: hp('2%'),
            marginTop: hp('2%'),
            textAlign: 'center'
        },
        socnetWrapper: {
            alignItems: 'center'
        },
        signup: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hp('3%')
        }
    });
}
