import React, { Component } from 'react';
import { render } from 'react-dom';
import Market from './market.jsx';
import Bids from './bids.jsx';
const socket = io();
import { authorize, addPost, changeBid } from '../actions/actions.js';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  markets: state.markets.markets,
});

const mapDispatchToProps = (dispatch) => ({
  authorize: (bool) => {
    return dispatch(authorize(bool));
  },
  changeBid: (markets) => {
    return dispatch(changeBid(markets));
  },
  addPost: (markets) => {
    return dispatch(addPost(markets));
  },
});

const Marketplace = (props) => {
  socket.on('update', (rows) => {
    props.addPost(rows);
  });

  const getMarkets = () => {
    fetch('/getmarkets')
      .then((res) => res.json())
      .then((json) => {
        props.addPost(json);
      });
  };
  const addMarket = () => {
    const marketName = document.getElementById('market-to-add').value;
    const description = document.getElementById('job-description').value;
    document.getElementById('market-to-add').value = '';
    document.getElementById('job-description').value = '';
    fetch('/addmarket', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        marketName: marketName,
        description: description,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        props.addPost(json);
      });
  };
  const makeBid = (post_id) => {
    const amount = document.getElementById(`${post_id}`);
    const bidAmount = amount.value;
    amount.value = '';
    fetch('/makebid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bidAmount: bidAmount,
        postId: post_id,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        props.changeBid(json);
      });
  };
  getMarkets();

  const marketsToRender = [];
  for (let i = 0; i < props.markets.length; i++) {
    // console.log(this.state.markets[i]);
    const post = props.markets[i]; //.title;
    marketsToRender.push(
      <div className="market-bid">
        <Market marketInfo={post} />
        <Bids makeBid={makeBid} bidInfo={post} />
      </div>,
    );
  }
  return (
    <div className="market-container">
      <h1 style={{ textAlign: 'center' }}>Marketplace</h1>
      <hr />
      <div className="itemBox">
        <div className="item">
          <span>Job Title: </span>
          <input id="market-to-add"></input>
          <br />
        </div>
        <div className="item">
          <span>Job Description: </span>
          <input id="job-description"></input>
          <br />
        </div>
        <div className="item">
          <button onClick={() => addMarket()}>Submit Market</button>
        </div>
      </div>
      <div id="markets">{marketsToRender}</div>
    </div>
  );
};

// render(<Marketplace />, document.getElementById('root'));
export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
