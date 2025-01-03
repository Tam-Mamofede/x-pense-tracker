/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";

function Alert({ message, clearMessage }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true); // Show alert when there's a message
      const timer = setTimeout(() => {
        setIsVisible(false); // Hide after 5 seconds
        clearMessage(); // Clear the message from state
      }, 1000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
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

    // <div className="flex items-center space-x-2 rounded-md border border-blue-300 bg-blue-100 p-4 text-blue-800">
    //   <span className="font-bold">Notice:</span>
    //   <span>{message}</span>
    // </div>
  );
}

export default Alert;
