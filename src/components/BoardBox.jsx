import React from "react";
import "./BoardBox.css";

const boardBox = ({index,box,handleClick}) => {
  
  return (
    <button className="button" onClick={() => handleClick(index)}>{box[index]}</button>
  );
};

export default boardBox;
