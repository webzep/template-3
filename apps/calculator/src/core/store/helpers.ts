import { PayloadAction } from '@reduxjs/toolkit';

/**
 * @description A maker/factory that creates a slice-specific function to generate reducers that
 * simply assign the payload to the state.
 */
export const makeCreateSetReducer =
	<SliceState>() =>
	<StateKey extends keyof SliceState>(prop: StateKey) =>
	(state: SliceState, action: PayloadAction<SliceState[StateKey]>) => {
		state[prop] = action.payload;
	};
