import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity, Dimensions
} from 'react-native';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../Model/View/AbstractView';
import {ColorEnum} from '../../colorEnum';
import i18n from 'i18n-js';
import {FilterTags} from '../Tags/FilterTags';
import Svg, {Rect, Path, Circle} from 'react-native-svg';
import {QuestListControllerInterface} from '../../../Controllers/QuestListController/QuestListControllerInterface';

type S = {
    showFilterTags: boolean;
}

type D = {
    toggleFilterTags: any;
}

type O = {
}

export class FilterComponent extends AbstractView<S, D, O> {

    public render() {
        const FilterTag = this.getElement(FilterTags);

        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={this.styles.filter}>
                    {
                        this.props.showFilterTags ?
                            <View style={this.styles.filterTagsWrapper}>
                                <FilterTag
                                    onPress={() => {}}
                                    text={'популярные'}
                                />
                                <FilterTag
                                    onPress={() => {}}
                                    active={true}
                                    text={'новые'}
                                />
                                <FilterTag
                                    onPress={() => {}}
                                    text={'рейтинговые'}
                                />
                            </View> :
                            <View style={this.styles.filterInputWrapper}>
                                <Svg width={this.getAdaptiveSize(30)} height="50%" viewBox="0 0 37 36" style={this.styles.searchIcon}>
                                    <Circle cx="16" cy="16" r="15" stroke="#A9ADBF" stroke-width="2" fill={"none"}/>
                                    <Path d="M27 27L35.5 35" stroke="#A9ADBF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </Svg>
                                <TextInput
                                    style={this.styles.filterInput}
                                    placeholder={i18n.t('search')}
                                />
                            </View>
                    }
                </View>

                {
                    this.props.showFilterTags ?
                        <TouchableOpacity
                            onPress={this.props.toggleFilterTags}
                            style={[this.styles.toggleFilter, this.styles.toggleFilterClose]}
                        >
                            <Svg width={42} height={42} viewBox="0 0 42 42">
                                <Rect x="10.3789" y="31.0049" width="29.0798" height="2" rx="1" transform="rotate(-45 10.3789 31.0049)" fill="#303551"/>
                                <Rect x="30.8145" y="32.4316" width="29.3456" height="2" rx="1" transform="rotate(-135 30.8145 32.4316)" fill="#303551"/>
                            </Svg>
                        </TouchableOpacity> :
                        <TouchableOpacity
                            onPress={this.props.toggleFilterTags}
                            style={this.styles.toggleFilter}
                        >
                            <Svg width="45%" height="18" viewBox="0 0 36 18">
                                <Rect width="36" height="2" rx="1" fill="#303551"/>
                                <Rect x="5" y="8" width="27" height="2" rx="1" fill="#303551"/>
                                <Rect x="11" y="16" width="15" height="2" rx="1" fill="#303551"/>
                            </Svg>
                        </TouchableOpacity>
                }
            </View>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {

        return {
            showFilterTags: state.questList.get('showFilterTags', false),
        };
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<QuestListControllerInterface>('QuestList');

        return {
            toggleFilterTags: controller.toggleFilterTags.bind(controller),
        }
    }

    private readonly styles = StyleSheet.create({
        filter: {
            flex: 1,
            flexDirection: 'row',
            flexGrow: 1,
            position: 'relative',
        },
        filterInputWrapper: {
            flex: 1,
            position: 'relative'
        },
        filterInput: {
            backgroundColor: ColorEnum.WHITE,
            marginRight: this.getAdaptiveSize(Dimensions.get('screen').width * 0.04),
            padding: this.getAdaptiveSize(13),
            fontSize: this.getAdaptiveSize(20),
            lineHeight: this.getAdaptiveSize(20),
            height: Dimensions.get('screen').width * 0.13,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: ColorEnum.LIGHT_GRAY,
            color: ColorEnum.GRAY,
            paddingLeft: this.getAdaptiveSize(50),
            minHeight: this.getAdaptiveSize(40),
            marginBottom: this.getAdaptiveSize(25)
        },
        toggleFilter: {
            backgroundColor: ColorEnum.WHITE,
            width: Dimensions.get('screen').width * 0.13,
            height: Dimensions.get('screen').width * 0.13,
            minWidth: 40,
            minHeight: 40,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: ColorEnum.LIGHT_GRAY
        },
        toggleFilterClose: {
            backgroundColor: ColorEnum.TRANSPARENT,
            borderColor: ColorEnum.TRANSPARENT
        },
        burgerIcon: {
            width: '45%',
            resizeMode: 'contain'
        },
        filterTagsWrapper: {
            flex: 0,
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: this.getAdaptiveSize(25)
        },
        searchIcon: {
            position: 'absolute',
            zIndex: 10,
            left: this.getAdaptiveSize(15),
            top: this.getAdaptiveSize(8)
        }
    });
}
