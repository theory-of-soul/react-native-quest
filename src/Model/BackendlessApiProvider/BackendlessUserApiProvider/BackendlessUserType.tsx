import Backendless from "backendless";

export type BackendlessServerUserType = Backendless.User & {
    photo?: string;
    "user-token": string;
}