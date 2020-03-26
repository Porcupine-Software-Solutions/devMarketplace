import * as types from '../constants/actionTypes.js';

export const authorize = (bool) => ({
  type: types.AUTHORIZED,
  payload: bool,
});

export const addPost = (markets) => ({
  type: types.ADD_POSTING,
  payload: { markets },
});

export const changeBid = (markets) => ({
  type: types.BID,
  payload: { markets },
});

//AUTHORIZED = 'AUTHORIZED';
// export const ADD_POSTING = 'ADD_POSTING';
// export const BID = 'BID';
