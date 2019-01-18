import React from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Svg, {Path, Ellipse, G} from 'react-native-svg';
import {AbstractView} from '../../../Model/View/AbstractView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {ApplicationInitControllerInterface} from '../../../Controllers/ApplicationInitController/ApplicationInitControllerInterface';

type S = {
    hideVideoPoster: boolean;
    spinAnim: Animated.Value;
    fadeAnim: Animated.Value;
}

type D = {
    playVideoButton: any;
}

type O = {
    uri: string;
}

export class VideoComponent extends AbstractView<S, D, O> {

    private player?: Video | null;

    public render() {
        const rotateAnimation = Animated.timing(
            this.props.spinAnim,
            {
                toValue: 1,
                duration: 900,
                easing: Easing.linear,
                useNativeDriver: true
            }
        );

        Animated.loop(rotateAnimation).start();

        let spin = this.props.spinAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        let spinFlag = true;

        return (
            <View style={this.styles.clipWrapper}>
                <Animated.View style={{
                    transform: [
                        {rotate: spin},
                        {perspective: 500},
                    ],
                    opacity: this.props.fadeAnim,
                    position: 'absolute',
                    zIndex: 8
                }}>
                    <Svg viewBox="0 0 34.652 34.652"  width={wp('8%')} height={wp('8%')}>
                        <G>
                            <Path d="M15.529,32.855C6.966,32.855,0,25.889,0,17.326C0,8.763,6.966,1.797,15.529,1.797    c8.563,0,15.529,6.967,15.529,15.529c0,0.49-0.397,0.888-0.888,0.888c-0.49,0-0.888-0.397-0.888-0.888    c0-7.584-6.17-13.755-13.754-13.755c-7.585,0-13.755,6.171-13.755,13.755c0,7.584,6.17,13.754,13.755,13.754    c4.852,0,9.397-2.601,11.862-6.787c0.249-0.423,0.793-0.562,1.215-0.314c0.422,0.248,0.562,0.792,0.315,1.215    C26.139,29.919,21.007,32.855,15.529,32.855z" fill="#30c583"/>
                        </G>
                        <G>
                            <Path d="M30.17,18.214c-0.153,0-0.309-0.04-0.45-0.123l-5.561-3.284c-0.422-0.249-0.562-0.793-0.313-1.215    c0.25-0.422,0.794-0.562,1.216-0.312l4.852,2.865l3.123-4.473c0.281-0.402,0.834-0.5,1.235-0.22c0.402,0.28,0.5,0.833,0.22,1.235    l-3.594,5.146C30.726,18.08,30.451,18.214,30.17,18.214z" fill="#30c583"/>
                        </G>
                    </Svg>
                </Animated.View>

                { this.props.hideVideoPoster ? undefined:
                    <TouchableOpacity
                        style={this.styles.playButton}
                        onPress={this.props.playVideoButton}
                    >
                        <Svg width={wp('20%')} height={wp('20%')} viewBox="0 0 127 127">
                            <Ellipse cx="63.2" cy="63.2012" rx="63.2" ry="63.2012" fill="#FFB624"/>
                            <Path d="M52.4589 88.1508L84.9134 64.3504L52.4589 40.55V88.1508Z" stroke="#303551" stroke-width="1.5" fill="none"/>
                        </Svg>
                    </TouchableOpacity>
                }

                <Video
                    source={{uri: this.props.uri}}
                    ref={(ref: Video | null) => {
                        this.player = ref;
                    }}
                    rate={this.props.hideVideoPoster ? 1 : 0}
                    resizeMode={'contain'}
                    controls={true}
                    style={this.styles.clip}

                    onProgress={(data: {
                        currentTime: number;
                        playableDuration: number;
                        seekableDuration: number;
                    }) => {
                        if (data.currentTime > 0 && spinFlag) {
                            spinFlag = false;
                            rotateAnimation.stop();
                            Animated.timing(
                                this.props.fadeAnim,
                                {
                                    toValue: 0,
                                    duration: 500,
                                    easing: Easing.linear,
                                    useNativeDriver: true
                                }
                            ).start();
                        }
                    }}
                    onError={() => {
                        console.log('error loading video')
                    }}
                />
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            hideVideoPoster: state.initialize.get('playVideo', false),
            spinAnim: new Animated.Value(0),
            fadeAnim: new Animated.Value(1)
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<ApplicationInitControllerInterface>('ApplicationInit');

        return {
            playVideoButton: controller.playVideoButton.bind(controller),
        }
    }

    private readonly styles = StyleSheet.create({
        clipWrapper: {
            borderRadius: wp('10%'),
            overflow: 'hidden',
            position: 'relative',
            marginBottom: hp('1.8%'),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
        clip: {
            width: wp('78%'),
            height: wp('78%'),
            maxHeight: hp('50%'),
            maxWidth: hp('50%')
        },
        playButton: {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
            flex: 1,
            width: wp('78%'),
            height: wp('78%'),
            maxHeight: hp('50%'),
            maxWidth: hp('50%'),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
        },
    });
}
