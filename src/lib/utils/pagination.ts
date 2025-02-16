export interface PaginationResult {
	rootUrl: string | undefined;
	nextUrl: string | undefined;
}

const relative = (url: URL | undefined, canonicalPath?: string): string | undefined => {
	if (!url) {
		return undefined;
	}

	const queryAndHash = url.search + url.hash;
	return canonicalPath ? canonicalPath + queryAndHash : queryAndHash || '?';
};

export const paginate = (url: URL, cursor?: string, canonicalPath?: string): PaginationResult => {
	let rootUrl: URL | undefined;
	let nextUrl: URL | undefined;

	if (url.searchParams.has('cursor')) {
		rootUrl = new URL(url.href);
		rootUrl.searchParams.delete('cursor');
	}

	if (cursor) {
		nextUrl = new URL(url.href);
		nextUrl.searchParams.set('cursor', cursor);
	}

	return {
		rootUrl: relative(rootUrl, canonicalPath),
		nextUrl: relative(nextUrl, canonicalPath),
	};
};
