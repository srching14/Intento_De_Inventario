import Swal from 'sweetalert2';

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

export async function showConfirmation(title, text) {
  const result = await Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    background: '#fff',
    color: '#333',
    confirmButtonColor: '#e74c3c',
    cancelButtonColor: '#3498db'
  });
  return result.isConfirmed;
}