
import { createStore, applyMiddleware } from 'redux'; 

export default Store = createStore(() => [], {}, applyMiddleware());

// const rootReducer = combineReducers({
//   UserReducer: UserReducer,
//   PropertyReducer: PropertyReducer,
//   PayReducer: PayReducer,
// });

// export default configureStore({
//   reducer: rootReducer,
//   // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//       immutableCheck: false,
//     }),
// });
