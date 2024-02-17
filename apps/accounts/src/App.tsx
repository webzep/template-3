import './App.css';

import { initialiseFirebaseApp } from '@repo/common-client';
import { FC, Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';

import { appNameTitleCase } from '@/core/configs/constants';
import { environment } from '@/core/configs/environment';
import { SiteRouter } from '@/core/routes/SiteRouter';

initialiseFirebaseApp(
	environment.VITE_FIREBASE_API_KEY,
	environment.VITE_FIREBASE_APP_ID,
	`${environment.VITE_FIREBASE_PROJECT_ID}.firebaseapp.com`,
	environment.VITE_FIREBASE_MEASUREMENT_ID,
	environment.VITE_FIREBASE_MESSAGING_SENDER_ID,
	environment.VITE_FIREBASE_PROJECT_ID,
	`${environment.VITE_FIREBASE_PROJECT_ID}.appspot.com`
);

const App: FC = () => (
	<Fragment>
		<Helmet>
			<title>{appNameTitleCase}</title>
		</Helmet>
		<SiteRouter />
	</Fragment>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
	<Router>
		<App />
	</Router>
);
