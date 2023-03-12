import { SvelteKitAuth } from '@auth/sveltekit';
import { Session } from '@auth/core/types';

declare module '@auth/core' {
	interface Session {
		user: {
			/** The user's postal address. */
			address: string;
		};
	}
}
