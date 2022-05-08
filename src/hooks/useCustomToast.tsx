import { toast } from "react-toastify";

export const useCustomToast = (text: string, isError?: boolean) =>
  toast(text, {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    pauseOnFocusLoss: false,
    progress: undefined,
    style: { backgroundColor: isError ? "red" : "#8fe388", color: "black" },
  });
