import { ActionTypes } from '../action-types';

export interface AuthUser {
    isAuthenticated: boolean;
    token?: string | null;
}

export interface AuthUserAction {
    type: ActionTypes.authUser,
    payload: AuthUser
}

export const authUser = (data: AuthUser) => {
    return {
        type: ActionTypes.authUser,
        payload: data
    }
}
