import { getProducts, deleteProduct } from './apis.js';
import { showConfirmation, showErrorAlert, showSuccessAlert } from './alertas.js';
import { setEditMode } from './form.js';

const productList = document.getElementById('productList');

export async function renderProducts() {
  try {
    const products = await getProducts();
    
    if (products.length === 0) {
      productList.innerHTML = '<p>No products found. Add your first product!</p>';
      return;
    }

    productList.innerHTML = products.map(product => `
      <div class="product" data-id="${product.id}">
        <p><strong>ID:</strong> ${product.id}</p>
        <p><strong>Name:</strong> ${product.name}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <div class="product-actions">
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </div>
    `).join('');

    setupEventListeners();
  } catch (error) {
    showErrorAlert('Error', 'Failed to load products.');
    productList.innerHTML = '<p>Error loading products. Please try again.</p>';
  }
}

function setupEventListeners() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', handleEdit);
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', handleDelete);
  });
}

function handleEdit(event) {
  const productElement = event.target.closest('.product');
  const product = {
    id: productElement.dataset.id,
    name: productElement.querySelector('p:nth-child(2)').textContent.replace('Name: ', ''),
    price: parseFloat(productElement.querySelector('p:nth-child(3)').textContent.replace('Price: $', '')),
    category: productElement.querySelector('p:nth-child(4)').textContent.replace('Category: ', '')
  };
  setEditMode(product);
}

async function handleDelete(event) {
  const productId = event.target.closest('.product').dataset.id;
  const confirm = await showConfirmation(
    'Are you sure?', 
    'This action cannot be undone.'
  );
  
  if (confirm) {
    try {
      await deleteProduct(productId);
      await renderProducts();
      showSuccessAlert('Deleted!', 'Product has been deleted.');
    } catch {
      showErrorAlert('Error', 'Could not delete product.');
    }
  }
}