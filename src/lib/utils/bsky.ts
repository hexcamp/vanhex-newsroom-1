export const replaceVideoCdnUrl = (url: string) => {
	// Redirect video-related assets from the middleware server to the CDN directly
	return url.replace('https://video.bsky.app/watch/', 'https://video.cdn.bsky.app/hls/');
};
