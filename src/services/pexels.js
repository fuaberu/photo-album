import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url) => ({
	url,
	headers: {
		Authorization: process.env.REACT_APP_PEXELS_API_KEY,
	},
});

export const pexelsApi = createApi({
	reducerPath: 'pexelsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.pexels.com/v1/' }),
	endpoints: (builder) => ({
		getCuratedPhotos: builder.query({
			query: (count) => createRequest(`curated?per_page=${count}`),
		}),
		getSearchPhotos: builder.query({
			query: ({ count, query, orientation }) =>
				createRequest(`search?query=${query}&orientation=${orientation}&per_page=${count}"
`),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCuratedPhotosQuery } = pexelsApi;
export const { useGetSearchPhotosQuery } = pexelsApi;
