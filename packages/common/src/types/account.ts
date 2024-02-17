import {
	PreferencesResponseDto,
	UpdatePreferencesRequestDto,
} from './preferences';
import {
	CreateProfileRequestDto,
	ProfileResponseDto,
	UpdateProfileRequestDto,
} from './profile';

export enum AccountStatus {
	ACTIVE = 'active',
	INACTIVE = 'inactive',
	SUSPENDED = 'suspended',
	DELETED = 'deleted',
}

export enum AccountType {
	ADMIN = 'admin',
	OWNER = 'owner',
	USER = 'user',
}

export type AccountResponseDto = {
	id: string;
	dateUpdated: string;
	preferences: PreferencesResponseDto;
	profile: ProfileResponseDto;
};

export type CreateAccountRequestDto = {
	id: string;
	profile: CreateProfileRequestDto;
};

export type UpdateAccountRequestDto = {
	forceSignOut?: boolean;
	hasAcceptedTerms?: boolean;
	preferences?: UpdatePreferencesRequestDto;
	profile?: UpdateProfileRequestDto;
	role?: AccountType;
	status?: AccountStatus;
};
