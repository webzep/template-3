import { Environments } from '@repo/common';

const getCookieDomainAttribute = (env: string, origin: string) => {
	const isDev = env === Environments.DEVELOPMENT || origin === 'localhost';

	const domain = new URL(origin).hostname.replace('www.', '');
	const domainAttribute = isDev ? '' : `domain=.${domain};`;

	return domainAttribute;
};

export const clearAuthCookie = (env: string, origin: string) => {
	const domainAttribute = getCookieDomainAttribute(env, origin);
	document.cookie = `authToken=;expires=Thu, 01 Jan 1970 00:00:00 GMT;${domainAttribute}path=/;`;
};

export const setAuthCookie = (env: string, origin: string, token: string) => {
	const domainAttribute = getCookieDomainAttribute(env, origin);
	const isDev = env === Environments.DEVELOPMENT;
	const httpOnly = isDev ? '' : 'HttpOnly;';
	const secure = window.location.protocol === 'https:' ? 'Secure;' : '';
	const expiry = new Date();
	expiry.setMonth(expiry.getMonth() + 1);
	const expiresString = `expires=${expiry.toUTCString()};`;

	document.cookie = `authToken=${token};${domainAttribute}path=/;${secure}${httpOnly}${expiresString}`;
};

export const redirectToSignIn = (accountsUrl: string, boomerang = true) => {
	const url = new URL(accountsUrl);
	if (boomerang) {
		url.searchParams.append('redirect_url', location.href);
	}
	location.href = url.href;
};

export const redirectToSignOut = (accountsUrl: string) => {
	location.href = `${accountsUrl}/sign-out`;
};
