import { createSlice } from '@reduxjs/toolkit';
import {
	AccountResponseDto,
	PreferencesResponseDto,
	ProfileResponseDto,
	ThemeMode,
} from '@repo/common';
import { redirectToSignIn } from '@repo/common-client';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

import { environment } from '@/core/configs/environment';
import {
	createAccount,
	getAuthToken,
} from '@/features/settings/account/accountActions';

export type PreferencesState = PreferencesResponseDto;

export type ProfileState = ProfileResponseDto;

export type AccountState = AccountResponseDto & {
	preferences: PreferencesState;
	profile: ProfileState;
	promptAccountSetup: boolean;
};

export const getAccountInitialState = (): AccountState => ({
	dateUpdated: null,
	id: null,
	preferences: {
		fontSize: 16,
		theme: ThemeMode.SYSTEM,
	},
	profile: {
		displayName: '',
		email: '',
		givenName: '',
		surname: '',
	},
	promptAccountSetup: false,
});

const accountSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(getAuthToken.fulfilled, (state, action) => {
			if (action.payload.status === 401) {
				console.log('redirect to signin');
				redirectToSignIn(environment.VITE_APPS_ACCOUNTS_URL);
			}

			const token = action.payload.data;
			if (!token) return;

			const auth = getAuth();
			signInWithCustomToken(auth, token).catch((error) => {
				const errorMessage = error.message;
				console.log('🚀 ~ errorMessage:', errorMessage);
			});
		});
		builder.addCase(createAccount.fulfilled, (state, action) => {
			state.promptAccountSetup = true;
			state.preferences =
				action.payload.data?.preferences ?? state.preferences;
			state.profile = action.payload.data?.profile ?? state.profile;
		});
	},
	initialState: getAccountInitialState(),
	name: 'user',
	reducers: {
		setAccount: (state, action) => ({ ...state, ...action.payload }),
		setPromptAccountSetup: (state, action) => {
			state.promptAccountSetup = action.payload;
		},
	},
});

export const { setAccount, setPromptAccountSetup } = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
