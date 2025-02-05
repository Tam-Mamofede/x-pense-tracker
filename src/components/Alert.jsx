/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

function Alert({ message, clearMessage }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        clearMessage();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  if (!isVisible || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0"></div>
      <div className="w-96 rounded-md bg-white p-6 shadow-lg">
        <p className="text-center text-[#1f4529]">{message}</p>
      </div>
    </div>
  );
}

export default Alert;
