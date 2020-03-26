import React from "react";
import { authorize, changePost, addBid } from "../actions/actions.js";

const Bids = props => {
  const bids = [];
  if (props.bidInfo.bids.length !== 0) {
    props.bidInfo.bids.sort((a, b) => {
      let aAmount = parseFloat(a.amount);
      let bAmount = parseFloat(b.amount);
      if (aAmount < bAmount) return 1;
      else if (aAmount === bAmount) return 0;
      else return -1;
    });
    for (let i = 0; i < props.bidInfo.bids.length; i++) {
      bids.push(
        <li>
          {`${props.bidInfo.bids[i].username} : $${props.bidInfo.bids[i].amount}`}
          <button onClick={() => props.becomeVideo(true)}>Contact Dev</button>
        </li>
      );
    }
  }

  return (
    <div
      className="bid-display"
      style={{
        border: "2px solid black",
        borderRadius: "5px",
        margin: "10px"
      }}
    >
      <div className="bidBox">
        <div className="bidItem">
          <input
            type="number"
            className="bid-input"
            id={props.bidInfo.post_id}
            style={{
              border: "2px solid black",
              borderRadius: "5px",
              margin: "10px",
              padding: "5px"
            }}
          ></input>
        </div>
        <div className="bidItem">
          <button
            onClick={() => {
              props.makeBid(props.bidInfo.post_id);
            }}
            style={{ margin: "10px" }}
          >
            Submit Bid
          </button>
        </div>
        <br />
        <br />
        <div className="bidItem">
          <span>Bids: </span>
        </div>
      </div>
      <br />
      <ol>{bids}</ol>
    </div>
  );
};
export default Bids;
