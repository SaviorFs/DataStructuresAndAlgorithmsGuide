const categories = {
    "algorithms": ["backtracking", "divide-and-conquer", "dynamic-programming", "greedy", "searching", "sorting"],
    "data-structures": ["arrays", "graphs", "hash-tables", "heaps", "linked-lists", "queues", "stacks", "trees"]
};

const algorithms = {
    "sorting": ["BubbleSort", "QuickSort"],
    "greedy": ["CoinChange"],
    "backtracking": ["NQueens"],
    "searching": ["BFS", "DFS", "Dijkstra"],
    "arrays": ["Insertion", "Deletion", "Search"]
};

function loadSubCategory() {
    const categorySelect = document.getElementById('category');
    const subCategorySelect = document.getElementById('subCategory');
    const algorithmSelect = document.getElementById('algorithm');
    
    const selectedCategory = categorySelect.value;
    
    subCategorySelect.innerHTML = '<option value="" disabled selected>Select Subcategory</option>';
    algorithmSelect.innerHTML = '<option value="" disabled selected>Select Algorithm/Data Structure</option>';
    
    if (selectedCategory) {
        categories[selectedCategory].forEach(subCategory => {
            let option = document.createElement('option');
            option.value = subCategory;
            option.textContent = subCategory;
            subCategorySelect.appendChild(option);
        });
        
        subCategorySelect.disabled = false;
        algorithmSelect.disabled = true;
    }
}

function loadAlgorithm() {
    const subCategorySelect = document.getElementById('subCategory');
    const algorithmSelect = document.getElementById('algorithm');
    
    const selectedSubCategory = subCategorySelect.value;
    
    algorithmSelect.innerHTML = '<option value="" disabled selected>Select Algorithm/Data Structure</option>';
    
    if (selectedSubCategory && algorithms[selectedSubCategory]) {
        algorithms[selectedSubCategory].forEach(algo => {
            let option = document.createElement('option');
            option.value = algo;
            option.textContent = algo;
            algorithmSelect.appendChild(option);
        });
        
        algorithmSelect.disabled = false;
    }
}

function loadVisualization() {
    const algorithmSelect = document.getElementById('algorithm');
    const selectedAlgorithm = algorithmSelect.value;

    const visualizerContainer = document.getElementById('visualizer');
    const codeSampleContainer = document.getElementById('codeSample');

    visualizerContainer.innerHTML = '';
    codeSampleContainer.textContent = '';

    let filePath;
    if (["Insertion", "Deletion", "Search"].includes(selectedAlgorithm)) {
        filePath = `./data-structures/arrays/${selectedAlgorithm}.java`;
    } else if (["BFS", "DFS", "Dijkstra"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/searching/${selectedAlgorithm}.java`;
    } else if (["BubbleSort", "QuickSort"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/sorting/${selectedAlgorithm}.java`;
    } else if (["CoinChange"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/greedy/${selectedAlgorithm}.java`;
    } else if (["NQueens"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/backtracking/${selectedAlgorithm}.java`;
    } else {
        filePath = `./algorithms/${selectedAlgorithm.toLowerCase()}/${selectedAlgorithm}.java`;
    }

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            codeSampleContainer.textContent = data;
        })
        .catch(err => {
            console.error('Failed to fetch Java code:', err);
            codeSampleContainer.textContent = 'Error: Could not load the Java code.';
        });

    if (selectedAlgorithm === "BubbleSort") {
        visualizeBubbleSort();
    } else if (selectedAlgorithm === "QuickSort") {
        visualizeQuickSort();
    } else if (selectedAlgorithm === "BFS") {
        visualizeBFS();
    } else if (selectedAlgorithm === "DFS") {
        visualizeDFS();
    } else if (selectedAlgorithm === "Insertion") {
        visualizeInsertion();
    } else if (selectedAlgorithm === "Deletion") {
        visualizeDeletion();
    } else if (selectedAlgorithm === "Search") {
        visualizeSearch();
    } else if (selectedAlgorithm === "Dijkstra") {
        visualizeDijkstra();
    } else if (selectedAlgorithm === "NQueens") {
        visualizeNQueens();
    } else if (selectedAlgorithm === "CoinChange") {
        visualizeCoinChange();
    }
    
}


