import { useEffect, useRef, useState } from "react";
import { Info } from "lucide-react";
import { TOAST_EVENT } from "../toast.js";
import "./Toaster.css";

const VISIBLE_MS = 4500;

export default function Toaster() {
  const [message, setMessage] = useState("");
  const timer = useRef();

  useEffect(() => {
    function handleToast(event) {
      setMessage(event.detail);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setMessage(""), VISIBLE_MS);
    }
    window.addEventListener(TOAST_EVENT, handleToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, handleToast);
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <div className="toaster" role="status" aria-live="polite">
      {message && (
        <div className="toast">
          <Info size={18} aria-hidden="true" />
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}
