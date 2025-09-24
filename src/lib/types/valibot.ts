import { isDid, isNsid, isRecordKey, type Did, type Nsid, type RecordKey } from '@atcute/lexicons/syntax';

import * as v from 'valibot';

export const didString = v.pipe(
	v.string(),
	v.check((input) => isDid(input), `must be a did string`),
) as v.GenericSchema<string, Did>;

export const nsidString = v.pipe(
	v.string(),
	v.check((input) => isNsid(input), `must be an nsid string`),
) as v.GenericSchema<string, Nsid>;

export const recordKeyString = v.pipe(
	v.string(),
	v.check((input) => isRecordKey(input), `must be an rkey string`),
) as v.GenericSchema<string, RecordKey>;

export const integer = v.pipe(v.number(), v.safeInteger(), v.minValue(0));
