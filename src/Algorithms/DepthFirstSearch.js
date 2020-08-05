export const depthFirstSearch = (grid, startNode, finishNode) => {
    const visitedNodes = [];
    const nodeStack = [];
    startNode.isVisited = true;
    nodeStack.push(startNode);
    while (!!nodeStack.length) {
        const currentNode = nodeStack.pop();
        visitedNodes.push(currentNode);
        currentNode.isVisited = true;
        if (currentNode === finishNode) return visitedNodes;
        const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
        for (const node of unvisitedNeighbors) {
            if (node.isWall) continue;
            nodeStack.push(node);
        }
    }
    return visitedNodes;
}


const getUnvisitedNeighbors = (grid, node) => {
    const unvisitedNeighbors = updateUnvisitedNeighbors(grid, node)
    for (const neighbor of unvisitedNeighbors) {
        neighbor.previousNode = node;
    }
    return unvisitedNeighbors;
}


const updateUnvisitedNeighbors = (grid, node) => {
    const neighboringNodes = [];
    const { row, col } = node;
    if (col > 0) { neighboringNodes.push(grid[row][col - 1]) };
    if (row > 0) { neighboringNodes.push(grid[row - 1][col]) };
    if (row < grid.length - 1) { neighboringNodes.push(grid[row + 1][col]) };
    if (col < grid[0].length - 1) { neighboringNodes.push(grid[row][col + 1]) };
    return neighboringNodes.filter(neighbor => !neighbor.isVisited);
}

export const pathToFinishNodeDFS = (finishNode) => {
    const nodesInPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInPath;
}