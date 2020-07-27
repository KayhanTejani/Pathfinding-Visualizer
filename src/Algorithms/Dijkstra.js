export function dijkstra(grid, startNode, finishNode) {
    const visitedNodes = [];
    startNode.distance = 0;
    const unvisitedNodes = getNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const nearestNode = unvisitedNodes.shift();
        if (nearestNode.isWall) continue;
        if (nearestNode.distance === Infinity) return visitedNodes;
        nearestNode.isVisted = true;
        visitedNodes.push(nearestNode);
        if (nearestNode === finishNode) return visitedNodes;
        updateUnvisitedNeighbors(grid, nearestNode);
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

const updateUnvisitedNeighbors = (grid, node) => {
    const unvisitedNeighbors = getUnvisitedNeighbors(grid, node);
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
}

const getUnvisitedNeighbors = (grid, node) => {
    const neighboringNodes = [];
    const { row, col } = node;
    if (row > 0) { neighboringNodes.push(grid[row - 1][col]) };
    if (row < grid.length - 1) { neighboringNodes.push(grid[row + 1][col]) };
    if (col > 0) { neighboringNodes.push(grid[row][col - 1]) };
    if (col < grid[0].length - 1) { neighboringNodes.push(grid[row][col + 1]) };
    return neighboringNodes.filter(neighbor => !neighbor.isVisted);
}
