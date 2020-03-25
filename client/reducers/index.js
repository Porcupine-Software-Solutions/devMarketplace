import { combineReducers } from 'redux';

// import all reducers here
import marketplaceReducer from './marketplaceReducer';
import loginReducer from './loginReducer';

// combine reducers
const reducers = combineReducers({
  markets: marketplaceReducer,
  logins: loginReducer,
});

// make the combined reducers available for import
export default reducers;
