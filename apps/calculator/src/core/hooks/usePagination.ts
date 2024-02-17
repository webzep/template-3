import { EntityState } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';

type UsePaginationProps<T> = {
	entityState: EntityState<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
	exclude?: Record<string, string | number | boolean>;
	initialFilterTerm?: string;
	initialPage?: number;
	initialPageSize?: number;
	searchByKeys: (keyof EntityState<T>['entities'])[];
};

const applyFilterToEntities = <T>(
	entityState: UsePaginationProps<T>['entityState'],
	filters: UsePaginationProps<T>['exclude']
) => {
	if (Object.keys(filters).length === 0 || !entityState?.entities) {
		return entityState;
	}

	const filteredEntities = Object.values(entityState.entities).filter(
		(entity) =>
			Object.keys(filters).some((key) => entity[key] !== filters[key])
	);

	return {
		...entityState,
		entities: filteredEntities.reduce(
			(acc, entity) => ({
				...acc,
				[entity.id]: entity,
			}),
			{}
		),
	};
};

const checkIsKeyMatched = <T>(value: T[keyof T], term: string) =>
	value?.toString().toLowerCase().includes(term.toLowerCase());

const applySearchTermToEntities = <T>(
	entityState: UsePaginationProps<T>['entityState'],
	searchByKeys: UsePaginationProps<T>['searchByKeys'],
	term: string
) => {
	if (!term || !entityState?.entities) {
		return Object.values(entityState?.entities ?? {});
	}

	return entityState.entities
		? Object.values(entityState.entities).filter((entity) => {
				const entityValues = searchByKeys.map((key) => entity[key]);

				return entityValues.some((entry) =>
					checkIsKeyMatched<T>(entry, term)
				);
			})
		: [];
};

export const usePagination = <T>({
	entityState,
	exclude,
	initialFilterTerm,
	initialPage,
	initialPageSize,
	searchByKeys,
}: UsePaginationProps<T>) => {
	const [rowExclusions, setRowExclusions] =
		useState<UsePaginationProps<T>['exclude']>(exclude);
	const [page, setPage] = useState(initialPage ?? 1);
	const [pageSize, setPageSize] = useState(initialPageSize ?? 10);
	const [searchTerm, setSearchTerm] = useState(initialFilterTerm ?? '');
	const [searchResults, setSearchResults] = useState<T[]>(null);

	const totalPages = Math.ceil((searchResults?.length ?? 0) / pageSize) || 1;
	const pageEntities =
		searchResults?.slice((page - 1) * pageSize, page * pageSize) ?? [];

	const filtersChanged = !isEqual(exclude, rowExclusions);
	if (filtersChanged) {
		setRowExclusions(exclude);
	}

	const handleFilterClear = () => {
		handleSearchChanged('');
	};

	const handleNextPage = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};

	const handlePageSizeChanged = (pageSize: number) => {
		setPageSize(pageSize);
	};

	const handlePrevPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const handleSearchChanged = (term: string) => {
		setPage(1);
		setSearchTerm(term);

		const filteredEntities = applyFilterToEntities(
			entityState,
			rowExclusions
		);
		const searchResults = applySearchTermToEntities(
			filteredEntities,
			searchByKeys,
			term
		);
		setSearchResults(searchResults);
	};

	const handleSetPage = (page: number) => {
		setPage(page);
	};

	useEffect(() => {
		handleSearchChanged(searchTerm);
	}, [entityState.entities, rowExclusions]);

	return {
		handleFilterClear,
		handleNextPage,
		handlePageSizeChanged,
		handlePrevPage,
		handleSearchChanged,
		handleSetPage,
		page,
		pageEntities,
		pageSize,
		searchTerm,
		totalPages,
	};
};
