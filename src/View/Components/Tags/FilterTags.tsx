import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Text,
    ViewStyle,
    StyleProp,
    TextStyle
} from 'react-native';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import {AbstractView} from '../../../Model/View/AbstractView';
import {ColorEnum} from '../../colorEnum';

type S = {}

type D = {}

type O = {
    active?: boolean;
    text: string;
    onPress: () => void;
}

export class FilterTags extends AbstractView<S, D, O> {

    public render() {

        let tagStyle: StyleProp<ViewStyle>[] = [this.styles.filterTag];
        let tagTextStyle: StyleProp<TextStyle>[] = [this.styles.filterTagText];

        if (this.props.active) {
            tagStyle.push(this.styles.filterTagActive);
            tagTextStyle.push(this.styles.filterTagTextActive);
        }

        return (
            <TouchableOpacity
                onPress={this.props.onPress}
                style={tagStyle}
            >
                <Text style={tagTextStyle}>
                    {this.props.text}
                </Text>
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
        filterTag: {
            flex: 0,
            paddingHorizontal: this.getAdaptiveSize(10),
            paddingVertical: this.getAdaptiveSize(8),
            borderColor: ColorEnum.GRAY,
            borderWidth: 1,
            borderRadius: this.getAdaptiveSize(20),
            marginTop: this.getAdaptiveSize(12),
            marginRight: this.getAdaptiveSize(10)
        },
        filterTagText: {
            color: ColorEnum.GRAY,
            fontSize: this.getAdaptiveSize(18),
            lineHeight: this.getAdaptiveSize(18)
        },
        filterTagActive: {
            borderColor: ColorEnum.RED
        },
        filterTagTextActive: {
            color: ColorEnum.RED
        },
    });
}
