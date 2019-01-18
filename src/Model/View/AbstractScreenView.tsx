import * as React from 'react';
import {AbstractView} from './AbstractView';
import {ScreenViewInterface} from './ScreenView/ScreenViewInterface';

type LocalS = {};

type LocalD = {};

type LocalO = {};

export abstract class AbstractScreenView<S extends LocalS = LocalS, D extends LocalD = LocalD, O extends LocalO = LocalO>
    extends AbstractView<S, D, O>
    implements ScreenViewInterface<S, D, O> {

    public abstract getScreenId(): string;
}