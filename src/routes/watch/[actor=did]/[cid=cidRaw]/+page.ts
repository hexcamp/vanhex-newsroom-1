import type { PageLoad } from './$types';

export const ssr = false;
export const csr = true;

export const load: PageLoad = async ({ params }) => {
	const CDN_URL = `https://video.cdn.bsky.app`;
	const BASE_URL = `${CDN_URL}/hls/${params.actor}/${params.cid}`;

	return {
		playlistUrl: `${BASE_URL}/playlist.m3u8`,
		thumbnailUrl: `${BASE_URL}/thumbnail.jpg`,
	};
};
