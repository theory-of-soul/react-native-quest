import {BackendlessUserApiProviderInterface} from './BackendlessUserApiProvider/BackendlessUserApiProviderInterface';

export interface BackendlessApiProviderInterface {

    getUserApi(): BackendlessUserApiProviderInterface;

}