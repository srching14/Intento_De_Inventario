import Swal from 'sweetalert2';

// Show a success alert
export function showSuccessAlert(title, text) {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'OK',
    background: '#fff',
    color: '#333'
  });
}

// Show an error alert
export function showErrorAlert(title, text) {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
    background: '#fff',
    color: '#333'
  });
}

// Show a confirmation dialog and return the user's choice
export async function showConfirmation(title, text) {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, Eliminar',
    cancelButtonText: 'Cancelar',
    background: '#fff',
    color: '#333',
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#3498db'
  });
  return result.isConfirmed;
}