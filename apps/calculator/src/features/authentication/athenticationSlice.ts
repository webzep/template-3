import { createSlice } from '@reduxjs/toolkit';

export type AuthenticationState = {
	isAuthenticating: boolean;
};

export const getAuthenticationInitialState = (): AuthenticationState => ({
	isAuthenticating: true,
});

const authenticationSlice = createSlice({
	initialState: getAuthenticationInitialState(),
	name: 'authentication',
	reducers: {
		setIsAuthenticating: (state, action) => {
			state.isAuthenticating = action.payload;
		},
	},
});

export const { setIsAuthenticating } = authenticationSlice.actions;

export const authenticationReducer = authenticationSlice.reducer;
