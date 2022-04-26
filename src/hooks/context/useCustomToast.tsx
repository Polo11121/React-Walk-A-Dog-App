import { toast } from "react-toastify";

export const useCustomToast = (text: string) =>
  toast(text, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    pauseOnFocusLoss: false,
    progress: undefined,
  });
