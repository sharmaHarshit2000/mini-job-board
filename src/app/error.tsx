'use client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

interface ErrorProps {
  error: Error;
  reset?: () => void; 
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    toast.error(`Error: ${error.message}`);
  }, [error]);

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <p className="text-red-600 text-center font-medium mb-2">
        Something went wrong: {error.message}
      </p>

      {reset && (
        <button
          onClick={reset}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
