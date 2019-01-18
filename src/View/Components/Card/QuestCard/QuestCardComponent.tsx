import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import {AbstractView} from '../../../../Model/View/AbstractView';
import {ApplicationStateType} from '../../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {ColorEnum} from '../../../colorEnum';
import {StarsComponent} from './StarsComponent';
import {TagsComponent} from './TagsComponent';
import Svg, {Path} from 'react-native-svg';

type S = {}

type D = {}

type O = {}

export class QuestCardComponent extends AbstractView<S, D, O> {

    public render() {

        const Stars = this.getElement(StarsComponent);
        const Tags = this.getElement(TagsComponent);

        return (
            <TouchableOpacity style={this.styles.cardWrapper}>
                <View style={this.styles.describeCard}>
                    <View style={{flex: 0}}>
                        <Stars
                            rating={3.5}
                        />
                        <Text style={this.styles.title}>QuestCard</Text>
                        <Tags
                            tags={['boy', 'girl', 'home', 'street']}
                        />
                    </View>

                    <View style={this.styles.imageBox}>
                        <View style={this.styles.imageWrapper}>
                            <Image
                                style={this.styles.image}
                                source={require('../../../../../files/img/questCard/picture-nemo.png')}
                            />
                        </View>
                    </View>
                </View>
                <View style={this.styles.props}>
                    <View style={this.styles.propsItem}>
                        <Svg width="27" height="27" style={this.styles.propsImage} viewBox="0 0 30 30">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 6.71582 6.71484 0 15 0C18.9785 0 22.793 1.58008 25.6074 4.39355C28.4199 7.20605 30 11.0215 30 15C30 23.2842 23.2852 30 15 30C6.71484 30 0 23.2842 0 15ZM1.25 15C1.25 22.5938 7.40625 28.75 15 28.75C18.6465 28.75 22.1445 27.3018 24.7227 24.7227C27.3008 22.1445 28.75 18.6465 28.75 15C28.75 7.40625 22.5938 1.25 15 1.25C7.40625 1.25 1.25 7.40625 1.25 15Z" fill="#FFB624"/>
                            <Path d="M14.375 4.0625H15.625V5.9375H14.375V4.0625Z" fill="#FFB624"/>
                            <Path d="M24.0625 14.375H25.9375V15.625H24.0625V14.375Z" fill="#FFB624"/>
                            <Path d="M14.375 24.0625H15.625V25.9375H14.375V24.0625Z" fill="#FFB624"/>
                            <Path d="M4.0625 14.375H5.9375V15.625H4.0625V14.375Z" fill="#FFB624"/>
                            <Path d="M20.1799 8.93088L14.9987 14.1184L11.6924 10.8059C11.4473 10.5608 11.05 10.5608 10.8049 10.8059C10.5598 11.051 10.5598 11.4483 10.8049 11.6934L14.1174 14.9996L13.3049 15.8059C13.1866 15.9232 13.12 16.083 13.12 16.2496C13.12 16.4163 13.1866 16.576 13.3049 16.6934C13.4223 16.8117 13.582 16.8783 13.7487 16.8783C13.9153 16.8783 14.075 16.8117 14.1924 16.6934L14.9987 15.8809L15.8049 16.6934C15.9223 16.8117 16.082 16.8783 16.2487 16.8783C16.4153 16.8783 16.575 16.8117 16.6924 16.6934C16.8107 16.576 16.8773 16.4163 16.8773 16.2496C16.8773 16.083 16.8107 15.9232 16.6924 15.8059L15.8799 14.9996L21.0674 9.81838C21.3125 9.5733 21.3125 9.17595 21.0674 8.93088C20.8223 8.6858 20.425 8.6858 20.1799 8.93088Z" fill="#FFB624"/>
                        </Svg>
                        <Text style={this.styles.propsText}>1h</Text>
                    </View>
                    <View style={this.styles.propsItem}>
                        <Svg width="29" height="25" style={this.styles.propsImage}  viewBox="0 0 29 30">
                            <Path fill-rule="evenodd" clip-rule="evenodd" d="M2.40586 10.3099L0.089374 7.25636C-0.0510188 7.04577 -0.0159206 6.76498 0.124472 6.58949L1.73899 4.97497C1.91448 4.79948 2.19527 4.76438 2.40586 4.90478L5.5296 7.11596C5.63489 7.18616 5.70509 7.32655 5.74019 7.46694L6.09117 8.69538L11.4612 13.9601L13.0406 12.0999C12.2685 11.1874 11.9526 9.85362 12.1632 8.3444C12.3737 6.69478 13.2161 4.93987 14.5147 3.43065C16.3047 1.35986 18.6212 0.061223 20.692 0.061223C20.8675 -0.0440717 21.1132 -0.00897345 21.2887 0.131419L22.833 1.43005C23.0787 1.60554 23.0787 1.95653 22.9032 2.16712L19.7093 5.92262C19.5338 6.13321 19.5689 6.48419 19.7795 6.65969L22.3416 8.83578C22.4469 8.94107 22.5873 8.97617 22.7277 8.97617C22.8681 8.97617 22.9734 8.90597 23.0787 8.80068L26.2726 5.04517C26.4481 4.79948 26.7991 4.79948 27.0097 4.97497L28.554 6.3087C28.7295 6.4491 28.7646 6.65969 28.7295 6.83518C29.0454 8.87087 28.1679 11.3979 26.3779 13.5038C24.5177 15.6799 22.1311 16.8733 20.1305 16.8733C19.3583 16.8733 18.6563 16.6627 18.0597 16.3117L17.1822 17.3295L25.2197 25.0511C25.676 25.4723 25.9217 26.069 25.9217 26.6657C25.9217 27.2623 25.7111 27.859 25.2899 28.2802L24.3422 29.2629C23.886 29.7192 23.2893 29.9649 22.6926 29.9649C22.1311 29.9649 21.5695 29.7543 21.1132 29.3331L13.3214 21.8221L7.03882 29.1927C6.61764 29.7192 5.95078 30 5.31901 30C4.79253 30 4.26606 29.7894 3.84488 29.4384L2.33566 28.1749C1.84428 27.7888 1.5635 27.2272 1.5284 26.6306C1.4582 26.0339 1.66879 25.4372 2.05487 24.9809L9.56589 16.1362L4.02037 10.8013L2.68664 10.4854C2.58135 10.4854 2.47605 10.4152 2.40586 10.3099ZM14.0935 11.6439C14.3392 11.8194 14.3392 12.1704 14.1637 12.381L2.82698 25.6832C2.61639 25.9289 2.5111 26.2448 2.5462 26.5606C2.58129 26.8765 2.72169 27.1924 2.96737 27.403L4.4766 28.6665C4.96797 29.0877 5.74013 29.0526 6.19641 28.5261L17.4278 15.259C17.4495 15.259 17.4578 15.2456 17.4693 15.2271C17.4763 15.2156 17.4846 15.2022 17.498 15.1888C17.6735 14.9431 18.0245 14.9431 18.2351 15.1186C19.8847 16.5225 23.1488 15.4696 25.5004 12.7319C27.1149 10.8717 27.9222 8.55525 27.6063 6.83544L26.6938 6.06328L23.8508 9.39761C23.57 9.74859 23.1839 9.92408 22.7628 9.95918H22.6224C22.2363 9.95918 21.8853 9.81879 21.6045 9.5731L19.0424 7.39701C18.3755 6.83544 18.3053 5.85269 18.8669 5.18583L21.7098 1.8515L20.7973 1.07934C19.0424 1.04424 16.9014 2.23758 15.2868 4.09778C14.1286 5.46661 13.3915 7.01093 13.181 8.48506C13.0055 9.85389 13.3213 10.977 14.0935 11.6439ZM24.8686 26.7361C24.8335 26.3851 24.7282 26.0693 24.4825 25.8587L16.4802 18.1371L13.9882 21.0502L21.8151 28.6314C22.3065 29.0877 23.1137 29.0877 23.57 28.5963L24.5176 27.6136C24.7633 27.3679 24.8686 27.052 24.8686 26.7361ZM2.12509 6.02805L4.72236 7.85315L5.00315 8.8359L4.12569 9.74846L3.14294 9.53787L1.21254 6.9757L2.12509 6.02805ZM10.7952 14.732L5.63573 9.74805L5.03906 10.3447L10.2687 15.3638L10.7952 14.732ZM5.70415 27.1923H5.80945C6.6167 27.1221 7.24847 26.4202 7.17828 25.6129C7.10808 24.8057 6.37102 24.209 5.59886 24.2441C5.21278 24.2792 4.86179 24.4547 4.58101 24.7706C4.33532 25.0864 4.19493 25.4374 4.23003 25.8586C4.30022 26.5606 4.96709 27.1923 5.70415 27.1923Z" fill="#FFB624"/>
                        </Svg>
                        <Text style={this.styles.propsText}>15 min</Text>
                    </View>
                    <View style={this.styles.propsItem}>
                        <Svg width="30" height="27" style={this.styles.propsImage} viewBox="0 0 38 27">
                            <Path
                                d={'M25.2478 13C18.213 13 12.4961 17.8877 12.4961 23.8937C12.4961 24.7634 12.6164 25.6095 12.8383 26.4191C12.9047 26.6793 13.1301 26.8887 13.428 26.9671C13.726 27.0455 14.0502 26.9806 14.2764 26.7974C14.5027 26.6142 14.5958 26.3411 14.5201 26.0827C14.3274 25.3799 14.2234 24.6471 14.2234 23.8937C14.2234 18.685 19.1465 14.4756 25.2478 14.4756C31.3444 14.4756 36.2722 18.6853 36.2722 23.8937C36.2722 24.6471 36.168 25.3787 35.9719 26.0794C35.8947 26.3375 35.9863 26.611 36.2116 26.7952C36.4368 26.9794 36.7608 27.0455 37.0592 26.9683C37.3576 26.8911 37.5841 26.6825 37.6519 26.4225C37.8789 25.6107 37.9995 24.7634 37.9995 23.8937C37.9995 17.8874 32.2785 13 25.2478 13V13Z'}
                                fill={'#FFB624'}
                            />
                            <Path
                                d={'M25.1217 0C21.8993 0 19.2656 2.6884 19.2656 5.98501C19.2656 9.28162 21.8984 11.9744 25.1217 11.9744C28.3448 11.9744 30.9734 9.28071 30.9734 5.98501C30.9734 2.68932 28.3439 0 25.1217 0ZM25.1218 1.75781C27.4161 1.75781 29.255 3.63855 29.255 5.98511C29.255 8.33168 27.4152 10.2168 25.1218 10.2168C22.8284 10.2168 20.9844 8.33076 20.9844 5.98511C20.9844 3.63946 22.8275 1.75781 25.1218 1.75781Z'}
                                fill={'#FFB624'}
                            />
                            <Path
                                d={'M10.5105 13.1699C4.71527 13.1699 0 17.1985 0 22.1527C0 22.8674 0.0985416 23.5657 0.281893 24.2324C0.349126 24.492 0.574691 24.7007 0.872321 24.7785C1.16995 24.8564 1.4936 24.7914 1.71949 24.6085C1.94538 24.4255 2.03857 24.1529 1.96341 23.8948C1.80994 23.3368 1.72729 22.7513 1.72729 22.1527C1.72729 17.995 5.64844 14.6455 10.5105 14.6455C11.8826 14.6455 13.1725 14.9109 14.3226 15.387C14.601 15.5066 14.9332 15.4889 15.192 15.3405C15.4507 15.1922 15.5959 14.9363 15.5718 14.6708C15.5478 14.4054 15.3582 14.1716 15.0758 14.0591C13.6954 13.4876 12.1439 13.1699 10.5105 13.1699V13.1699Z'}
                                fill={'#FFB624'}
                            />
                            <Path
                                d={'M10.4566 3.09375C7.96378 3.09375 5.92383 5.1812 5.92383 7.73411C5.92383 10.2836 7.96257 12.3745 10.4566 12.3745C12.9538 12.3745 14.9936 10.2836 14.9936 7.73411C14.9936 5.1812 12.9526 3.09375 10.4566 3.09375ZM10.4567 4.85156C12.0251 4.85156 13.2752 6.13014 13.2752 7.73421C13.2752 9.33289 12.0239 10.6169 10.4567 10.6169C8.89486 10.6169 7.64258 9.33289 7.64258 7.73421C7.64258 6.13014 8.89366 4.85156 10.4567 4.85156Z'}
                                fill={'#FFB624'}
                            />
                        </Svg>
                        <Text style={this.styles.propsText}>2-7 ppl</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {};
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        return {}
    }

    private readonly styles = StyleSheet.create({
        cardWrapper: {
            flex: 0,
            flexDirection: 'column',
            marginBottom: this.getAdaptiveSize(25),
            borderRadius:  this.getAdaptiveSize(30),
            backgroundColor: ColorEnum.WHITE,
        },
        describeCard: {
            flex: 0,
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        imageBox: {
            flex: 1,
            position: 'relative',
            maxWidth:  Dimensions.get('screen').width * 0.3,
        },
        imageWrapper: {
            borderWidth: 1,
            borderColor: ColorEnum.MIDDLE_GRAY,
            borderTopRightRadius:  this.getAdaptiveSize(30),
            overflow: 'hidden',
            width: '100%',
            position: 'absolute',
            left: 0,
            minHeight: this.getAdaptiveSize(142),
            height: '100%'
        },
        image: {
            width: '100%',
            resizeMode: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%'
        },
        title: {
            fontSize:  this.getAdaptiveSize(20),
            marginLeft:  this.getAdaptiveSize(15),
            marginTop:  this.getAdaptiveSize(20),
            marginBottom:  this.getAdaptiveSize(10)
        },
        props: {
            flex: 0,
            flexDirection: 'row',
            padding:  this.getAdaptiveSize(15)
        },
        propsItem: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
        },
        propsImage: {
            marginRight:  this.getAdaptiveSize(5)
        },
        propsText: {
            fontSize:  this.getAdaptiveSize(18)
        }
    });
}