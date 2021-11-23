import { configureStore } from '@reduxjs/toolkit';
import { pexelsApi } from '../services/pexels';

export const store = configureStore({
	reducer: {
		[pexelsApi.reducerPath]: pexelsApi.reducer,
	},
});
