const categories = {
    "algorithms": ["backtracking", "divide-and-conquer", "dynamic-programming", "greedy", "searching", "sorting"],
    "data-structures": ["arrays", "graphs", "hash-tables", "heaps", "linked-lists", "queues", "stacks", "trees"]
};

const algorithms = {
    "sorting": ["BubbleSort", "QuickSort"],
    "greedy": ["CoinChange"],
    "backtracking": ["NQueens"],
    "searching": ["BFS", "DFS"]
    // Add more mappings as needed
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

    // Fetch and display the Java code
    fetch(`../algorithms/${selectedAlgorithm.toLowerCase()}/${selectedAlgorithm}.java`)
        .then(response => response.text())
        .then(data => {
            codeSampleContainer.textContent = data;
        })
        .catch(err => console.error(err));

    // Visualize the algorithm
    if (selectedAlgorithm === "BubbleSort") {
        visualizeBubbleSort();
    } else if (selectedAlgorithm === "QuickSort") {
        visualizeQuickSort();
    } else if (selectedAlgorithm === "BFS") {
        visualizeBFS();
    } else if (selectedAlgorithm === "DFS") {
        visualizeDFS();
    }
}

function visualizeBubbleSort() {
    const container = document.getElementById('visualizer');
    const array = generateArray(50);
    visualizeArray(array, container);
    bubbleSort(array.slice(), container);
}

function visualizeQuickSort() {
    const container = document.getElementById('visualizer');
    const array = generateArray(50);
    visualizeArray(array, container);
    quickSort(array.slice(), 0, array.length - 1, container);
}

function visualizeBFS() {
    const container = document.getElementById('visualizer');
    const graph = generateBinaryTreeGraph();
    drawBinaryTreeGraph(graph, container);
    bfs(graph, 0, container); // Example starting node
}

function visualizeDFS() {
    const container = document.getElementById('visualizer');
    const graph = generateBinaryTreeGraph();
    drawBinaryTreeGraph(graph, container);
    dfs(graph, 0, container); // Example starting node
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
    array.forEach(value => {
        let bar = document.createElement('div');
        bar.style.height = `${value}%`;
        bar.style.width = `${100 / array.length}%`;
        bar.style.backgroundColor = '#3498db';
        bar.style.display = 'inline-block';
        bar.style.margin = '0 1px';
        container.appendChild(bar);
    });
}

function generateBinaryTreeGraph() {
    // Example function to generate a binary tree graph with 10 nodes
    return {
        0: [1, 2],
        1: [3, 4],
        2: [5, 6],
        3: [7, 8],
        4: [9]
        // Nodes 5, 6, 7, 8, and 9 are leaf nodes with no children
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

    // Draw nodes
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

    // Draw edges
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
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for visualization

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
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
            await new Promise(resolve => setTimeout(resolve, 1000)); // Pause for visualization

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
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
