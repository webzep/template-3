import { AccountStatus, AccountType, ThemeMode } from '@repo/common';

export type Account = {
	dateCreated: string;
	dateUpdated: string;
	forceSignOut: boolean;
	hasAcceptedTerms: boolean;
	id: string;
	preferences: Preferences;
	profile: Profile;
	role: AccountType;
	status: AccountStatus;
};

export type Profile = {
	displayName?: string;
	email: string;
	givenName: string;
	surname: string;
};

export enum FontSize {
	'TWELVE' = 12,
	'FOURTEEN' = 14,
	'SIXTEEN' = 16,
	'EIGHTEEN' = 18,
	'TWENTY' = 20,
	'TWENTY_TWO' = 22,
	'TWENTY_FOUR' = 24,
}

export type Preferences = {
	fontSize?: FontSize;
	theme?: ThemeMode;
};

export const createNewAccount = (
	id: string,
	profile: Profile,
	preferences: Preferences
): Account => ({
	dateCreated: new Date().toISOString(),
	dateUpdated: new Date().toISOString(),
	forceSignOut: false,
	hasAcceptedTerms: false,
	id,
	preferences,
	profile,
	role: AccountType.USER,
	status: AccountStatus.ACTIVE,
});

export const createNewProfile = (
	email: string,
	givenName: string,
	surname: string,
	displayName?: string
): Profile => ({
	displayName,
	email,
	givenName,
	surname,
});

export const createNewPreferences = (
	fontSize?: FontSize,
	theme?: ThemeMode
): Preferences => ({
	fontSize: fontSize ?? FontSize.SIXTEEN,
	theme: theme ?? ThemeMode.SYSTEM,
});
