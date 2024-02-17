import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from '@/core/store/reducers';

export const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
	reducer: rootReducer,
});
