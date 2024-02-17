import { EntityId } from '@reduxjs/toolkit';

type Entities<Type> = {
	[key: string]: Type;
};

export type EntityState<Type> = {
	ids: EntityId[];
	entities: Entities<Type>;
};
