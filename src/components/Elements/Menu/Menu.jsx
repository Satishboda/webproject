import React from "react";
import "./menu.css";

const Menu = (props) => {
  const { onClick } = props;
  return (
    <div className="menuBar" onClick={onClick}>
      <div className="menu"></div>
      <div className="menu"></div>
      <div className="menu"></div>
    </div>
  );
};
export default Menu;
