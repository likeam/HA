import { useDispatch, useSelector } from "react-redux";
import { store } from "./store";

/**
 * Typed dispatch hook
 * @returns {import('./store').AppDispatch}
 */
export const useAppDispatch = () => useDispatch();

/**
 * Typed selector hook
 * @template T
 * @param {(state: import('./store').RootState) => T} selector
 * @returns {T}
 */
export const useAppSelector = useSelector;

/**
 * Get current state synchronously
 * @returns {import('./store').RootState}
 */
export const useAppState = () => store.getState();
