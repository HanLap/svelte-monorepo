import * as api from '$lib/api';
import type { MovieDetails, MovieDetailsResult } from '$lib/types';
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const movie = await api.get<MovieDetailsResult>(fetch, `movie/${params.id}`, {
		append_to_response: 'images,videos,recommendations',
	});

	if ('success' in movie && !movie.success) {
		throw error(404, 'Movie not found');
	}

	const trailer = (movie as MovieDetails).videos.results.find(
		(video) =>
			video.official &&
			(video.type === 'Trailer' || video.type === 'Teaser') &&
			video.site === 'YouTube'
	);

	return {
		movie: movie as MovieDetails,
		trailer,
	};
}
