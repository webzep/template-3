export type CreateProfileRequestDto = {
	displayName: string;
	email: string;
	givenName: string;
	surname: string;
};

export type ProfileResponseDto = {
	displayName: string;
	email: string;
	givenName: string;
	surname: string;
};

export type UpdateProfileRequestDto = {
	displayName?: string;
	email?: string;
	givenName?: string;
	surname?: string;
};
