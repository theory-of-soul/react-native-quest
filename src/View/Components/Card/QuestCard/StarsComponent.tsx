import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {AbstractView} from '../../../../Model/View/AbstractView';
import {ApplicationStateType} from '../../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import Svg, {Path} from 'react-native-svg';

type S = {}

type D = {}

type O = {
    rating: number;
}

export class StarsComponent extends AbstractView<S, D, O> {

    public render() {

        const fullStars = Math.floor(this.props.rating);
        const isHalfStar = this.props.rating % 1 !== 0;

        let flagHalfStar = true;
        let starList = [];

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                starList.push(
                    <Svg key={'star_' + i} width="15" height="15" style={this.styles.star} viewBox="0 0 21 20" >
                        <Path d={'M10.4324 16.8793L4.89889 19.8317C4.13505 20.2392 3.63609 19.8817 3.78518 19.029L4.8' +
                        '7092 12.8187L0.363513 8.43901C-0.256351 7.83671 -0.063904 7.24987 0.791666 7.12849L6.99522 6' +
                        '.24842L9.74923 0.582818C10.1265 -0.193402 10.7374 -0.195142 11.1156 0.582818L13.8696 6.24842' +
                        'L20.0732 7.12849C20.9295 7.24998 21.1241 7.8339 20.5013 8.43901L15.9939 12.8187L17.0797 19.0' +
                        '29C17.2284 19.8798 16.7291 20.2389 15.966 19.8317L10.4324 16.8793Z'} fill={'#FFB624'}/>
                    </Svg>
                )
            } else if (isHalfStar && flagHalfStar) {
                starList.push(
                    <Svg key={'star_' + i} width="17" height="16" style={this.styles.star} viewBox="0 0 22 20" >
                        <Path d={'M11.0477 15.997L10.577 15.7459L10.1062 15.997L4.99851 18.7222L6.00051 12.9909L6.091' +
                        '58 12.47L5.71232 12.1015L1.54489 8.05215L7.28021 7.2385L7.80667 7.16382L8.03913 6.6856L10.57' +
                        '7 1.46474L13.1148 6.6856L13.3472 7.16382L13.8737 7.2385L19.609 8.05215L15.4416 12.1015L15.06' +
                        '23 12.47L15.1534 12.9909L16.1554 18.7222L11.0477 15.997Z'}
                              stroke="#FFB624" stroke-width="2" fill="none"
                        />
                        <Path d={'M8 7L2.5 8L6 12.5L5.5 18.5L10.5 15.5V2.5L8 7Z'} fill={'#FFB624'}/>
                    </Svg>
                );

                flagHalfStar = false;
            } else {
                starList.push(
                    <Svg key={'star_' + i} width="17" height="16" style={this.styles.star} viewBox="0 0 22 20" >
                        <Path d={'M11.0477 15.997L10.577 15.7459L10.1062 15.997L4.99851 18.7222L6.00051 12.9909L6.091' +
                        '58 12.47L5.71232 12.1015L1.54489 8.05215L7.28021 7.2385L7.80667 7.16382L8.03913 6.6856L10.57' +
                        '7 1.46474L13.1148 6.6856L13.3472 7.16382L13.8737 7.2385L19.609 8.05215L15.4416 12.1015L15.06' +
                        '23 12.47L15.1534 12.9909L16.1554 18.7222L11.0477 15.997Z'}
                              stroke="#FFB624" stroke-width="2" fill="none"
                        />
                    </Svg>
                )
            }
        }

        return (
            <View style={[this.styles.list, this.styles.starList]}>
                {starList}
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {};
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        return {}
    }

    private readonly styles = StyleSheet.create({
        list: {
            flex: 0,
            flexDirection: 'row'
        },
        starList: {
            marginLeft: 10
        },
        star: {
            marginLeft: 5,
            marginTop: 15,
        },
    });
}
