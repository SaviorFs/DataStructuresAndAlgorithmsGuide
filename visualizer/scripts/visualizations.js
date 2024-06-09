import { generateArray, visualizeArray, generateBinaryTreeGraph, drawBinaryTreeGraph, bfs, dfs, bubbleSort, quickSort, dijkstra, animateInsertion, animateDeletion, animateSearch } from './helpers.js';

export function visualizeBubbleSort() {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';

    const array = generateArray(50);
    visualizeArray(array, container);

    const exampleContainer = document.createElement('div');
    exampleContainer.className = 'example-container';
    exampleContainer.id = 'example-container';
    visualizeArray(array, exampleContainer);
    container.appendChild(exampleContainer);

    startBubbleSortVisualization();
}

function startBubbleSortVisualization() {
    const container = document.getElementById('visualizer');
    const exampleContainer = document.getElementById('example-container');
    exampleContainer.remove();

    const array = generateArray(50);
    visualizeArray(array, container);
    bubbleSort(array.slice(), container);
}

export function visualizeQuickSort() {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';

    const array = generateArray(50);
    visualizeArray(array, container);

    const exampleContainer = document.createElement('div');
    exampleContainer.className = 'example-container';
    exampleContainer.id = 'example-container';
    visualizeArray(array, exampleContainer);
    container.appendChild(exampleContainer);

    startQuickSortVisualization();
}

function startQuickSortVisualization() {
    const container = document.getElementById('visualizer');
    const exampleContainer = document.getElementById('example-container');
    exampleContainer.remove();

    const array = generateArray(50);
    visualizeArray(array, container);
    quickSort(array.slice(), 0, array.length - 1, container);
}

export function visualizeBFS() {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';

    const graph = generateBinaryTreeGraph();
    const exampleContainer = document.createElement('div');
    exampleContainer.className = 'example-container';
    exampleContainer.id = 'example-container';
    drawBinaryTreeGraph(graph, exampleContainer);
    container.appendChild(exampleContainer);

    startBFSVisualization();
}

function startBFSVisualization() {
    const container = document.getElementById('visualizer');
    const exampleContainer = document.getElementById('example-container');
    exampleContainer.remove();

    const graph = generateBinaryTreeGraph();
    drawBinaryTreeGraph(graph, container);
    bfs(graph, 0, container);
}

export function visualizeDFS() {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';

    const graph = generateBinaryTreeGraph();
    const exampleContainer = document.createElement('div');
    exampleContainer.className = 'example-container';
    exampleContainer.id = 'example-container';
    drawBinaryTreeGraph(graph, exampleContainer);
    container.appendChild(exampleContainer);

    startDFSVisualization();
}

function startDFSVisualization() {
    const container = document.getElementById('visualizer');
    const exampleContainer = document.getElementById('example-container');
    exampleContainer.remove();

    const graph = generateBinaryTreeGraph();
    drawBinaryTreeGraph(graph, container);
    dfs(graph, 0, container);
}

export function visualizeInsertion() {
    const container = document.getElementById('visualizer');
    const array = generateArray(10);
    visualizeArray(array, container);
    animateInsertion(array, container, 42, 4);
}

export function visualizeDeletion() {
    const container = document.getElementById('visualizer');
    const array = generateArray(10);
    visualizeArray(array, container);
    animateDeletion(array, container, 4);
}

export function visualizeSearch() {
    const container = document.getElementById('visualizer');
    const array = generateArray(10);
    visualizeArray(array, container);
    animateSearch(array, container, array[4]);
}

export function visualizeDijkstra() {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';

    const graph = generateComplexGraph();
    const exampleContainer = document.createElement('div');
    exampleContainer.className = 'example-container';
    exampleContainer.id = 'example-container';
    drawComplexGraph(graph, exampleContainer);
    container.appendChild(exampleContainer);

    startDijkstraVisualization();
}

function startDijkstraVisualization() {
    const container = document.getElementById('visualizer');
    const exampleContainer = document.getElementById('example-container');
    exampleContainer.remove();

    const graph = generateComplexGraph();
    drawComplexGraph(graph, container);
    dijkstra(graph, 0, container); // Example starting node
}

function generateComplexGraph() {
    return {
        nodes: [
            { id: 0, edges: [{ dest: 1, weight: 2 }, { dest: 2, weight: 4 }, { dest: 5, weight: 10 }] },
            { id: 1, edges: [{ dest: 2, weight: 1 }, { dest: 3, weight: 7 }, { dest: 4, weight: 3 }] },
            { id: 2, edges: [{ dest: 3, weight: 2 }, { dest: 6, weight: 8 }] },
            { id: 3, edges: [{ dest: 4, weight: 1 }, { dest: 7, weight: 6 }] },
            { id: 4, edges: [{ dest: 5, weight: 5 }, { dest: 8, weight: 2 }] },
            { id: 5, edges: [{ dest: 9, weight: 3 }] },
            { id: 6, edges: [{ dest: 7, weight: 3 }] },
            { id: 7, edges: [{ dest: 8, weight: 1 }] },
            { id: 8, edges: [{ dest: 9, weight: 2 }] },
            { id: 9, edges: [] }
        ]
    };
}

