import React from 'react';
const Market = (props) => {
  return (
    <div className={'market-display'}>
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
