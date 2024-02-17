// import { createSlice } from '@reduxjs/toolkit';

import { EntityState } from '@/core/types/entity';

export type Entity = {
	id: string;
};

export type EntityReducerState = {
	todos: EntityState<Entity>;
};

// export const getEntityInitialState = (): EntityReducerState => ({
// 	todos: undefined,
// });

// const entitySlice = createSlice({
// 	initialState: getEntityInitialState(),
// 	name: 'entity',
// 	reducers: {},
// });

// export const {} = entitySlice.actions;

// export const entityReducer = entitySlice.reducer;
