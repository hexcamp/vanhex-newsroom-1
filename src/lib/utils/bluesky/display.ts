const INVISIBLE_RE = /[\u00ad\u200b\u200c\u2060\ufeff]/g;
const WHITESPACE_RE = /\s+/g;

export const normalizeDisplayName = (name: string) => {
	return name.replace(INVISIBLE_RE, '').replace(WHITESPACE_RE, ' ').trim();
};
