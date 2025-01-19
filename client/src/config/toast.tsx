import { toast } from "react-hot-toast";
import { ShowToast } from "../types/showToast";

export const showToast = (data: ShowToast) => {
  toast.success(data.toastMsg, {
    icon: data.icon,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
      fontSize: "12px",
    },
  });
};
