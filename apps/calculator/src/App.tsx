import { initialiseFirebaseApp } from '@repo/common-client';
import { createTheme, SnackbarProvider, ThemeProvider } from '@repo/ui';
import { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { appNameTitleCase } from '@/core/configs/constants';
import { environment } from '@/core/configs/environment';
import { useFirebaseAuth } from '@/core/hooks/useFirebaseAuth';
import { SiteRouter } from '@/core/routes/SiteRouter';
import { useSelector } from '@/core/store/hooks';
import { store } from '@/core/store/store';

initialiseFirebaseApp(
	environment.VITE_FIREBASE_API_KEY,
	environment.VITE_FIREBASE_APP_ID,
	`${environment.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
	environment.VITE_FIREBASE_MEASUREMENT_ID,
	environment.VITE_FIREBASE_MESSAGING_SENDER_ID,
	environment.VITE_FIREBASE_PROJECT_ID,
	`${environment.VITE_FIREBASE_PROJECT_ID}.appspot.com`
);

const App: FC = () => {
	const { preferences } = useSelector((state) => state.account);
	useFirebaseAuth();

	return (
		<ThemeProvider
			theme={createTheme({
				mode: preferences.theme,
				rootFontSize: preferences.fontSize,
			})}
		>
			<SnackbarProvider>
				<Helmet>
					<title>{appNameTitleCase}</title>
				</Helmet>
				<SiteRouter />
			</SnackbarProvider>
		</ThemeProvider>
	);
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
);
