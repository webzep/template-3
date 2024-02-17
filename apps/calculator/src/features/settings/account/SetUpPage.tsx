import { Padding, Typography, useSnackbar } from '@repo/ui';
import { FC } from 'react';

import { ActionDialog } from '@/components/ActionDialog/ActionDialog';
import { useDispatch, useSelector } from '@/core/store/hooks';
import { setPromptAccountSetup } from '@/features/settings/account/accountSlice';
import { FontSizeSlider } from '@/features/settings/account/preferences/FontSize';
import { ThemeTiles } from '@/features/settings/account/preferences/ThemeTiles';
import { ProfileCard } from '@/features/settings/account/profile/ProfileCard';

export const SetUpPage: FC = () => {
	const dispatch = useDispatch();
	const snackbar = useSnackbar();
	const { promptAccountSetup } = useSelector((state) => state.account);

	const handleClose = () => {
		dispatch(setPromptAccountSetup(false));
		snackbar.info('You can make changes at any time in settings.');
	};

	return (
		<ActionDialog
			actions={[
				{
					label: 'Done',
					onClick: handleClose,
				},
			]}
			onClose={handleClose}
			open={promptAccountSetup}
		>
			<Padding multiplier={8}>
				<Typography variant="h1">Quick start</Typography>
				<Typography variant="body">
					Set your details and preferences. These can be adjusted
					later in settings.
				</Typography>
				<br />
				<ThemeTiles />
				<br />
				<ProfileCard />
				<br />
				<FontSizeSlider />
			</Padding>
		</ActionDialog>
	);
};
