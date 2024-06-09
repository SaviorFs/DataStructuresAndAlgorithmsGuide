import { loadSubCategory, loadAlgorithm } from './loadFunctions.js';
import { loadVisualization } from './visualizations.js';

document.getElementById('category').addEventListener('change', loadSubCategory);
document.getElementById('subCategory').addEventListener('change', loadAlgorithm);
document.getElementById('algorithm').addEventListener('change', loadVisualization);
