// state for marketplace reducer will just have "markets, is an array include who posted, user"
// (only adding a market or adding a bid would change state)

import * as types from '../constants/actionTypes.js';

const initialState = {
  markets: [],
  video: false
};

const marketplaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_POSTING:
      return {
        ...state,
        ...action.payload,
      };
    case types.BID:
      return {
        ...state,
        ...action.payload,
      };
    case types.VIDEO:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
};
export default marketplaceReducer;