function drawComplexGraph(graph, container) {
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const positions = {
        0: { x: 300, y: 50 },
        1: { x: 450, y: 100 },
        2: { x: 500, y: 200 },
        3: { x: 450, y: 300 },
        4: { x: 300, y: 350 },
        5: { x: 150, y: 300 },
        6: { x: 100, y: 200 },
        7: { x: 150, y: 100 },
        8: { x: 250, y: 150 },
        9: { x: 350, y: 150 }
    };

    graph.nodes.forEach(node => {
        const pos = positions[node.id];
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = '#3498db';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, pos.x, pos.y);
    });

    graph.nodes.forEach(node => {
        const fromPos = positions[node.id];
        node.edges.forEach(edge => {
            const toPos = positions[edge.dest];
            ctx.beginPath();
            ctx.moveTo(fromPos.x, fromPos.y);
            ctx.lineTo(toPos.x, toPos.y);
            ctx.stroke();
            ctx.fillStyle = '#000';
            ctx.fillText(edge.weight, (fromPos.x + toPos.x) / 2, (fromPos.y + toPos.y) / 2);
        });
    });
}

export function visualizeNQueens() {
    const container = document.getElementById('visualizer');
    container.innerHTML = ''; // Clear previous visualization

    const n = 8; // Change this value for different board sizes
    const solutions = solveNQueens(n);

    // Display only one solution
    const solution = solutions[0];
    const boardContainer = document.createElement('div');
    boardContainer.className = 'solution-container';
    boardContainer.id = 'solution-container';

    solution.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        row.split('').forEach(cell => {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.textContent = cell;
            rowDiv.appendChild(cellDiv);
        });
        boardContainer.appendChild(rowDiv);
    });

    container.appendChild(boardContainer);

    // Solve the N-Queens problem with visualization
    startVisualization();
}

function startVisualization() {
    const container = document.getElementById('visualizer');
    container.innerHTML = ''; // Clear the solution

    const n = 8; // Change this value for different board sizes
    const queens = Array(n).fill(-1); // queens[i] represents the column position of the queen in the i-th row

    // Create an empty board
    const boardContainer = document.createElement('div');
    boardContainer.className = 'board-container';
    for (let i = 0; i < n; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';
        for (let j = 0; j < n; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.className = 'cell';
            cellDiv.id = `cell-${i}-${j}`;
            rowDiv.appendChild(cellDiv);
        }
        boardContainer.appendChild(rowDiv);
    }
    container.appendChild(boardContainer);

    // Solve the N-Queens problem with visualization
    solveNQueensWithVisualization(0, queens, n, container);
}

async function solveNQueensWithVisualization(row, queens, n, container) {
    if (row === n) {
        // Highlight the final solution
        for (let i = 0; i < n; i++) {
            const col = queens[i];
            highlightCell(i, col, container, '#2ecc71', 'Q');
        }
        return true;
    } else {
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col, queens)) {
                queens[row] = col; // Place queen at (row, col)
                highlightCell(row, col, container, '#3498db', '?'); // Highlight the cell

                await new Promise(resolve => setTimeout(resolve, 500)); // Pause for visualization

                if (await solveNQueensWithVisualization(row + 1, queens, n, container)) {
                    return true;
                }

                // Backtrack: remove queen from (row, col)
                highlightCell(row, col, container, '#e74c3c', 'NQ'); // Highlight the cell for backtracking
                await new Promise(resolve => setTimeout(resolve, 500)); // Pause for visualization
                queens[row] = -1;
                highlightCell(row, col, container, '', ''); // Clear the cell highlight
            }
        }
        return false;
    }
}

function highlightCell(row, col, container, color, text) {
    const cell = container.querySelector(`#cell-${row}-${col}`);
    cell.style.backgroundColor = color;
    cell.textContent = text;
}

function isSafe(row, col, queens) {
    for (let i = 0; i < row; i++) {
        const qCol = queens[i];
        if (qCol === col || Math.abs(qCol - col) === Math.abs(i - row)) {
            return false; // Column conflict or diagonal conflict
        }
    }
    return true;
}

function solveNQueens(n) {
    const solutions = [];
    const queens = Array(n).fill(-1); // queens[i] represents the column position of the queen in the i-th row
    solve(0, queens, n, solutions);
    return solutions;
}

