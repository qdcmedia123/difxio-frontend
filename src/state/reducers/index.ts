import { authReducer  } from './auth';
import {AuthUser} from '../actions';
import { combineReducers } from 'redux';


export interface StoreState {
    auth: AuthUser,
}

export const reducers = combineReducers<StoreState>({
    auth: authReducer,
    
});

export type RootState = ReturnType<typeof reducers>;
