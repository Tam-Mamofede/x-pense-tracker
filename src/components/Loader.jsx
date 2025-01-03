import React from "react";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative h-[2.5em] w-[2.5em] rotate-[165deg]">
        {/* Loader */}
        <div className="animate-before8 absolute left-1/2 top-1/2 h-[0.5em] w-[0.5em] -translate-x-1/2 -translate-y-1/2 transform rounded-[0.25em] bg-[#1f4529]"></div>
        <div className="animate-after6 absolute left-1/2 top-1/2 h-[0.5em] w-[0.5em] -translate-x-1/2 -translate-y-1/2 transform rounded-[0.25em] bg-[#e3f0af]"></div>
      </div>
    </div>
  );
}

export default Loader;
