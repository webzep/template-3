import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { AppBar } from '@/components/AppBar/AppBar';
import { PathNames } from '@/core/configs/paths';
import { AppBaseContainer } from '@/core/layouts/AppBaseContainer';
import { AppLayoutWithNavBar } from '@/core/layouts/AppLayoutWithNavBar';
import { ErrorPage } from '@/features/basics/ErrorPage/ErrorPage';
import { NotFoundPage } from '@/features/basics/NotFoundPage/NotFoundPage';
import { PrivacyPolicyPage } from '@/features/basics/PrivacyPolicyPage';
import { SupportPage } from '@/features/basics/SupportPage';
import { TermsOfServicePage } from '@/features/basics/TermsOfServicePage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { PreferencesPage } from '@/features/settings/account/preferences/PreferencesPage';
import { ProfilePage } from '@/features/settings/account/profile/ProfilePage';
import { SettingsPage } from '@/features/settings/SettingsPage';

const siteRoutes = (
	<Route element={<AppBaseContainer />}>
		<Route path={PathNames.ERROR} element={<ErrorPage />} />
		<Route element={<AppLayoutWithNavBar appbar={<AppBar />} />}>
			<Route path={PathNames.NOT_FOUND} element={<NotFoundPage />} />
			<Route
				path={PathNames.PRIVACY_POLICY}
				element={<PrivacyPolicyPage />}
			/>
			<Route path={PathNames.SUPPORT} element={<SupportPage />} />
			<Route
				path={PathNames.TERMS_OF_SERVICE}
				element={<TermsOfServicePage />}
			/>
			<Route index element={<DashboardPage />} />
		</Route>
		<Route element={<AppLayoutWithNavBar appbar={<AppBar />} />}>
			<Route index element={<DashboardPage />} />
		</Route>
		<Route path={PathNames.SETTINGS} element={<SettingsPage />}>
			<Route index element={<Navigate to={PathNames.PROFILE} />} />
			<Route path={PathNames.PREFERENCES} element={<PreferencesPage />} />
			<Route path={PathNames.PROFILE} element={<ProfilePage />} />
		</Route>
		<Route path="*" element={<Navigate to={PathNames.NOT_FOUND} />} />
	</Route>
);

export const SiteRouter: FC = () => {
	return <Routes>{siteRoutes}</Routes>;
};
