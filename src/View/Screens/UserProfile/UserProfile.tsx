import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ColorEnum} from '../../colorEnum';
import {ActionCreatorsMapObject} from 'redux';
import ButtonYellow from '../../Components/Button/ButtonYellow';
import ButtonTransparent from '../../Components/Button/ButtonTransparent';
import ButtonFullColor from '../../Components/Button/ButtonFullColor';
import {UserProfileControllerInterface} from '../../../Controllers/UserProfileController/UserProfileControllerInterface';
import {UserType} from '../../../Model/BackendlessApiProvider/BackendlessUserApiProvider/UserType';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Svg, {Path, Circle} from 'react-native-svg';


type S = {
    user: UserType;
}

type D = {
    openShowImage: any;
    goToQuestList: any;
}

type O = {
    componentId: string;
}

export class UserProfile extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'UserProfile';
    }

    public render() {

        const QuestsButton = this.getElement(ButtonFullColor);
        const FeatureGameButton = this.getElement(ButtonTransparent);
        const JoinButton = this.getElement(ButtonYellow);

        return (
            <SafeAreaView style={this.styles.safeArea}>
                <ImageBackground
                    source={require('../../../../files/img/userProfile/background.png')}
                    style={this.styles.background}
                >
                    <View style={this.styles.menu}>
                        <Svg width="60%" height="8" viewBox="0 0 44 8">
                            <Circle cx="4" cy="4" r="3" stroke="#303551" stroke-width="2" fill="none"/>
                            <Circle cx="21.875" cy="4" r="3" stroke="#303551" stroke-width="2" fill="none"/>
                            <Circle cx="39.752" cy="4" r="3" stroke="#303551" stroke-width="2" fill="none"/>
                        </Svg>
                    </View>
                    <View style={this.styles.header}>
                        <Text style={this.styles.userName} numberOfLines={1} ellipsizeMode='tail'>{this.props.user.name}</Text>
                        <Text style={this.styles.email} numberOfLines={1} ellipsizeMode='tail'>{this.props.user.email}</Text>
                        <TouchableOpacity
                            onPress={this.props.openShowImage}
                            style={[this.styles.avatar]}
                        >
                            <View style={[this.styles.avatarWrapper, {borderWidth: this.props.user.photo ? 0 : 1}]}>
                                {
                                    this.props.user.photo ?
                                        <Image
                                            style={this.styles.avatarImg}
                                            source={{uri: this.props.user.photo}}
                                        /> : undefined
                                }
                            </View>
                            <View style={this.styles.photoIconWrapper}>
                                <Svg width="50%" height="24" viewBox="0 0 27 24" >
                                    <Path d={'M13.4196 10.1131C11.3963 10.1131 9.75468 11.7547 9.75468 13.778C9.75468 15.' +
                                    '8014 11.3963 17.443 13.4196 17.443C15.443 17.443 17.0846 15.8014 17.0846 13.778C17.0' +
                                    '846 11.7547 15.443 10.1131 13.4196 10.1131ZM22.3784 4.81926H19.5279L18.8789 3.08859C' +
                                    '18.5607 2.2487 17.5682 1.56152 16.6774 1.56152H10.1619C9.27111 1.56152 8.27852 2.248' +
                                    '7 7.96038 3.08859L7.31138 4.81926H4.46086C2.66656 4.81926 1.20312 6.28269 1.20312 8.' +
                                    '07699V19.4791C1.20312 21.2734 2.66656 22.7368 4.46086 22.7368H22.3784C24.1727 22.736' +
                                    '8 25.6361 21.2734 25.6361 19.4791V8.07699C25.6361 6.28269 24.1727 4.81926 22.3784 4.' +
                                    '81926Z'} fill={'none'} strokeWidth={2} stroke={ColorEnum.WHITE}/>
                                </Svg>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={this.styles.buttonsWrapper}>
                        <QuestsButton
                            onPress={this.props.goToQuestList}
                            text={'Quests'}
                            style={{backgroundColor: ColorEnum.RED, marginTop: hp('2%')}}
                        />
                        <FeatureGameButton
                            onPress={() => {}}
                            text={'Artefacts'}
                            textStyle={{color: ColorEnum.GRAY}}
                            style={{borderColor: ColorEnum.GRAY, marginTop: hp('2%')}}
                        />
                        <FeatureGameButton
                            onPress={() => {}}
                            text={'My team'}
                            textStyle={{color: ColorEnum.GRAY}}
                            style={{borderColor: ColorEnum.GRAY, marginTop: hp('2%')}}
                        />
                        <JoinButton
                            onPress={() => {}}
                            text={'Join the game'}
                            style={{marginTop: hp('2%')}}
                        />
                    </View>
                    <View style={this.styles.policy}>
                        <Text style={this.styles.policyText}>
                            User agreement and Policy for collecting and processing personal information
                        </Text>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            user: state.users.get(state.users.get('lastUserId'), {
                name: 'Татьяна Закерничная',
                email: 'theoryofsoul@ya.ru',
                photo: ''
            }),
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<UserProfileControllerInterface>('UserProfile');

        return {
            openShowImage: controller.showLoadImage.bind(controller),
            goToQuestList: controller.goToQuestListScreen.bind(controller)
        }
    }

    private readonly styles = StyleSheet.create({
        safeArea: {
            backgroundColor: '#63c584',
            width: '100%',
            height: '100%',
        },
        background: {
            width: '100%',
            height: '100%',
            position: 'relative',
            justifyContent: 'space-between'
        },
        menu: {
            flex: 0,
            width: this.getAdaptiveSize(50),
            height: this.getAdaptiveSize(50),
            backgroundColor: ColorEnum.WHITE_40,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: this.getAdaptiveSize(25),
            position: 'absolute',
            top: this.getAdaptiveSize(50),
            right: this.getAdaptiveSize(30)
        },
        menuImg: {
            width: wp('60%'),
            resizeMode: 'contain'
        },
        userName: {
            fontSize: this.getAdaptiveSize(26),
            color: ColorEnum.DARK_BLUE,
            lineHeight: this.getAdaptiveSize(46),
            maxWidth: wp('60%')
        },
        header: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
        },
        email: {
            color: ColorEnum.WHITE,
            fontSize: this.getAdaptiveSize(18),
            maxWidth: wp('60%')
        },
        avatar: {
            marginTop: hp('3%'),
            elevation: 1,
            position: 'relative',
            width: wp('35%'),
            height: wp('35%'),
        },
        avatarWrapper: {
            borderRadius: wp('25%'),
            overflow: 'hidden',
            borderColor: ColorEnum.WHITE
        },
        avatarImg: {
            width: wp('35%'),
            height: wp('35%'),
        },
        photoIconWrapper: {
            position: 'absolute',
            elevation: 2,
            backgroundColor: ColorEnum.PURPLE,
            width: this.getAdaptiveSize(40),
            height: this.getAdaptiveSize(40),
            borderRadius: this.getAdaptiveSize(20),
            alignItems: 'center',
            justifyContent: 'center',
            top: 0,
            right: 0,
        },
        photoIcon: {
            width: wp('20%'),
            resizeMode: 'contain'
        },
        buttonsWrapper: {
            flex: 1,
            alignSelf: 'center',
            justifyContent: 'center',
            width: wp('45%'),
        },
        policy: {
            backgroundColor: ColorEnum.CONTAINER,
            padding: hp('2%'),
            alignItems: 'center'
        },
        policyText: {
            color: ColorEnum.GRAY,
            fontSize: this.getAdaptiveSize(14),
            width: wp('85%'),
            textAlign: 'center'
        }
    });
}
