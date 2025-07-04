import { createProduct, updateProduct, checkDuplicateName } from './apis.js';
import { showSuccessAlert, showErrorAlert } from './alertas.js';
import { renderProducts } from './ui.js';

const form = document.getElementById('productForm');
const nameInput = document.getElementById('productName');
const priceInput = document.getElementById('productPrice');
const categoryInput = document.getElementById('productCategory');

let editMode = false;
let currentProductId = null;

// Initialize form submission handling
export function initFormHandler() {
  form.addEventListener('submit', handleSubmit);
}

// Set the form to edit mode with pre-filled product data
export function setEditMode(product) {
  editMode = true;
  currentProductId = product.id;
  nameInput.value = product.name;
  priceInput.value = product.price;
  categoryInput.value = product.category;
  form.querySelector('button[type="submit"]').textContent = 'Update';
}

// Handle form submission for adding or updating products
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
      showErrorAlert('Espera!', 'Este pruducto ya exisiste.');
      return;
    }

    if (editMode) {
      await updateProduct(currentProductId, product);
      showSuccessAlert('Actualizado!', 'El producto se actualizo correctamente.');
    } else {
      await createProduct(product);
      showSuccessAlert('Guardado!', 'El producto se guardo correctamente.');
    }

    resetForm();
    await renderProducts();
  } catch (error) {
    showErrorAlert('Error', 'Operación fallida.');
  }
}

// Validate product data before submission
function validateProduct(product) {
  if (!product.name || isNaN(product.price)) {
    showErrorAlert('Espera...', 'Todos los campos son obligatorios.');
    return false;
  }

  if (product.price < 0) {
    showErrorAlert('IEy ey ey...', 'El precio es negativo.');
    return false;
  }

  return true;
}

// Reset the form to its default state
function resetForm() {
  form.reset();
  editMode = false;
  currentProductId = null;
  form.querySelector('button[type="submit"]').textContent = 'Add';
}