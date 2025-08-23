import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-[90vh]">
      <div className="flex flex-col items-center space-y-2">
        <div className="w-8 h-8 border-4 border-[#008ED6] border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Hang tight, loading...</p>
      </div>
    </div>
  );
};

export default Loading;
