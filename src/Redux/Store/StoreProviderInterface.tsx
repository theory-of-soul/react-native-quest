import {Store} from 'redux';

export interface StoreProviderInterface {
    getStore(): Store;
}
