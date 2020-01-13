import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'; // this is helpfull to warn us if we accidentaly mutate any state in redux store
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const composeEnhacers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //add support for redux dev tools
  return createStore(
    rootReducer,
    initialState,
    composeEnhacers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
