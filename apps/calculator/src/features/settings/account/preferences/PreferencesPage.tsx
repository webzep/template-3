import { Typography } from '@repo/ui';
import { FC, Fragment } from 'react';

import { FontSizeSlider } from '@/features/settings/account/preferences/FontSize';
import { ThemeTiles } from '@/features/settings/account/preferences/ThemeTiles';

export const PreferencesPage: FC = () => {
	return (
		<Fragment>
			<Typography variant="h6">Preferences</Typography>
			<br />
			<ThemeTiles />
			<br />
			<FontSizeSlider />
		</Fragment>
	);
};
