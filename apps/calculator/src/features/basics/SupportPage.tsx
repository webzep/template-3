import { Card, Typography } from '@repo/ui';
import { FC, Fragment } from 'react';

import { appNameTitleCase } from '@/core/configs/constants';

export const SupportPage: FC = () => {
	return (
		<Fragment>
			<Typography variant="h2">Support</Typography>
			<Card>
				<Typography variant="body">
					Find help for {appNameTitleCase} here.
				</Typography>
			</Card>
		</Fragment>
	);
};
