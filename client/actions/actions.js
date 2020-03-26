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

export const makeVid = (videoTime) => ({
  type: types.VIDEO,
  payload: { video: videoTime }
})

//AUTHORIZED = 'AUTHORIZED';
// export const ADD_POSTING = 'ADD_POSTING';
// export const BID = 'BID';
