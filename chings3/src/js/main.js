import { initFormHandler } from './form.js';
import { renderProducts } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initFormHandler();
  renderProducts();
});