import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Dimensions,
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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CheckboxComponent} from '../../Components/Form/Checkbox/CheckboxComponent';


type S = {
    errorPasswordRepeat: boolean;
    username?: string;
    password?: string;
}

type D = {
    register: any;
    toSignIn: any;
    goBack: any;
    changeUsername: any;
    changePassword: any;
}

type O = {
    componentId: string;
}

export class SignUp extends AbstractScreenView<S, D, O> {

    private InputRow = this.getElement(AuthRow);
    private repeatPassword: string = '';

    public getScreenId() {
        return 'SignUp';
    }

    private getFormRows(): React.ReactElement<S & D & O> {

        const InputRow = this.InputRow;

        let formStyles = [this.styles.form];

        if (this.props.errorPasswordRepeat) {
            formStyles.push(this.styles.error)
        }

        return(
            <View style={formStyles}>
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

                    value={this.props.password}
                    onChangeText={(text: string) => {
                        this.props.changePassword(text);
                    }}
                />
                <InputRow
                    img={require('../../../../files/img/authorization/key.png')}
                    placeholder={'Repeat password'}
                    textContentType={'password'}
                    secureTextEntry={true}
                    border={false}

                    error={this.props.errorPasswordRepeat}
                    onChangeText={(text: string) => {
                        this.repeatPassword = text;
                    }}
                />
            </View>
        )
    }

    public render() {

        const ButtonSignUp = this.getElement(ButtonFullColor);
        const ButtonSignIn = this.getElement(ButtonTransparent);

        const SocialNets = this.getElement(SocialNetButtons);
        const Checkbox = this.getElement(CheckboxComponent);

        return (
            <SafeAreaView style={this.styles.safeArea}>
                <View style={this.styles.mainWrapper}>
                    <Image
                        source={require('../../../../files/img/authorization/background.jpg')}
                        style={this.styles.background}
                        resizeMethod={'scale'}
                        resizeMode={'stretch'}
                    >
                    </Image>
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
                    <View style={this.styles.wrapper}>
                        <Text style={this.styles.title}>{i18n.t('SignUpScreen.title')}</Text>

                        <View style={this.styles.formWrapper}>

                            {this.getFormRows()}

                            <ButtonSignUp
                                style={this.styles.button}
                                width={wp('71%')}
                                onPress={() => {
                                    this.props.register(
                                        this.props.username,
                                        this.props.password,
                                        this.repeatPassword,
                                        this.props.componentId
                                    )
                                }}
                                text={i18n.t('signUp')}
                            />
                        </View>
                        <View style={this.styles.socnetWrapper}>
                            <Text style={this.styles.text}>
                                {i18n.t('SignUpScreen.or')}
                            </Text>

                            <SocialNets />
                        </View>
                    </View>
                    <View style={this.styles.signin}>
                        <Checkbox
                            namespace={['signup', 'agreement']}
                            text={i18n.t('SignUpScreen.agreement')}
                        />

                        <ButtonSignIn
                            width={wp('71%')}
                            onPress={this.props.toSignIn}
                            text={i18n.t('signIn')}
                            thin={true}
                        />
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            errorPasswordRepeat: state.users.getIn(['error', 'passwordRepeat'], false),
            username: state.users.get('username', undefined),
            password: state.users.get('password', undefined)
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<AuthorizationControllerInterface>('Authorization');

        return {
            register: controller.register.bind(controller),
            toSignIn: controller.toSignin.bind(controller, ownProps.componentId),
            goBack: controller.goBack.bind(controller, ownProps.componentId),
            changeUsername: controller.changeUsernameSignIn.bind(controller),
            changePassword: controller.changePasswordSignIn.bind(controller)
        }
    }

    private readonly styles = StyleSheet.create({
        safeArea: {
            backgroundColor: ColorEnum.CONTAINER,
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
            alignItems: 'center',
        },
        title: {
            color: ColorEnum.DARK_BLUE,
            fontSize: this.getAdaptiveSize(32),
            marginTop: hp( '15%'),
            marginBottom: hp('3%'),
            textAlign: 'left',
        },
        formWrapper: {
            flex: 0,
            width: wp('89%'),
            alignItems: 'center',
            position: 'relative'
        },
        form: {
            backgroundColor: ColorEnum.WHITE,
            paddingHorizontal: hp('3%'),
            paddingVertical: wp('3%'),
            paddingBottom: hp('5%'),
            borderRadius: this.getAdaptiveSize(20),
            width: '100%',
        },
        button: {
            position: 'absolute',
            bottom: -1 * this.getAdaptiveSize(27)
        },
        text: {
            color: ColorEnum.WHITE,
            fontSize: this.getAdaptiveSize(16),
            textAlign: 'center',
            marginBottom: hp('2%'),
        },
        signin: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            paddingBottom: hp('3%')
        },
        error: {
            borderWidth: this.getAdaptiveSize(2),
            borderColor: ColorEnum.RED
        },
        socnetWrapper: {
            marginTop: hp('5%'),
        }
    });
}