function visualizeNQueens() {
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

function visualizeBubbleSort() {
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

function visualizeQuickSort() {
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

function visualizeBFS() {
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

function visualizeDFS() {
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

function visualizeInsertion() {
    const container = document.getElementById('visualizer');
    const array = generateArray(10);
    visualizeArray(array, container);
    animateInsertion(array, container, 42, 4);
}

function visualizeDeletion() {
    const container = document.getElementById('visualizer');
    const array = generateArray(10);
    visualizeArray(array, container);
    animateDeletion(array, container, 4);
}

function visualizeSearch() {
    const container = document.getElementById('visualizer');
    const array = generateArray(10);
    visualizeArray(array, container);
    animateSearch(array, container, array[4]);
}

function visualizeDijkstra() {
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

function generateArray(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    return array;
}

function visualizeArray(array, container) {
    container.innerHTML = '';
    array.forEach((value, index) => {
        let numberElement = document.createElement('div');
        numberElement.textContent = value !== undefined ? value : "";
        numberElement.style.display = 'inline-block';
        numberElement.style.margin = '0 10px';
        numberElement.style.padding = '10px';
        numberElement.style.backgroundColor = '#3498db';
        numberElement.style.color = '#fff';
        numberElement.style.borderRadius = '5px';
        numberElement.style.fontSize = '20px';
        numberElement.style.textAlign = 'center';
        numberElement.style.width = '40px';
        numberElement.style.transition = 'background-color 0.5s, opacity 0.5s';
        container.appendChild(numberElement);
    });
}

async function animateInsertion(array, container, value, index) {
    visualizeArray(array, container);
    let elements = container.childNodes;
    let newElement = document.createElement('div');
    newElement.textContent = value;
    newElement.style.display = 'inline-block';
    newElement.style.margin = '0 10px';
    newElement.style.padding = '10px';
    newElement.style.backgroundColor = '#2ecc71';
    newElement.style.color = '#fff';
    newElement.style.borderRadius = '5px';
    newElement.style.fontSize = '20px';
    newElement.style.textAlign = 'center';
    newElement.style.width = '40px';
    newElement.style.opacity = '0';
    newElement.style.transition = 'opacity 0.5s';
    
    if (index >= elements.length) {
        container.appendChild(newElement);
    } else {
        container.insertBefore(newElement, elements[index]);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    newElement.style.opacity = '1';
    await new Promise(resolve => setTimeout(resolve, 500));
}

async function animateDeletion(array, container, index) {
    visualizeArray(array, container);
    let elements = container.childNodes;
    elements[index].style.opacity = '0';
    await new Promise(resolve => setTimeout(resolve, 500));
    array.splice(index, 1);
    visualizeArray(array, container);
}

async function animateSearch(array, container, value) {
    for (let i = 0; i < array.length; i++) {
        let elements = container.childNodes;
        elements[i].style.backgroundColor = '#f39c12';
        await new Promise(resolve => setTimeout(resolve, 500));
        if (array[i] === value) {
            elements[i].style.backgroundColor = '#e74c3c';
            await new Promise(resolve => setTimeout(resolve, 500));
            break;
        } else {
            elements[i].style.backgroundColor = '#3498db';
        }
    }
}

function highlightArrayElement(container, index, color = '#e74c3c') {
    const elements = container.childNodes;
    elements[index].style.backgroundColor = color;
}

function generateBinaryTreeGraph() {
    return {
        0: [1, 2],
        1: [3, 4],
        2: [5, 6],
        3: [7, 8],
        4: [9],
        5: [],
        6: [],
        7: [],
        8: [],
        9: []
    };
}

function drawBinaryTreeGraph(graph, container) {
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const positions = {
        0: { x: 300, y: 50 },
        1: { x: 150, y: 150 },
        2: { x: 450, y: 150 },
        3: { x: 75, y: 250 },
        4: { x: 225, y: 250 },
        5: { x: 375, y: 250 },
        6: { x: 525, y: 250 },
        7: { x: 50, y: 350 },
        8: { x: 100, y: 350 },
        9: { x: 200, y: 350 }
    };

    for (const node in positions) {
        const pos = positions[node];
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#3498db';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node, pos.x, pos.y);
    }

    for (const node in graph) {
        const edges = graph[node];
        const fromPos = positions[node];
        edges.forEach(edge => {
            const toPos = positions[edge];
            ctx.beginPath();
            ctx.moveTo(fromPos.x, fromPos.y);
            ctx.lineTo(toPos.x, toPos.y);
            ctx.stroke();
        });
    }
}

async function bfs(graph, start, container) {
    let visited = new Set();
    let queue = [start];

    while (queue.length > 0) {
        let node = queue.shift();
        if (!visited.has(node)) {
            visited.add(node);
            highlightNode(node, container);
            await new Promise(resolve => setTimeout(resolve, 1000));

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    for (let node in graph) {
        if (!visited.has(parseInt(node))) {
            queue.push(parseInt(node));
        }
    }

    while (queue.length > 0) {
        let node = queue.shift();
        if (!visited.has(node)) {
            visited.add(node);
            highlightNode(node, container);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

async function dfs(graph, start, container) {
    let visited = new Set();
    let stack = [start];

    while (stack.length > 0) {
        let node = stack.pop();
        if (!visited.has(node)) {
            visited.add(node);
            highlightNode(node, container);
            await new Promise(resolve => setTimeout(resolve, 1000));

            for (let neighbor of graph[node].reverse()) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }

    for (let node in graph) {
        if (!visited.has(parseInt(node))) {
            stack.push(parseInt(node));
        }
    }

    while (stack.length > 0) {
        let node = stack.pop();
        if (!visited.has(node)) {
            visited.add(node);
            highlightNode(node, container);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

function highlightNode(node, container) {
    const canvas = container.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const positions = {
        0: { x: 300, y: 50 },
        1: { x: 150, y: 150 },
        2: { x: 450, y: 150 },
        3: { x: 75, y: 250 },
        4: { x: 225, y: 250 },
        5: { x: 375, y: 250 },
        6: { x: 525, y: 250 },
        7: { x: 50, y: 350 },
        8: { x: 100, y: 350 },
        9: { x: 200, y: 350 }
    };

    const pos = positions[node];
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#e74c3c';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(node, pos.x, pos.y);
}

async function bubbleSort(array, container) {
    let n = array.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                visualizeArray(array, container);
                await new Promise(resolve => setTimeout(resolve, 100));
            }
        }
    }
    visualizeArray(array, container); // Final state
}

async function quickSort(array, low, high, container) {
    if (low < high) {
        let pi = await partition(array, low, high, container);
        await quickSort(array, low, pi - 1, container);
        await quickSort(array, pi + 1, high, container);
    }
    if (low === 0 && high === array.length - 1) {
        visualizeArray(array, container); // Final state
    }
}

async function partition(array, low, high, container) {
    let pivot = array[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            visualizeArray(array, container);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    visualizeArray(array, container);
    await new Promise(resolve => setTimeout(resolve, 100));
    return i + 1;
}

async function dijkstra(graph, start, container) {
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
    
    const canvas = container.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    let dist = Array(graph.nodes.length).fill(Infinity);
    dist[start] = 0;

    let visited = new Set();
    let pq = [{ id: start, dist: 0 }];

    while (pq.length > 0) {
        pq.sort((a, b) => a.dist - b.dist);
        let { id: u } = pq.shift();
        visited.add(u);

        const uPos = positions[u];
        ctx.beginPath();
        ctx.arc(uPos.x, uPos.y, 15, 0, 2 * Math.PI);
        ctx.fillStyle = '#e74c3c';
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.fillText(u, uPos.x, uPos.y);

        for (let { dest: v, weight } of graph.nodes[u].edges) {
            if (!visited.has(v) && dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({ id: v, dist: dist[v] });

                // Highlight edge
                const vPos = positions[v];
                ctx.beginPath();
                ctx.moveTo(uPos.x, uPos.y);
                ctx.lineTo(vPos.x, vPos.y);
                ctx.strokeStyle = '#e74c3c';
                ctx.stroke();
                ctx.fillStyle = '#000';
                ctx.fillText(weight, (uPos.x + vPos.x) / 2, (uPos.y + vPos.y) / 2);
                ctx.strokeStyle = '#000'; // Reset to default
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
function visualizeCoinChange() {
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
        coinAnimation.style.opacity = '0';
        coinAnimation.style.transition = 'opacity 0.5s, transform 0.5s';
        coinAnimation.style.transform = 'translateY(-20px)';

        container.appendChild(coinAnimation);

        await new Promise(resolve => setTimeout(() => {
            coinAnimation.style.opacity = '1';
            coinAnimation.style.transform = 'translateY(0)';
            resolve();
        }, 500 * i));

        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const selectElement = document.getElementById("algorithm");
    if (selectElement) {
        selectElement.addEventListener("change", loadVisualization);
    }
});
