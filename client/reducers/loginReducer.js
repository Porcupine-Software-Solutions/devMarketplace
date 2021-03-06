import * as types from '../constants/actionTypes';

const initialState = {
  authorized: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHORIZED:
      return {
        authorized: true,
      };
    default:
      return state;
  }
};

export default loginReducer;
