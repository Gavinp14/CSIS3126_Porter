import Swal from 'sweetalert2';

export const SuccessDialog = (message) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    });
};

export const ErrorDialog = (message) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
};
