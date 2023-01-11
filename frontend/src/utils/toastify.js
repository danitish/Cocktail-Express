import { toast } from "react-toastify";

export const toastifySuccess = (msg, position = "top-right") => {
  toast.success(msg, {
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
