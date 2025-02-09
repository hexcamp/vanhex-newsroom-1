import type { ParamMatcher } from '@sveltejs/kit';

// cidv1; multibase=base32; multihash=sha2-256; multicodec=raw
const RAW_CID_RE = /^bafkrei[2-7a-z]{52}$/;

export const match = ((param: string): param is string => {
	return RAW_CID_RE.test(param);
}) as ParamMatcher;
