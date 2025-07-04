const API_URL = 'http://localhost:3000/productos';

export async function getProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to load products');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function createProduct(product) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to create product');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateProduct(id, product) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    if (!response.ok) throw new Error('Failed to update product');
    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return true;
  } catch (error) {
    throw error;
  }
}

export async function checkDuplicateName(name, excludeId = null) {
  const products = await getProducts();
  return products.some(
    product => product.name.toLowerCase() === name.toLowerCase() && 
              (!excludeId || product.id !== excludeId)
  );
}