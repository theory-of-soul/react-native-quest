import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import {AbstractScreenView} from '../../../Model/View/AbstractScreenView';
import {ApplicationStateType} from '../../../Controllers/ApplicationStateType';
import {DispatchType} from '../../../Redux/Dispatch/DispatchType';
import {ColorEnum} from '../../colorEnum';
import {ActionCreatorsMapObject} from 'redux';
import {QuestListControllerInterface} from '../../../Controllers/QuestListController/QuestListControllerInterface';
import {QuestCardComponent} from '../../Components/Card/QuestCard/QuestCardComponent';
import {UserType} from '../../../Model/BackendlessApiProvider/BackendlessUserApiProvider/UserType';
import {FilterComponent} from '../../Components/Filter/FilterComponent';

type S = {
    user: UserType;
}

type D = {
    openUserProfile: any;
}

type O = {
    componentId: string;
}

export class QuestList extends AbstractScreenView<S, D, O> {

    public componentDidMount() {
        // todo тут будет вызов запроса на список игр
    }

    public getScreenId() {
        return 'QuestList';
    }

    public render() {
        const QuestCard = this.getElement(QuestCardComponent);
        const Filter = this.getElement(FilterComponent);

        return (
            <SafeAreaView style={this.styles.safeArea}>
                <View style={this.styles.wrapper}>
                    <View style={this.styles.header}>
                        <Filter />

                        <TouchableOpacity
                            onPress={this.props.openUserProfile}
                            style={this.styles.userAvatarWrapper}
                        >
                            {
                                this.props.user.photo ?
                                    <Image
                                        style={this.styles.userAvatar}
                                        source={{uri: this.props.user.photo}}
                                    /> : undefined
                            }
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <QuestCard />
                        <QuestCard />
                        <QuestCard />
                        <QuestCard />
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    public mapStateToProperties(state: ApplicationStateType, ownProps: O): S {
        return {
            user: state.users.get(state.users.get('lastUserId'), {
                photo: ''
            }),
        }
    }

    public mapDispatchToProperties(dispatch: DispatchType, ownProps: O): ActionCreatorsMapObject<D> {
        const controller = this.controllerCollection.getController<QuestListControllerInterface>('QuestList');

        return {
            openUserProfile: controller.openUserProfile.bind(controller, ownProps.componentId)
        }
    }

    private readonly styles = StyleSheet.create({
        safeArea: {
            flex: 1,
            backgroundColor: ColorEnum.CONTAINER,
            justifyContent: 'space-between',
        },
        wrapper: {
            flex: 1,
            flexDirection: 'column',
            padding: this.getAdaptiveSize(20),
            paddingTop: this.getAdaptiveSize(50)
        },
        header: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-end'
        },
        userAvatarWrapper: {
            backgroundColor: ColorEnum.PURPLE,
            width: Dimensions.get('screen').width * 0.13,
            height: Dimensions.get('screen').width * 0.13,
            overflow: 'hidden',
            minWidth: 40,
            minHeight: 40,
            borderRadius: Dimensions.get('screen').width * 0.13,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: Dimensions.get('screen').width * 0.04
        },
        userAvatar: {
            width: '100%',
            height: '100%',
        },
    });
}
