import {ColorEnum} from '../../colorEnum';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import {ViewInterface} from '../../../Model/View/ViewInterface';
import {ViewStyleInterface} from './ViewStyleInterface';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class TutorialStyle implements ViewStyleInterface {

    private readonly view: ViewInterface<any, any, any>;
    private static tutorialStyle?: ViewStyleInterface;

    private constructor(view: ViewInterface<any, any, any>) {
        this.view = view;

    }

    static getStyle(view: ViewInterface<any, any, any>) {
        if (this.tutorialStyle === undefined) {
            this.tutorialStyle = new TutorialStyle(view);
        }

        return this.tutorialStyle.getStyleSheet();
    }

    public getStyleSheet() {
        return StyleSheet.create({
            safeArea: {
                flex: 1,
                backgroundColor: ColorEnum.WHITE,
                position: 'relative'
            },
            container: {
                flex: 1,
                flexDirection: 'column',
                backgroundColor: ColorEnum.CONTAINER,
            },
            wrapper: {
                flex: 1,
                flexDirection: 'column',
                position: 'relative',
            },
            background: {
                position: 'absolute',
                left: 0,
                zIndex: 0,
                width: '100%',
                maxHeight: Dimensions.get('screen').height,
                top: -1 * hp(Platform.OS === 'ios' ? '16%' : '17%'),
                resizeMode: 'contain'
            },
            skipButton: {
                position: 'relative',
                zIndex: 1,
                flex: 0,
                paddingHorizontal: this.view.getAdaptiveSize(15),
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginTop: hp('2.5%'),
            },
            skipText: {
                textTransform: 'uppercase',
                fontSize: this.view.getAdaptiveSize(18),
                color: ColorEnum.DARK_BLUE,
            },
            description: {
                position: 'relative',
                bottom: -1 * hp(Platform.OS === 'ios' ? '53%' : '50%'),
                alignItems: 'center'
            },
            title: {
                fontSize: this.view.getAdaptiveSize(30),
                color: ColorEnum.DARK_BLUE
            },
            label: {
                width: wp('80%'),
                textAlign: 'center',
                marginTop: hp('2%'),
                color: ColorEnum.GRAY,
                fontSize: this.view.getAdaptiveSize(18)
            },
        });
    }
}

export default TutorialStyle;