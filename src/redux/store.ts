import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { jokesApi } from "../api/jokes/jokes.api";

export const store = configureStore({
   reducer: {
      [jokesApi.reducerPath]: jokesApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(jokesApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
