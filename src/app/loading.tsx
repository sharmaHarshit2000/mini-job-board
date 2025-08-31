'use client';

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50 pointer-events-none">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center pointer-events-auto">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>

      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}
