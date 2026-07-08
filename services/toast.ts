import toast from "react-hot-toast";

export function showSuccess(message: string): void {
  toast.success(message);
}

export function showError(message: string): void {
  toast.error(message);
}

export function showInfo(message: string): void {
  toast(message, { icon: "ℹ️" });
}

export function showWarning(message: string): void {
  toast(message, { icon: "⚠️" });
}
