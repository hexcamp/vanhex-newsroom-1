import { XRPCError } from '@atcute/client';
import type { HandleServerError } from '@sveltejs/kit';

export const handleError: HandleServerError = async ({ error, event, status, message }) => {
	console.error(error);

	if (error instanceof XRPCError) {
		if (error.status === 403) {
			return {
				message: `Upstream server is forbidding access to this resource`,
			};
		}

		if (error.kind === 'AuthRequired' || error.kind === 'auth required') {
			return {
				message: `Upstream server is requiring authentication to access this resource`,
			};
		}

		if (error.kind === 'InternalServerError' || error.description === 'Internal Server Error') {
			return {
				message: `Upstream server returned an internal error`,
			};
		}
	}

	if (status === 404) {
		return {
			message: `Page not found`,
		};
	}

	return {
		message: `Something went wrong, sorry about that`,
	};
};
