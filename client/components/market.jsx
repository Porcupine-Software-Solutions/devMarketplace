import React from "react";
import { authorize, changePost, addBid } from "../actions/actions.js";

const Market = props => {
  return (
    <div
      className={"market-display"}
      style={{
        border: "2px solid black",
        borderRadius: "5px",
        margin: "10px",
        backgroundColor: "#e6ebff"
      }}
    >
      <span>Job Title: </span>
      <span>{props.marketInfo.title}</span>
      <br />
      <span>Job description: </span>
      <span>{props.marketInfo.description}</span>
      <br />
    </div>
  );
};

export default Market;
