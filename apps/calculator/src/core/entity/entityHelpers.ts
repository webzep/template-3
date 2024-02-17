import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import { uniq } from 'lodash';

import { EntityReducerState } from '@/core/entity/entitySlice';
import { EntityState } from '@/core/types/entity';

type EntitySchema = {
	id: string;
	// TODO: Add more common properties for entities
};

export const getInitialEntityState = <
	T extends EntitySchema,
>(): EntityState<T> => ({
	entities: undefined,
	ids: undefined,
});

export const makeBuilderAddCaseMerge = <
	T extends AsyncThunk<Array<any>, unknown, null>, // eslint-disable-line @typescript-eslint/no-explicit-any
>(
	builder: ActionReducerMapBuilder<EntityReducerState>,
	thunkAction: T,
	path: keyof EntityReducerState
) => {
	builder.addCase(thunkAction.fulfilled, (state, action) => {
		state[path] = mergeResponseToExistingEntityState(
			state[path],
			action.payload
		);
	});
};

export const makeBuilderAddCaseSet = <T extends AsyncThunk<any, unknown, null>>( // eslint-disable-line @typescript-eslint/no-explicit-any
	builder: ActionReducerMapBuilder<EntityReducerState>,
	thunkAction: T,
	path: keyof EntityReducerState
) => {
	builder.addCase(thunkAction.fulfilled, (state, action) => {
		state[path] = mapResponseToEntityState(action.payload);
	});
};

const mapResponseToEntityState = <T extends EntitySchema>(
	response: T[]
): EntityState<T> => {
	const responseIds = response?.map((entity) => entity.id) ?? [];
	const newEntities = Object.fromEntries(
		response?.map((entity) => [entity.id, entity])
	);

	return {
		entities: newEntities,
		ids: responseIds,
	};
};

/**
 * @description Merging the response to the existing state allows us to call
 * for a single entity and have it added if it isn't already. Therefore there
 * is no need for a separate action to add a single entity.
 */
export const mergeResponseToExistingEntityState = <T extends EntitySchema>(
	existingState: EntityState<T>,
	response: T[]
): EntityState<T> => {
	const responseIds = response?.map((entity) => entity.id) ?? [];
	const uniqueIds = uniq([...(existingState.ids || []), ...responseIds]);

	const newEntities = Object.fromEntries(
		response?.map((entity) => [entity.id, entity])
	);

	const allEntities = {
		...existingState.entities,
		...newEntities,
	};

	const uniqueEntities = Object.fromEntries(
		uniqueIds.map((id) => [id, allEntities[id]])
	);

	return {
		entities: uniqueEntities,
		ids: uniqueIds,
	};
};
