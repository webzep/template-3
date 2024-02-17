import {
	TypedUseSelectorHook,
	useDispatch as useReduxDispatch,
	useSelector as useReduxSelector,
} from 'react-redux';

import { AppState } from '@/core/store/reducers';
import { store } from '@/core/store/store';

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;

type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = useReduxDispatch;
