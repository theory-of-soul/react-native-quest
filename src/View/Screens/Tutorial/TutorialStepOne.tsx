import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    Animated,
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import TutorialStyle from './TutorailStyle'
import {ActionCreatorsMapObject} from 'redux';
import {ApplicationInitControllerInterface} from '../../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';
import i18n from 'i18n-js';

type S = {
    skipFadeAnim: Animated.Value;
    describeFadeAnim: Animated.Value;
    showStep: boolean;
}

type D = {
    skip: any;
}

type O = {
}

export class TutorialStepOne extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'TutorialStepOne';
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

            Animated.timing(
                this.props.skipFadeAnim,
                {
                    toValue: 1,
                    duration: 1000,
                    delay: 500,
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
                        <Animated.Text
                            style={[this.styles.skipText, {opacity: this.props.skipFadeAnim}]}
                        >
                            {i18n.t('tutorial.skip').toUpperCase()}
                        </Animated.Text>
                    </TouchableOpacity>
                    <Image
                        style={this.styles.background}
                        source={require('../../../../files/img/tutorial/tutorial_1.png')}
                    />
                    <Animated.View style={[this.styles.description, {opacity: this.props.describeFadeAnim}]}>
                        <Text style={this.styles.title}>
                            {i18n.t('tutorial.stepOne.title')}
                        </Text>
                        <Text style={this.styles.label}>
                            {i18n.t('tutorial.stepOne.describe')}
                        </Text>
                    </Animated.View>
                </View>
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            skipFadeAnim: new Animated.Value(this.flag ? 0 : 1),
            describeFadeAnim: new Animated.Value(this.flag ? 0 : 1),
            showStep: state.initialize.get('tutorialStep', 0) === 0
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = (this.controllerCollection.getController('ApplicationInit') as ApplicationInitControllerInterface);

        return {
            skip: controller.skipTutorial.bind(controller),
        }
    }

    private readonly styles = TutorialStyle.getStyle(this);
}
