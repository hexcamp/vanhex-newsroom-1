export interface PaginationResult {
	rootUrl: string | undefined;
	nextUrl: string | undefined;
}

const relative = (url: URL | undefined) => {
	return url ? url.search + url.hash : undefined;
};

export const paginate = (url: URL, cursor?: string): PaginationResult => {
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
		rootUrl: relative(rootUrl),
		nextUrl: relative(nextUrl),
	};
};
