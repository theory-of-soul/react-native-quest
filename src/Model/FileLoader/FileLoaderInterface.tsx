import {LoadFileResponseType} from './LoadFileResponseType';
import {LoadFileDataType} from './LoadFileDataType';

export interface FileLoaderInterface {

    load(file: LoadFileDataType, path: string, overwrite?: boolean): Promise<LoadFileResponseType>;
}