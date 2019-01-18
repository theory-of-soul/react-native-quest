import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ColorEnum} from '../../colorEnum';
import TutorialStyle from './TutorailStyle';
import {ActionCreatorsMapObject} from 'redux';
import {ApplicationInitControllerInterface} from '../../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';
import i18n from 'i18n-js';


type S = {
    describeFadeAnim: Animated.Value;
    showStep: boolean;
}

type D = {
    skip: any;
}

type O = {
}

export class TutorialStepThree extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'TutorialStepThree';
    }

    private flag: boolean = true;

    public render() {

        if (this.props.showStep && this.flag) {
            this.flag = false;

            Animated.timing(
                this.props.describeFadeAnim,
                {
                    toValue: 1,
                    duration: 800,
                    useNativeDriver: true
                }
            ).start();
        }

        return (
            <View style={this.styles.container}>
                <View style={this.styles.wrapper}>
                    <TouchableOpacity
                        onPress={() => this.props.skip()}
                        style={this.styles.skipButton}
                    >
                        <Text style={[this.styles.skipText, {color: ColorEnum.CONTAINER}]}>
                            {i18n.t('tutorial.skip').toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                    <Image
                        style={this.styles.background}
                        source={require('../../../../files/img/tutorial/tutorial_3.png')}
                    />
                    <Animated.View style={[this.styles.description, {opacity: this.props.describeFadeAnim}]}>
                        <Text style={this.styles.title}>
                            {i18n.t('tutorial.stepThree.title')}
                        </Text>
                        <Text style={this.styles.label}>
                            {i18n.t('tutorial.stepThree.describe')}
                        </Text>
                        <TouchableOpacity
                            onPress={() => this.props.skip()}
                            style={this.playButton.playButton}
                        >
                            <Text style={this.playButton.playButtonText}>
                                {i18n.t('tutorial.stepThree.btn').toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            describeFadeAnim: new Animated.Value(this.flag ? 0 : 1),
            showStep: state.initialize.get('tutorialStep', 0) === 2
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<ApplicationInitControllerInterface>('ApplicationInit');

        return {
            skip: controller.skipTutorial.bind(controller),
        }
    }

    private readonly styles = TutorialStyle.getStyle(this);

    private readonly playButton = StyleSheet.create({
        playButton: {
            width: this.getAdaptiveSize(230),
            marginTop: this.getAdaptiveSize(20),
            padding: this.getAdaptiveSize(20),
            borderRadius: this.getAdaptiveSize(30),
            alignItems: 'center',
            backgroundColor: ColorEnum.YELLOW
        },
        playButtonText: {
            fontSize: this.getAdaptiveSize(18),
            color: ColorEnum.DARK_BLUE,
            textTransform: 'uppercase'
        }
    });
}
