import type { MovieDetails, MovieList } from '$lib/types';
import * as api from '$lib/api';

export async function load({ fetch }) {
	const [trending, now_playing, upcoming] = await Promise.all([
		api.get<MovieList>(fetch, 'trending/movie/day', { page: '1' }),
		api.get<MovieList>(fetch, 'movie/now_playing', { page: '1' }),
		api.get<MovieList>(fetch, 'movie/upcoming', { page: '1' }),
	]);

	const featured = (await api.get(fetch, `movie/${trending.results[0].id}`, {
		append_to_response: 'images,videos,recommendations',
	})) as MovieDetails;

	return {
		trending,
		featured,
		now_playing,
		upcoming,
	};
}
