import { combineReducers } from 'redux';

// import all reducers here
import marketsReducer from './marketplaceReducer';
import loginReducer from './loginReducer';

// combine reducers
const reducers = combineReducers({
  markets: marketsReducer,
  logins: loginReducer,
});

// make the combined reducers available for import
export default reducers;
