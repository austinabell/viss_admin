import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import rootReducer from "./reducers";
import { saveState, loadState } from "./helpers/localStorage";

const initialState = loadState();

const middleware = [thunk];

// For redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/**
 * Creates redux store and adds middlewares
 */
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(
  // ? Double check this
  throttle(() => {
    saveState({ config: store.getState().config });
  }, 1000)
);

export default store;
