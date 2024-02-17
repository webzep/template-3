import styled from '@emotion/styled';
import {
	getFirebaseAuth,
	redirectToSignIn,
	redirectToSignOut,
} from '@repo/common-client';
import {
	Button,
	Divider,
	MaterialIcon,
	Padding,
	Space,
	Typography,
} from '@repo/ui';
import { getAuth } from 'firebase/auth';
import { FC } from 'react';

import { environment } from '@/core/configs/environment';
import { PathNames } from '@/core/configs/paths';
import { SettingsTabItem } from '@/features/settings/components/SettingsTabItem';

const TabsContainer = styled.div`
	align-items: flex-end;
	background-color: ${({ theme }) => theme.palette.bg2};
	display: flex;
	flex: 1 0 220px;
	flex-direction: column;
	padding-top: 24px;
	max-height: 100%;
	overflow: scroll;
`;

const TabsGroup = styled.div`
	display: flex;
	flex-direction: column;
	min-width: 200px;
`;

const Subtitle = styled(Typography)`
	margin-left: 16px;
	margin-top: 8px;
`;

export const SettingsTabGroup: FC = () => {
	const user = getAuth().currentUser;

	const handleSignOutClicked = async () => {
		await getFirebaseAuth().signOut();
		redirectToSignOut(environment.VITE_APPS_ACCOUNTS_URL);
	};

	const handleSignInClicked = () =>
		redirectToSignIn(environment.VITE_APPS_ACCOUNTS_URL);

	return (
		<TabsContainer>
			<TabsGroup>
				<Padding multiplier={6}>
					<Subtitle variant="overline">Account</Subtitle>
					<SettingsTabItem
						label="Profile"
						route={`/${PathNames.SETTINGS}/${PathNames.PROFILE}`}
					/>
					<SettingsTabItem
						label="Preferences"
						route={`/${PathNames.SETTINGS}/${PathNames.PREFERENCES}`}
					/>
					<Divider />
					<Subtitle variant="overline">Resources</Subtitle>
					<SettingsTabItem
						label="Privacy Policy"
						route={`/${PathNames.PRIVACY_POLICY}`}
					/>
					<SettingsTabItem
						label="Terms of Service"
						route={`/${PathNames.TERMS_OF_SERVICE}`}
					/>
					<SettingsTabItem
						label="Support"
						route={`/${PathNames.SUPPORT}`}
					/>
					<Divider />
					{user ? (
						<Button onClick={handleSignOutClicked} variant="text">
							<span>Sign Out</span>
							<Space size="12px" />
							<MaterialIcon icon="logout" />
						</Button>
					) : (
						<Button
							onClick={handleSignInClicked}
							variant="contained"
						>
							<span>Sign In</span>
							<Space size="12px" />
							<MaterialIcon icon="login" />
						</Button>
					)}
				</Padding>
			</TabsGroup>
		</TabsContainer>
	);
};
