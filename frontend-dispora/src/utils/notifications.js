import Swal from 'sweetalert2';

export const showSuccess = (message) => {
  return Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    position: 'top-end',
    background: '#f0fdf4',
    iconColor: '#22c55e',
    color: '#166534',
  });
};

export const showError = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Terjadi Kesalahan',
    text: message,
    confirmButtonColor: '#ef4444',
  });
};

export const showConfirm = (message) => {
  return Swal.fire({
    title: 'Apakah Anda yakin?',
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Ya, lanjutkan',
    cancelButtonText: 'Batal',
  });
};
