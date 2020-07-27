export const breadthFirstSearch = (grid, startNode, finishNode) => {
    const visitedNodes = [];
    let unvisitedNodes = getNodes(grid);
    startNode.distance = 0;
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const frontNode = unvisitedNodes.shift();
        if (frontNode.isWall) continue;
        frontNode.isVisited = true;
        visitedNodes.push(frontNode);
        if (frontNode === finishNode) return visitedNodes;
        updateUnvisitedNeigbors(grid, frontNode);
    }
}

const getNodes = (grid) => {
    const allNodes = []
    for (const row of grid) {
        for (const node of row) {
            allNodes.push(node);
        }
    }
    return allNodes;
}

const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((firstNode, secondNode) => firstNode.distance - secondNode.distance);
}

const updateUnvisitedNeigbors = (grid, node) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, node)
    for (let neighbor of unvisitedNeighbors) {
        neighbor.distance = 1;
        neighbor.previousNode = node;
    }
}

const getUnvisitedNeighbors = (grid, node) => {
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