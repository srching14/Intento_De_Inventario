import { createProduct, updateProduct, checkDuplicateName } from './apis.js';
import { showSuccessAlert, showErrorAlert } from './alertas.js';
import { renderProducts } from './ui.js';

const form = document.getElementById('productForm');
const nameInput = document.getElementById('productName');
const priceInput = document.getElementById('productPrice');
const categoryInput = document.getElementById('productCategory');

let editMode = false;
let currentProductId = null;

export function initFormHandler() {
  form.addEventListener('submit', handleSubmit);
}

export function setEditMode(product) {
  editMode = true;
  currentProductId = product.id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  categoryInput.value = product.category;
  form.querySelector('button[type="submit"]').textContent = 'Update';
}

async function handleSubmit(e) {
  e.preventDefault();

  const product = {
    name: nameInput.value.trim(),
    price: parseFloat(priceInput.value.trim()),
    category: categoryInput.value.trim()
  };

  if (!validateProduct(product)) return;

  try {
    if (await checkDuplicateName(product.name, editMode ? currentProductId : null)) {
      showErrorAlert('Duplicate', 'Product name already exists.');
      return;
    }

    if (editMode) {
      await updateProduct(currentProductId, product);
      showSuccessAlert('Updated!', 'Product updated successfully.');
    } else {
      await createProduct(product);
      showSuccessAlert('Saved!', 'Product added successfully.');
    }

    resetForm();
    await renderProducts();
  } catch (error) {
    showErrorAlert('Error', 'Operation failed.');
  }
}

function validateProduct(product) {
  if (!product.name || isNaN(product.price)) {
    showErrorAlert('Oops...', 'All fields are required.');
    return false;
  }

  if (product.price < 0) {
    showErrorAlert('Oops...', 'Price cannot be negative.');
    return false;
  }

  return true;
}

function resetForm() {
  form.reset();
  editMode = false;
  currentProductId = null;
  form.querySelector('button[type="submit"]').textContent = 'Add';
}