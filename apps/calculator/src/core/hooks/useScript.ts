import { useEffect } from 'react';

export const useScript = (url: string, removeOnUnmount = false) => {
	useEffect(() => {
		let script: HTMLScriptElement;
		if (!document.querySelector(`script[src="${url}"]`)) {
			script = document.createElement('script');
			script.src = url;
			script.async = true;

			document.body.appendChild(script);
		}

		return () => {
			if (removeOnUnmount && script) {
				document.body.removeChild(script);
			}
		};
	}, [url]);
};
