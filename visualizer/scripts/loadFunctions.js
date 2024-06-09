import { categories, algorithms } from './categories.js';
import { 
    visualizeBubbleSort, visualizeQuickSort, visualizeBFS, visualizeDFS, 
    visualizeInsertion, visualizeDeletion, visualizeSearch, visualizeDijkstra, 
    visualizeNQueens, visualizeCoinChange, visualizeHashMapInsert 
} from './visualizations.js';

export function loadSubCategory() {
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

export function loadAlgorithm() {
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

export function loadVisualization() {
    const algorithmSelect = document.getElementById('algorithm');
    const selectedAlgorithm = algorithmSelect.value;

    const visualizerContainer = document.getElementById('visualizer');
    const codeSampleContainer = document.getElementById('codeSample');

    visualizerContainer.innerHTML = '';
    codeSampleContainer.textContent = '';

    let filePath;
    if (["Array Insertion", "Array Deletion", "Array Search"].includes(selectedAlgorithm)) {
        filePath = `./data-structures/arrays/${selectedAlgorithm.split(" ")[1]}.java`;
    } else if (["BFS", "DFS", "Dijkstra"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/searching/${selectedAlgorithm}.java`;
    } else if (["BubbleSort", "QuickSort"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/sorting/${selectedAlgorithm}.java`;
    } else if (["CoinChange"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/greedy/${selectedAlgorithm}.java`;
    } else if (["NQueens"].includes(selectedAlgorithm)) {
        filePath = `./algorithms/backtracking/${selectedAlgorithm}.java`;
    } else if (["HashMap Insert", "HashMap Delete", "HashMap Search"].includes(selectedAlgorithm)) {
        filePath = `./data-structures/hash-tables/HashMap${selectedAlgorithm.split(" ")[1]}.java`;
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
    } else if (selectedAlgorithm === "Array Insertion") {
        visualizeInsertion();
    } else if (selectedAlgorithm === "Array Deletion") {
        visualizeDeletion();
    } else if (selectedAlgorithm === "Array Search") {
        visualizeSearch();
    } else if (selectedAlgorithm === "Dijkstra") {
        visualizeDijkstra();
    } else if (selectedAlgorithm === "NQueens") {
        visualizeNQueens();
    } else if (selectedAlgorithm === "CoinChange") {
        visualizeCoinChange();
    } else if (selectedAlgorithm === "HashMap Insert") {
        visualizeHashMapInsert();
    }
}
