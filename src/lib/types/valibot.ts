import {
	isCanonicalResourceUri,
	isDid,
	isNsid,
	isRecordKey,
	isResourceUri,
	type CanonicalResourceUri,
	type Did,
	type Nsid,
	type RecordKey,
	type ResourceUri,
} from '@atcute/lexicons/syntax';

import * as v from 'valibot';

export const didString = v.pipe(
	v.string(),
	v.check((input) => isDid(input), `must be a did`),
) as v.GenericSchema<string, Did>;

export const nsidString = v.pipe(
	v.string(),
	v.check((input) => isNsid(input), `must be an nsid`),
) as v.GenericSchema<string, Nsid>;

export const recordKeyString = v.pipe(
	v.string(),
	v.check((input) => isRecordKey(input), `must be a record key`),
) as v.GenericSchema<string, RecordKey>;

export const resourceUriString = v.pipe(
	v.string(),
	v.check((input) => isResourceUri(input), `must be a resource uri`),
) as v.GenericSchema<string, ResourceUri>;

export const canonicalResourceUriString = v.pipe(
	v.string(),
	v.check((input) => isCanonicalResourceUri(input), `must be a canonical resource uri`),
) as v.GenericSchema<string, CanonicalResourceUri>;

export const integer = v.pipe(v.number(), v.safeInteger(), v.minValue(0));
