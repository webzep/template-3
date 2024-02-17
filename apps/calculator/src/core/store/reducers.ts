import { combineReducers } from '@reduxjs/toolkit';

import {
	authenticationReducer,
	AuthenticationState,
} from '@/features/authentication/athenticationSlice';
import {
	accountReducer,
	AccountState,
} from '@/features/settings/account/accountSlice';

export const rootReducer = combineReducers({
	account: accountReducer,
	authentication: authenticationReducer,
});

/**
 * @description We need to maintain a type that represents the entire state of the application,
 * because if we derive it from the rootReducer it will cause a circular dependency.
 */
export type AppState = {
	account: AccountState;
	authentication: AuthenticationState;
};
