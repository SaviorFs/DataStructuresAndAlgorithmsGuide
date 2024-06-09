import { categories, algorithms } from './categories.js';

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
