import { initFormHandler } from './form.js';
import { renderProducts } from './ui.js';

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initFormHandler(); // Set up form submission handling
  renderProducts();  // Load and display the product list
});