const categories = {
    "algorithms": ["backtracking", "divide-and-conquer", "dynamic-programming", "greedy", "searching", "sorting"],
    "data-structures": ["arrays", "graphs", "hash-tables", "heaps", "linked-lists", "queues", "stacks", "trees"]
};

const algorithms = {
    "sorting": ["BubbleSort", "QuickSort"],
    "greedy": ["CoinChange"],
    "backtracking": ["NQueens"],
    "searching": ["BFS", "DFS"],
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
    bfs(graph, 0, container);
}

function visualizeDFS() {
    const container = document.getElementById('visualizer');
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
