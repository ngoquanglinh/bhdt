import { toast } from "react-toastify";

export const toastSuccess = (
  message,
  toastErrorOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
) => {
  toast.success(message, toastErrorOptions);
};

export const toastError = (
  message,
  toastErrorOptions = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
) => {
  toast.error(message, toastErrorOptions);
};

export const toastWarning = (
  message,
  toastWarningOptions = {
    position: "top-right",
    hideProgressBar: false,
    autoClose: 2000,
  }
) => {
  toast.warning(message, toastWarningOptions);
};
