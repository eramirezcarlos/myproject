export default function TestPage() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ✅ Tailwind CSS Test
        </h1>
        <p className="text-gray-600 mb-4">
          If you can see styling, Tailwind is working!
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="w-full h-3 bg-red-500 rounded"></div>
          <div className="w-3/4 h-3 bg-green-500 rounded"></div>
          <div className="w-1/2 h-3 bg-yellow-500 rounded"></div>
        </div>
        
        <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
          Test Button
        </button>
      </div>
    </div>
  );
}