function solve(row, queens, n, solutions) {
    if (row === n) {
        solutions.push(createBoard(queens, n));
    } else {
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col, queens)) {
                queens[row] = col; // Place queen at (row, col)
                solve(row + 1, queens, n, solutions);
                queens[row] = -1; // Backtrack: remove queen from (row, col)
            }
        }
    }
}

function createBoard(queens, n) {
    const board = [];
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < n; j++) {
            row += (queens[i] === j) ? 'Q' : '.';
        }
        board.push(row);
    }
    return board;
}

export function visualizeCoinChange() {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';

    const problemDescription = document.createElement('div');
    problemDescription.className = 'problem-description';
    problemDescription.innerHTML = `
        <h3>Coin Change Problem</h3>
        <p>Given an array of coin denominations and an amount, find the minimum number of coins required to make the amount. If it's not possible to make the amount with the given coins, return -1.</p>
        <p><strong>Example:</strong></p>
        <p>Coins: [1, 5, 10, 25]</p>
        <p>Amount: 63</p>
    `;
    container.appendChild(problemDescription);

    const coins = [1, 5, 10, 25];
    const amount = 63;

    visualizeMinCoins(coins, amount, container);
}

async function visualizeMinCoins(coins, amount, container) {
    let remainingAmount = amount;
    let coinCounts = {};

    coins.sort((a, b) => b - a);

    const stepsContainer = document.createElement('div');
    stepsContainer.className = 'steps-container';
    container.appendChild(stepsContainer);

    for (let coin of coins) {
        if (remainingAmount >= coin) {
            let numCoins = Math.floor(remainingAmount / coin);
            remainingAmount -= numCoins * coin;
            coinCounts[coin] = numCoins;

            await visualizeStep(coin, numCoins, stepsContainer);
        } else {
            coinCounts[coin] = 0;
        }
    }

    if (remainingAmount !== 0) {
        const resultText = document.createElement('div');
        resultText.textContent = "It's not possible to give change for the amount with the given coins.";
        resultText.style.marginTop = '20px';
        resultText.style.fontSize = '18px';
        resultText.style.fontWeight = 'bold';
        container.appendChild(resultText);
    }
}

async function visualizeStep(coin, numCoins, container) {
    for (let i = 0; i < numCoins; i++) {
        const coinAnimation = document.createElement('div');
        coinAnimation.className = 'coin-animation';
        coinAnimation.textContent = coin;
        coinAnimation.style.display = 'inline-block';
        coinAnimation.style.margin = '5px';
        coinAnimation.style.padding = '10px';
        coinAnimation.style.backgroundColor = '#f1c40f';
        coinAnimation.style.color = '#fff';
        coinAnimation.style.borderRadius = '50%';
        coinAnimation.style.fontSize = '16px';
        coinAnimation.style.textAlign = 'center';
        container.appendChild(coinAnimation);

        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

export function visualizeHashMapInsert() {
    const container = document.getElementById('visualizer');
    container.innerHTML = '';

    const table = document.createElement('div');
    table.className = 'hashmap-table';
    container.appendChild(table);

    // Create the header row
    const headerRow = document.createElement('div');
    headerRow.className = 'row';
    
    const keyHeader = document.createElement('div');
    keyHeader.className = 'cell header';
    keyHeader.textContent = 'Key';

    const valueHeader = document.createElement('div');
    valueHeader.className = 'cell header';
    valueHeader.textContent = 'Value';

    headerRow.appendChild(keyHeader);
    headerRow.appendChild(valueHeader);
    table.appendChild(headerRow);

    const hashMap = {};
    const pairs = [
        { key: 'One', value: 1 },
        { key: 'Two', value: 2 },
        { key: 'Three', value: 3 },
        { key: 'Four', value: 4 },
        { key: 'Five', value: 5 }
    ];

    pairs.forEach((pair, index) => {
        setTimeout(() => insertIntoHashMap(hashMap, pair.key, pair.value, table), index * 1000);
    });
}

function insertIntoHashMap(hashMap, key, value, table) {
    hashMap[key] = value;

    const row = document.createElement('div');
    row.className = 'row';

    const keyCell = document.createElement('div');
    keyCell.className = 'cell';
    keyCell.textContent = key;

    const valueCell = document.createElement('div');
    valueCell.className = 'cell';
    valueCell.textContent = value;

    row.appendChild(keyCell);
    row.appendChild(valueCell);
    table.appendChild(row);
}

// Helper CSS to style the visualization
const style = document.createElement('style');
style.innerHTML = `
    .hashmap-table {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
        width: 50%;
        margin: 20px auto;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .row {
        display: contents;
    }

    .cell {
        padding: 10px;
        border: 1px solid #ddd;
        text-align: center;
        background-color: #f4f4f4;
        transition: background-color 0.5s;
    }

    .header {
        font-weight: bold;
        background-color: #3498db;
        color: white;
    }
`;
document.head.appendChild(style);
