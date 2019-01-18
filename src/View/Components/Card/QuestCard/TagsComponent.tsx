import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Dimensions,
} from 'react-native';
import {AbstractView} from '../../../../Model/View/AbstractView';
import {ApplicationStateType} from '../../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../../Redux/Dispatch/DispatchType';
import {ActionCreatorsMapObject} from 'redux';
import * as Immutable from 'immutable';

type TagsType = 'boy' | 'girl' | 'home' | 'street';

type S = {}

type D = {}

type O = {
    tags: TagsType[];
}

export class TagsComponent extends AbstractView<S, D, O> {

    public render() {

        const tags = Immutable.Map({
            boy: require(`../../../../../files/img/questCard/types/type-boy.png`),
            girl: require(`../../../../../files/img/questCard/types/type-girl.png`),
            home: require(`../../../../../files/img/questCard/types/type-home.png`),
            street: require(`../../../../../files/img/questCard/types/type-street.png`),
        });

        return (
            <View  style={[this.styles.list, this.styles.typeList]}>
                {
                    this.props.tags.map((tagName: string, index: number) => {
                        return (
                            <Image
                                key={'tags_' + index}
                                style={this.styles.type}
                                source={tags.get(tagName)}
                            />
                        )
                    })
                }
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
        typeList: {
            marginLeft: 10,
        },
        type: {
            width: Dimensions.get('screen').width * 0.11,
            maxWidth: 60,
            maxHeight: 60,
            marginRight: 10,
            resizeMode: 'contain'
        },
    });
}
