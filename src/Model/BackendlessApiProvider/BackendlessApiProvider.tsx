import {BackendlessApiProviderInterface} from './BackendlessApiProviderInterface';
import {BackendlessUserApiProviderInterface} from './BackendlessUserApiProvider/BackendlessUserApiProviderInterface';

export class BackendlessApiProvider implements BackendlessApiProviderInterface{

    private readonly userApi: BackendlessUserApiProviderInterface;

    constructor(backendlessUserApiProvider: BackendlessUserApiProviderInterface) {
        this.userApi = backendlessUserApiProvider;
    }

    public getUserApi(): BackendlessUserApiProviderInterface {
        return this.userApi;
    }
}