export const breadthFirstSearch = (grid, startNode, finishNode) => {
    const visitedNodes = [];
    const nodeQueue = [];
    nodeQueue.push(startNode);
    while (!!nodeQueue.length) {
        const frontNode = nodeQueue.shift();
        if (frontNode.isWall) continue;
        frontNode.isVisited = true;
        visitedNodes.push(frontNode);
        if (frontNode === finishNode) return visitedNodes;
        const unvisitedNeighbors = getUnvisitedNeighbors(grid, frontNode);
        for (const node of unvisitedNeighbors) {
            if (node.marked === false) {
                node.marked = true;
                nodeQueue.push(node);
            }
        }
    }
}

const getUnvisitedNeighbors = (grid, node) => {
    const unvisitedNeighbors = updateUnvisitedNeighbors(grid, node)
    for (let neighbor of unvisitedNeighbors) {
        neighbor.previousNode = node;
    }
    return unvisitedNeighbors
}

const updateUnvisitedNeighbors = (grid, node) => {
    const neighboringNodes = [];
    const { row, col } = node;
    if (row > 0) { neighboringNodes.push(grid[row - 1][col]) };
    if (row < grid.length - 1) { neighboringNodes.push(grid[row + 1][col]) }
    if (col > 0) { neighboringNodes.push(grid[row][col - 1]) };
    if (col < grid[0].length - 1) { neighboringNodes.push(grid[row][col + 1]) };
    return neighboringNodes.filter(neighbor => !neighbor.isVisited);
}

export const pathToFinishNode = (finishNode) => {
    const nodesInPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInPath;
}