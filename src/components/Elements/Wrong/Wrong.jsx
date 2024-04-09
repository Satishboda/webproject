import React from "react";
import "./wrong.css";

const Wrong = (props) => {
  const { onClick } = props;
  return (
    <div className="wrongBar" onClick={onClick}>
      <div className="wrl"></div>
      <div className="wrr"></div>
    </div>
  );
};

export default Wrong;
