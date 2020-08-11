import React, { Component } from "react";
import Node from "./Node/Node";

import "./PathfindingVisualizer.css";
import { dijkstra, shortestPath } from "../Algorithms/Dijkstra";
import { breadthFirstSearch, pathToFinishNode } from "../Algorithms/BreadthFirstSearch";
import { depthFirstSearch, pathToFinishNodeDFS } from "../Algorithms/DepthFirstSearch";
import { aStarSearch, shortestPathAStar } from "../Algorithms/AStarSearch";

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
    const shortestPathNodesOrder = shortestPath(finishNode);
    this.dijkstraAnimation(visitedNodesInOrder, shortestPathNodesOrder);
  }

  dijkstraAnimation(visitedNodesInOrder, shortestPathNodesOrder) {
    for (let nodeIndex = 0; nodeIndex <= visitedNodesInOrder.length; nodeIndex++) {
      if (nodeIndex === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.dijkstraShortestPathAnimation(shortestPathNodesOrder);
        }, 10 * nodeIndex);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[nodeIndex];
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited';
      }, 10 * nodeIndex);
    }
  }

  dijkstraShortestPathAnimation(shortestPathNodesOrder) {
    for (let nodeIndex = 0; nodeIndex < shortestPathNodesOrder.length; nodeIndex++) {
      setTimeout(() => {
        const node = shortestPathNodesOrder[nodeIndex];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
      }, 50 * nodeIndex);
    }
  }

  breadthFirstSearchVisualization() {
    const { grid, startNode, finishNode } = this.state;
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, finishNode);
    const pathToFinishOrder = pathToFinishNode(finishNode);
    this.breadthFirstSearchAnimation(visitedNodesInOrder, pathToFinishOrder);
  }

  breadthFirstSearchAnimation(visitedNodesInOrder, pathToFinishOrder) {
    for (let nodeIndex = 0; nodeIndex <= visitedNodesInOrder.length; nodeIndex++) {
      if (nodeIndex === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.breadthFirstSearchPathAnimation(pathToFinishOrder)
        }, 10 * nodeIndex);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[nodeIndex];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
      }, 10 * nodeIndex);
    }
  }

  breadthFirstSearchPathAnimation(pathToFinishOrder) {
    for (let nodeIndex = 0; nodeIndex < pathToFinishOrder.length; nodeIndex++) {
      setTimeout(() => {
        const node = pathToFinishOrder[nodeIndex];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
      }, 50 * nodeIndex);
    }
  }

  depthFirstSearchVisualization() {
    const { grid, startNode, finishNode } = this.state;
    const visitedNodesInOrder = depthFirstSearch(grid, startNode, finishNode);
    console.log(typeof visitedNodesInOrder);
    const pathToFinishOrder = pathToFinishNodeDFS(finishNode);
    this.depthFirstSearchAnimation(visitedNodesInOrder, pathToFinishOrder);
  }

  depthFirstSearchAnimation(visitedNodesInOrder, pathToFinishOrder) {
    for (let nodeIndex = 0; nodeIndex <= visitedNodesInOrder.length; nodeIndex++) {
      if (nodeIndex === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.depthFirstSearchPathAnimation(pathToFinishOrder)
        }, 10 * nodeIndex);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[nodeIndex];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
      }, 10 * nodeIndex);
    }
  }

  depthFirstSearchPathAnimation(pathToFinishOrder) {
    for (let nodeIndex = 0; nodeIndex < pathToFinishOrder.length; nodeIndex++) {
      setTimeout(() => {
        const node = pathToFinishOrder[nodeIndex];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
      }, 50 * nodeIndex);
    }
  }

  aStarSearchVisualization() {
    const { grid, startNode, finishNode } = this.state;
    const visitedNodesInOrder = aStarSearch(grid, startNode, finishNode);
    const pathToFinishNode = shortestPathAStar(finishNode);
    this.aStarSearchAnimation(visitedNodesInOrder, pathToFinishNode);
    // this.aStarSearchPathAnimation(pathToFinishNode);
  }

  aStarSearchAnimation(visitedNodesInOrder, pathToFinishNode) {
    for (let nodeIndex = 0; nodeIndex <= visitedNodesInOrder.length; nodeIndex++) {
      if (nodeIndex === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.aStarSearchPathAnimation(pathToFinishNode)
        }, 10 * nodeIndex);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[nodeIndex];
        console.log(node);
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-visited";
      }, 10 * nodeIndex);
    }
  }

  aStarSearchPathAnimation(pathToFinishNode) {
    for (let nodeIndex = 0; nodeIndex < pathToFinishNode.length; nodeIndex++) {
      setTimeout(() => {
        const node = pathToFinishNode[nodeIndex];
        document.getElementById(`node-${node.row}-${node.col}`).className = "node node-shortest-path";
      }, 50 * nodeIndex);
    }
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
          Visualize Dijkstra's Algorithm
        </button>
        <button onClick={() => this.breadthFirstSearchVisualization()}>
          Visualize Breadth First Search
        </button>
        <button onClick={() => this.depthFirstSearchVisualization()}>
          Visualize Depth First Search
        </button>
        <button onClick={() => this.aStarSearchVisualization()}>
          Visualize A* Search
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
    heuristic: Infinity,
    fValue: Infinity,
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
