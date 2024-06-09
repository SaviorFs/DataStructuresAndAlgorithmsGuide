import { loadSubCategory, loadAlgorithm, loadVisualization } from './loadFunctions.js';

document.getElementById('category').addEventListener('change', loadSubCategory);
document.getElementById('subCategory').addEventListener('change', loadAlgorithm);
document.getElementById('algorithm').addEventListener('change', loadVisualization);
