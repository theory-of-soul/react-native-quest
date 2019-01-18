import React from 'react';
import {
    Text,
    View,
    SafeAreaView, StyleSheet
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import i18n from 'i18n-js';
import Swiper from 'react-native-swiper';
import {TutorialStepTwo} from './TutorialStepTwo';
import {TutorialStepOne} from './TutorialStepOne';
import {TutorialStepThree} from './TutorialStepThree';
import {ColorEnum} from '../../colorEnum';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ApplicationInitController} from '../../../Controllers/ApplicationInitController/ApplicationInitController';

type S = {
}

type D = {
    showStepTutorial: any;
}

type O = {
}

export class Tutorial extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'Tutorial';
    }

    public render() {

        const FirstStep = this.getElement(TutorialStepOne);
        const SecondStep = this.getElement(TutorialStepTwo);
        const ThirdStep = this.getElement(TutorialStepThree);

        return (
            <SafeAreaView style={this.styles.safeArea}>
                <Swiper loop={false}
                        showsButtons={true}
                        paginationStyle={this.styles.paginationStyle}
                        dot={<View style={this.styles.redPoint}/>}
                        activeDot={<View style={[this.styles.redPoint, this.styles.activePoint]} />}
                        buttonWrapperStyle={this.styles.footer}
                        nextButton={
                            <View style={this.styles.navigationButton}>
                                <Text style={[this.styles.navigationText, this.styles.nextText]}>
                                    {i18n.t('tutorial.next').toUpperCase()}
                                </Text>
                            </View>
                        }
                        prevButton={
                            <View style={this.styles.navigationButton}>
                                <Text style={[this.styles.navigationText, this.styles.nextText]}>
                                    {i18n.t('tutorial.back').toUpperCase()}
                                </Text>
                            </View>
                        }
                        onIndexChanged={(index: number) => {
                            this.props.showStepTutorial(index);
                        }}
                >
                    <FirstStep />
                    <SecondStep />
                    <ThirdStep />
                </Swiper>
            </SafeAreaView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {};
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<ApplicationInitController>('ApplicationInit');

        return {
            showStepTutorial: controller.showStepTutorial.bind(controller)
        }
    }

    private readonly styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: ColorEnum.WHITE,
            position: 'relative'
        },
        paginationStyle: {
            position: 'absolute',
            zIndex: 10,
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
            bottom: 0,
            height: hp('9%'),
        },
        redPoint: {
            width: wp('2%'),
            height: wp('2%'),
            borderRadius: wp('2%'),
            backgroundColor: ColorEnum.RED,
            marginHorizontal: 3,
            opacity: 0.5,
        },
        activePoint: {
            opacity: 1
        },
        footer: {
            alignItems: 'center',
            height: hp('9%'),
            backgroundColor: ColorEnum.WHITE,
            width: '100%',
            position: 'relative',
            zIndex: 1,
            left: 0,
            top: 0,
            flex: 0
        },
        navigationButton: {
            minWidth: wp('25%'),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            alignSelf: 'stretch',
        },
        navigationText: {
            fontSize: 18,
            color: ColorEnum.DARK_BLUE,
            textTransform: 'uppercase',
        },
        nextText: {
            color: ColorEnum.RED
        },
    });
}
