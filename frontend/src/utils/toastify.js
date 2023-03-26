import { toast } from "react-toastify";

export const toastifySuccess = (msg, position = "top-right") => {
  toast.success(msg, {
    position,
    autoClose: 500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};

export const toastifyError = (msg, position = "top-right") => {
  toast.error(msg, {
    position,
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
