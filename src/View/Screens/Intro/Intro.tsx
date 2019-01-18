import React, {ComponentType} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ColorEnum} from '../../colorEnum';
import {ControllerActionType} from '../../../Controllers/ControllerActionType';
import {ActionCreatorsMapObject} from 'redux';
import {ApplicationInitControllerInterface} from '../../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';
import i18n from 'i18n-js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {VideoProperties} from 'react-native-video';
import {VideoComponent} from '../../Components/Video/VideoComponent';
import {SelectorComponent} from '../../Components/Form/Selector/SelectorComponent';
import Video from 'react-native-video';


type S = {
    locale: string
}

type D = {
    openTutorial: ControllerActionType;
}

type O = {
}

export class Intro extends AbstractScreenView<S, D, O> {

    public getScreenId() {
        return 'Intro'
    }

    private videoComponent?: ComponentType<VideoProperties>;
    private selectorComponent?: ComponentType<{}>;
    private player?: Video | null;

    private getVideoElement(): React.ReactElement<VideoProperties> {
        const Video = this.videoComponent || this.getElement(VideoComponent);

        return (
            <Video
                key={'intro_video'}
                ref={(ref: Video | null) => {
                    this.player = ref;
                }}
                uri={"https://api.backendless.com/D3E88DAB-D917-1818-FF26-19967F13ED00/2C57DB00-6BEC-5ABC-FF3F-F9A0A419F900/files/application/intro/intro.mp4"}
            />
        )
    }

    public render() {

        const LanguageSelector = this.selectorComponent || this.getElement(SelectorComponent);

        return (
            <SafeAreaView style={this.styles.safeArea}>
                <View style={this.styles.center}>
                    <Image
                        style={this.styles.logo}
                        resizeMode={'contain'}
                        source={require('../../../../files/img/intro/logo_intro.png')}
                    />
                    <Text style={this.styles.text}>
                        {i18n.t('intro.lorem')}
                    </Text>
                </View>
                <View style={this.styles.center}>
                    {this.getVideoElement()}
                </View>

                <LanguageSelector />

                <View  style={[this.styles.center, {width: '100%'}]}>
                    <TouchableOpacity
                        onPress={() => this.props.openTutorial.apply(this)}
                        style={this.styles.startButton}
                    >
                        <Text style={this.styles.startButtonText}>
                            {i18n.t('intro.getStarted').toUpperCase()}
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            locale: state.initialize.get('locale', 'en'),
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<ApplicationInitControllerInterface>('ApplicationInit');

        return {
            openTutorial: controller.openTutorial.bind(controller),
        }
    }

    private readonly styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: ColorEnum.CONTAINER,
            justifyContent: 'space-between',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
        },
        center: {
            alignItems: 'center',
        },
        logo: {
            width: this.getAdaptiveSize(230),
            marginTop: hp('1.8%'),
            marginBottom: hp('1.8%')
        },
        text: {
            fontSize: this.getAdaptiveSize(20),
            textAlign: 'center',
            marginBottom: this.getAdaptiveSize(10),
            color: ColorEnum.GRAY,
            width: wp('80%')
        },
        startButton: {
            flex: 0,
            padding: this.getAdaptiveSize(30),
            backgroundColor: ColorEnum.PURPLE,
            width: '100%'
        },
        startButtonText: {
            color: ColorEnum.WHITE,
            textTransform: 'uppercase',
            fontSize: this.getAdaptiveSize(18),
            textAlign: 'center'
        },
    });
}
