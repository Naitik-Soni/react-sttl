import React from 'react';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-200 bg-opacity-75 z-50">
      <div className="flex gap-2">
        <div className="w-5 h-5 bg-[#d991c2] rounded-full animate-ping"></div>
        <div className="w-5 h-5 bg-[#9869b8] rounded-full animate-ping"></div>
        <div className="w-5 h-5 bg-[#6756cc] rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default Loader;
