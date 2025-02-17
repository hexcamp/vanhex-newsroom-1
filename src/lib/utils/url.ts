export const safeUrlParse = (rawUrl: string): URL | null => {
	const url = URL.parse(rawUrl);
	if (!url) {
		return null;
	}

	const protocol = url.protocol;
	if (protocol !== 'https:' && protocol !== 'http:') {
		return null;
	}

	return url;
};
