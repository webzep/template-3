import { ThemeMode } from './theme';

export type PreferencesResponseDto = {
	fontSize: number;
	theme: ThemeMode;
};

export type UpdatePreferencesRequestDto = {
	fontSize?: number;
	theme?: ThemeMode;
};
