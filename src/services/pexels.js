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
		getSearchPhotos: builder.query({
			query: ({ count, query, page, orientation }) =>
				createRequest(`search?query=${query}&orientation=${orientation}&page=${page}&per_page=${count}"
`),
		}),
	}),
});

export const { useGetSearchPhotosQuery } = pexelsApi;
