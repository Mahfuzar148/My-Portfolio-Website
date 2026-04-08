import { useEffect, useRef, useState } from "react";

function useToast() {
  const [toast, setToast] = useState({ visible: false, title: "", message: "", type: "info" });
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showToast = (title, message, type = "info") => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setToast({ visible: true, title, message, type });
    timerRef.current = window.setTimeout(() => {
      setToast({ visible: false, title: "", message: "", type: "info" });
    }, 2600);
  };

  return { toast, showToast, setToast };
}

export default useToast;