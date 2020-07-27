import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";
import { dijkstra } from "../Algorithms/Dijkstra";

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      isMousePressed: false,
      startNodeExists: false,
      finishNodeExists: false,
      startNode: {},
      finishNode: {}
    };
  }

  dijkstraVisualization() {
    const { grid, startNode, finishNode } = this.state;
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
  }

  dijkstraAnimation() {

  }

  componentDidMount() {
    const newGrid = createGrid();
    this.setState({ grid: newGrid });
  }

  mouseDownHandler(row, col) {
    if (this.state.startNodeExists && this.state.finishNodeExists) {
      const newGrid = toggleWallOnGrid(this.state.grid, row, col);
      this.setState({ grid: newGrid, isMousePressed: true });
    }
  }

  mouseEnterHandler(row, col) {
    if (this.state.isMousePressed === false) return;
    const newGrid = toggleWallOnGrid(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  mouseUpHandler() {
    this.setState({ isMousePressed: false });
  }

  mouseClickHandler(row, col) {
    const newGrid = this.toggleNode(row, col);
    this.setState({ grid: newGrid });
  }

  toggleNode(row, col) {
    const newGrid = this.state.grid.slice();
    const node = newGrid[row][col];
    if (!this.state.startNodeExists || node.isStart) {
      this.setState({ startNodeExists: !this.state.startNodeExists });
      const newNode = {
        ...node,
        isStart: !node.isStart
      };
      this.setState({ startNode: newNode })
      newGrid[row][col] = newNode;
    }
    else if (!this.state.finishNodeExists || node.isFinish) {
      this.setState({ finishNodeExists: !this.state.finishNodeExists });
      const newNode = {
        ...node,
        isFinish: !node.isFinish
      };
      this.setState({ finishNode: newNode })
      newGrid[row][col] = newNode;
    }
    return newGrid;
  }

  render() {
    const { grid, isMousePressed } = this.state;
    return (
      <>
        <button onClick={() => this.dijkstraVisualization()}>
          Visualize Dijstra's Algorithm
        </button>
        <div className="grid">
          {grid.map((row, rowIndex) => {
            return (
              <div key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      isMousePressed={isMousePressed}
                      onMouseDown={(row, col) => this.mouseDownHandler(row, col)}
                      onMouseEnter={(row, col) => this.mouseEnterHandler(row, col)}
                      onMouseUp={() => this.mouseUpHandler()}
                      onClick={(row, col) => this.mouseClickHandler(row, col)}
                    ></Node>
                  );
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

const createGrid = () => {
  const grid = [];
  for (let rowNum = 0; rowNum < 20; rowNum++) {
    const row = [];
    for (let colNum = 0; colNum < 50; colNum++) {
      row.push(createNode(rowNum, colNum));
    }
    grid.push(row);
  }
  return grid;
}

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: false,
    isFinish: false,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  }
}

const toggleWallOnGrid = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall
  };
  newGrid[row][col] = newNode;
  return newGrid;
}
