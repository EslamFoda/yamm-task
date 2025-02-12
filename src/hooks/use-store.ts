import { AppDispatch, RootState } from "@/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Typed dispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;

// Typed selector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
