import {NavigatorInterface} from './NavigatorInterface';
import {Navigation} from 'react-native-navigation';
import {ActionSheetIOS, Platform} from 'react-native';
import * as Immutable from 'immutable';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {ApplicationStateType} from '../../Controllers/ApplicationStateType';
import {ActionSheetAndroidActionsEnum} from '../../Redux/Reducers/ActionSheetAndroid/ActionSheetAndroidActionsEnum';
import {ViewConstructor} from '../../Model/View/ViewConstructor';

export class Navigator implements NavigatorInterface {

    private static navigator?: NavigatorInterface;

    private constructor() {
    }

    public static getInstance() {
        if (this.navigator === undefined) {
            this.navigator = new Navigator();
        }

        return this.navigator;
    }


    public initializeApplicationFirstScreen(screenId: string): void {
        Navigation.events().registerAppLaunchedListener(() => {
            this.initOptions();
            this.setRoot(screenId);
        });
    };

    public setRoot(screenId: string): void {
        Navigation.setRoot({
            root: {
                stack: {
                    id: screenId,
                    children: [
                        {
                            component: {
                                name: 'FamilyQuest.' + screenId,
                            }
                        }
                    ]
                }
            }
        });
    };

    public push(reactComponentId: string, nextComponentId: string): void {
        Navigation.push(reactComponentId, {
            component: {
                name: 'FamilyQuest.' + nextComponentId
            }
        });
    };

    public showActionSheet(
        buttons: string[],
        actions: Immutable.List<() => void>,
        dispatch?: ThunkDispatch<ApplicationStateType, void, AnyAction>
    ): void {

        if (Platform.OS === "ios") {
            buttons.push('Cancel');

            ActionSheetIOS.showActionSheetWithOptions({
                    options: buttons,
                    cancelButtonIndex: buttons.length - 1,
                },
                (buttonIndex) => {
                    actions.get(buttonIndex, () => {})();
                });
        } else if (dispatch !== undefined) {


            // todo прокинуть props без dispatch!
            dispatch({
                type: ActionSheetAndroidActionsEnum.SHOW_ACTION_SHEET,
                buttons: buttons,
                actions: actions
            });

            // todo: поправить d.ts RNNv2
            Navigation.showModal({
                component: {
                    name: 'FamilyQuest.ActionSheetAndroid',
                    options: {
                        layout: {
                            backgroundColor: 'transparent',
                        },
                        modalPresentationStyle: 'overCurrentContext'
                    },
                },
            });
        }
    };


    public showPopup(children?: ViewConstructor<any, any, any>): void {

        Navigation.showModal({
            component: {
                name: 'FamilyQuest.PopupSettings',
                passProps: {
                    children: children
                },
                options: {
                    layout: {
                        backgroundColor: 'transparent',
                    },
                    modalPresentationStyle: 'overCurrentContext',
                    animations: {
                        showModal: {
                            alpha: {
                                from: 0,
                                to: 1,
                                duration: 300
                            }
                        },
                        dismissModal: {
                            alpha: {
                                from: 1,
                                to: 0,
                                duration: 300
                            }
                        }
                    }
                },
            },
        });
    }

    public showModal(children: ViewConstructor<any, any, any>): void {

        Navigation.showModal({
            component: {
                name: 'FamilyQuest.EmptyModal',
                passProps: {
                    children: children
                },
                options: {
                    layout: {
                        backgroundColor: 'transparent',
                    },
                    modalPresentationStyle: 'overCurrentContext',
                    animations: {
                        showModal: {
                            alpha: {
                                from: 0,
                                to: 1,
                                duration: 300
                            }
                        },
                        dismissModal: {
                            alpha: {
                                from: 1,
                                to: 0,
                                duration: 300
                            }
                        }
                    },
                },
            },
        });
    }


    private initOptions(): void {
        Navigation.setDefaultOptions({
            _statusBar: {
                backgroundColor: 'transparent',
                style: 'dark',
                drawBehind: true
            },
            topBar: {
                visible: false,
                animate: false
            },
            animations: {
                setRoot: {
                    alpha: {
                        from: 0,
                        to: 1,
                        duration: 300
                    }
                },
                push: {
                    topBar: {
                        id: 'TEST',
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    },
                    bottomTabs: {
                        y: {
                            from: 1000,
                            to: 0,
                            duration: 500,
                            interpolation: 'decelerate',
                        },
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 500,
                            interpolation: 'decelerate'
                        }
                    },
                    content: {
                        x: {
                            from: 1000,
                            to: 0,
                            duration: 500,
                            interpolation: 'accelerate',
                        },
                        alpha: {
                            from: 0,
                            to: 1,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    }
                },
                pop: {
                    topBar: {
                        id: 'TEST',
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    },
                    bottomTabs: {
                        y: {
                            from: 0,
                            to: 100,
                            duration: 500,
                            interpolation: 'accelerate',
                        },
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                            interpolation: 'accelerate'
                        }
                    },
                    content: {
                        x: {
                            from: 0,
                            to: 1000,
                            duration: 500,
                            interpolation: 'decelerate',
                        },
                        alpha: {
                            from: 1,
                            to: 0,
                            duration: 500,
                            interpolation: 'decelerate'
                        }
                    }
                }
            }
        });
    }
}
