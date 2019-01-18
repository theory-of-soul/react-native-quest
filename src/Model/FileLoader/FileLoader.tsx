import {FileLoaderInterface} from './FileLoaderInterface';
import {LoadFileResponseType} from './LoadFileResponseType';
import {LoadFileDataType} from './LoadFileDataType';
import {APPLICATION_SETTINGS} from '../../applicationSettings';

type BackendlessErrorType = {
    message: string,
    code: 6016 | 6003;
}

export class FileLoader implements FileLoaderInterface {

    private static fileLoader?: FileLoaderInterface;

    private constructor() {

    }

    public static getInstance() {
        if (this.fileLoader === undefined) {
            this.fileLoader = new FileLoader();
        }

        return this.fileLoader;
    }

    public async load(file: LoadFileDataType, path: string, overwrite?: boolean): Promise<LoadFileResponseType> {
        const data = new FormData();
        data.append('avatar', {
            uri: file.url,
            type: file.mime,
            name: file.filename
        });

        const queryUrl = `https://api.backendless.com/${APPLICATION_SETTINGS.BACKENDLESS_APP_ID}/${APPLICATION_SETTINGS.BACKENDLESS_REST_KEY}/files/${path}/${file.filename}?overwrite=${overwrite !== undefined ? overwrite : true}`;

        return new Promise<LoadFileResponseType>((resolve, reject) => {
            fetch(queryUrl, {
                method: 'post',
                body: data
            }).then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
            }).then(resolve).catch((error: BackendlessErrorType) => {
                console.log('BackendlessLoadFile error - ', error.message);
                reject(error)
            });
        })
    }
}

