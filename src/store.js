import { configureStore } from '@reduxjs/toolkit';

import decks from '../reducers';

// The reducer and action creators are plain Redux (including thunks); Redux
// Toolkit's configureStore wires up the thunk middleware and dev tooling.
const store = configureStore({
  reducer: decks,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
