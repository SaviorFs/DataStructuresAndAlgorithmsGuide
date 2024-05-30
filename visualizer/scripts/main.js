const categories = {
    "algorithms": ["backtracking", "divide-and-conquer", "dynamic-programming", "greedy", "searching", "sorting"],
    "data-structures": ["arrays", "graphs", "hash-tables", "heaps", "linked-lists", "queues", "stacks", "trees"]
};

const algorithms = {
    "sorting": ["BubbleSort", "QuickSort"],
    "greedy": ["CoinChange"],
    "backtracking": ["NQueens"]
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
    fetch(`../algorithms/sorting/${selectedAlgorithm}.java`)
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
}

async function quickSort(array, low, high, container) {
    if (low < high) {
        let pi = await partition(array, low, high, container);
        await quickSort(array, low, pi - 1, container);
        await quickSort(array, pi + 1, high, container);
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
