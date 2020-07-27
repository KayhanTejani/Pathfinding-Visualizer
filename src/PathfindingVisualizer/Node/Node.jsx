import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp, onClick } = this.props;
    const nodeClass = isFinish ? "node-finish" : isStart ? "node-start" : isWall ? "node-wall" : "";
    return (
      <div
        className={`node ${nodeClass}`}
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
        onClick={() => onClick(row, col)}
      ></div>
    );
  }
}
