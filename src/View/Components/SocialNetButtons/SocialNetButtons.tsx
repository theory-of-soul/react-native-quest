import React from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
} from 'react-native';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../Model/View/AbstractView';
import {AuthorizationControllerInterface} from '../../../Controllers/AuthorizationController/AuthorizationControllerInterface';
import {ColorEnum} from '../../colorEnum';
import Svg, {Path, G} from 'react-native-svg';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


type S = {}

type D = {
}

type O = {
    google: any;
    facebook: any;
}

export class SocialNetButtons extends AbstractView<S, D, O> {

    public render() {
        return (
            <View style={this.styles.wrapper}>
                <TouchableOpacity
                    onPress={this.props.facebook}
                    style={[this.styles.button, {backgroundColor: ColorEnum.DARK_PURPLE, padding: 10, marginRight: 20, position: 'relative'}]}
                >
                    <Svg height={hp('3%')} width={wp('17%')} viewBox="0 0 40 40">
                        <Path d={'M34.6095 0H5.39008C2.41328 0 0 2.41318 0 5.39008V34.6097C0 37.5866 2.41318 39.9998 5.3' +
                        '9008 39.9998H19.801L19.8255 25.706H16.112C15.6294 25.706 15.2377 25.3158 15.2359 24.8332L15.218' +
                        '1 20.2257C15.2162 19.7405 15.6091 19.3462 16.0943 19.3462H19.8011V14.8942C19.8011 9.72768 22.95' +
                        '64 6.91449 27.5653 6.91449H31.3472C31.8311 6.91449 32.2235 7.30677 32.2235 7.79074V11.6758C32.2' +
                        '235 12.1596 31.8314 12.5517 31.3477 12.552L29.0268 12.5531C26.5203 12.5531 26.035 13.7441 26.03' +
                        '5 15.492V19.3463H31.5425C32.0673 19.3463 32.4744 19.8045 32.4126 20.3256L31.8665 24.9331C31.814' +
                        '2 25.374 31.4404 25.7062 30.9964 25.7062H26.0596L26.035 40H34.6097C37.5865 40 39.9997 37.5868 3' +
                        '9.9997 34.61V5.39008C39.9996 2.41318 37.5864 0 34.6095 0Z'} fill={ColorEnum.WHITE}/>
                    </Svg>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={this.props.google}
                    style={[this.styles.button, {backgroundColor: ColorEnum.RED, padding: 1}]}
                >
                    <Svg height={hp('5%')} width={wp('17%')} viewBox="0 0 56.6934 56.6934">
                        <G>
                            <Path d={'M19.6671,25.7867c-0.0075,1.7935,0,3.5869,0.0076,5.3803c3.0067,0.098,6.0208,0.0527,9.0' +
                            '275,0.098   c-1.3262,6.6689-10.3989,8.8315-15.199,4.4761C8.5674,31.9206,8.801,23.5412,13.9327,' +
                            '19.992   c3.5869-2.8635,8.6884-2.1552,12.2752,0.324c1.4092-1.3036,2.7278-2.6977,4.0013-4.1445 ' +
                            '  c-2.984-2.3812-6.6462-4.0767-10.5421-3.8958c-8.1307-0.2713-15.6059,6.8497-15.7415,14.9805   ' +
                            'c-0.52,6.6462,3.8506,13.1644,10.0222,15.5155c6.1489,2.3661,14.031,0.7535,17.957-4.77c2.5922-3.' +
                            '4889,3.1498-7.98,2.8484-12.1999   C29.7194,25.7641,24.6933,25.7716,19.6671,25.7867z'}
                                  fill={ColorEnum.WHITE}
                            />
                            <Path d={'M49.0704,25.7641c-0.0151-1.4996-0.0226-3.0067-0.0301-4.5062c-1.4996,0-2.9916,0-4.4836' +
                            ',0   c-0.0151,1.4996-0.0301,2.9991-0.0377,4.5062c-1.5071,0.0075-3.0067,0.0151-4.5062,0.0302c0,' +
                            '1.4995,0,2.9915,0,4.4836   c1.4995,0.0151,3.0066,0.0302,4.5062,0.0452c0.0151,1.4996,0.0151,2.9' +
                            '991,0.0302,4.4987c1.4996,0,2.9916,0,4.4911,0   c0.0075-1.4996,0.015-2.9991,0.0301-4.5062c1.507' +
                            '1-0.0151,3.0067-0.0226,4.5062-0.0377c0-1.4921,0-2.9916,0-4.4836   C52.0771,25.7792,50.57,25.77' +
                            '92,49.0704,25.7641z'}
                                  fill={ColorEnum.WHITE}
                            />
                        </G>
                    </Svg>
                </TouchableOpacity>
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {};
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<AuthorizationControllerInterface>('Authorization');

        return {
            google: controller.google.bind(controller),
            facebook: controller.facebook.bind(controller),
        }
    }

    private readonly styles = StyleSheet.create({
        wrapper: {
            alignItems: 'center',
            flexDirection: 'row'
        },
        button: {
            position: 'relative',
            alignItems: 'center',
            borderRadius: this.getAdaptiveSize(30),
            width: wp('19%'),
            height: hp('6%'),
            justifyContent: 'center'
        }
    });
}
