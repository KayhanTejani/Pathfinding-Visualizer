// export const aStarSearch = (grid, startNode, finishNode) => {
//     const openNodes = [];
//     const closedNodes = [];
//     let currentNode = startNode;
//     while (currentNode !== finishNode) {
//         const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
//         for (const neighbor of unvisitedNeighbors) {
//             if (!openNodes.includes(neighbor) && !closedNodes.includes(neighbor)) {
//                 openNodes.push(neighbor);
//                 const { row, col, distance } = neighbor;
//                 const { finishRow, finishCol } = finishNode;
//                 neighbor.heuristic = Math.abs(finishCol - col) + Math.abs(finishRow - row);
//                 const tempFvalue = distance + neighbor.heuristic;
//                 if (neighbor.fValue === Infinity || tempFvalue < neighbor.fValue) {
//                     neighbor.fValue = tempFvalue;
//                     neighbor.previousNode = currentNode;
//                 }
//             }
//         }
//         closedNodes.push(currentNode);
//         sortNodesByFvalue(openNodes);
//         currentNode = openNodes.shift();
//     }
//     return closedNodes;
// }

export const aStarSearch = (grid, startNode, finishNode) => {
    const openNodes = [];
    const closedNodes = [];
    startNode.distance = 0;
    startNode.heuristic = getHeuristic(startNode, finishNode);
    startNode.fValue = startNode.distance + startNode.heuristic;
    openNodes.push(startNode);
    while (!!openNodes.length) {
        sortNodesByFvalue(openNodes);
        const currentNode = openNodes.shift();
        currentNode.isVisited = true;
        closedNodes.push(currentNode);
        if (currentNode === finishNode) return closedNodes;
        if (currentNode.isWall) continue;
        const unvisitedNeighbors = getUnvisitedNeighbors(grid, currentNode);
        for (const neighbor of unvisitedNeighbors) {
            if (neighbor.isWall) continue;
            if (closedNodes.includes(neighbor)) continue;
            neighbor.heuristic = getHeuristic(neighbor, finishNode);
            const tempFvalue = neighbor.distance + neighbor.heuristic;
            if (!openNodes.includes(neighbor)) {
                openNodes.push(neighbor);
            }
            else if (tempFvalue >= neighbor.fValue) continue;
            neighbor.fValue = tempFvalue;
            neighbor.previousNode = currentNode;
        }
    }
    return closedNodes;
}


const sortNodesByFvalue = (openNodes) => {
    openNodes.sort((firstNode, secondNode) => firstNode.fValue - secondNode.fValue);
}

const getHeuristic = (node, finishNode) => {
    const { row, col } = node;
    const heuristic = Math.abs(finishNode.col - col) + Math.abs(finishNode.row - row);
    return heuristic;
}

const getUnvisitedNeighbors = (grid, node) => {
    const unvisitedNeighbors = updateUnvisitedNeighbors(grid, node)
    for (const neighbor of unvisitedNeighbors) {
        neighbor.distance = node.distance + 1;
        // neighbor.previousNode = node;
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

export const shortestPathAStar = (finishNode) => {
    const nodesInPath = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInPath.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInPath;
}