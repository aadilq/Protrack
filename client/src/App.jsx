import { useState, useEffect } from 'react';

function App() {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data from backend...');
        const response = await fetch('http://localhost:5000/api/test');
        const rawText = await response.text(); 
        
        console.log('Raw response text:', rawText);
        
        let data;
        try {
          // Try to parse the raw text as JSON
          data = JSON.parse(rawText);
          console.log('Parsed JSON data:', data);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          setError(`JSON parse error: ${parseError.message}. Raw response: ${rawText}`);
          return;
        }
        

        setApiResponse(data);
        
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        setError(fetchError.message);
      } finally {

        setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Task Master
        </h1>
        
        <div className="bg-gray-50 p-4 rounded border mb-4">
          {loading ? (
            <p className="text-center text-gray-600">Connecting to backend...</p>
          ) : (
            <div className="text-center">
              <p className="text-gray-800 mb-2">
                Backend status: <span className="font-semibold">
                  {apiResponse && apiResponse.message 
                    ? apiResponse.message 
                    : 'No message received'}
                </span>
              </p>
              
              {error && (
                <p className="text-red-500 text-sm mt-2">Error: {error}</p>
              )}
            </div>
          )}
        </div>
        
        
        <div className="bg-gray-800 text-white p-4 rounded overflow-auto max-h-60 text-xs font-mono">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <div>
            <p>Loading: {loading ? 'true' : 'false'}</p>
            <p>Error: {error ? error : 'none'}</p>
            <p>API Response: {apiResponse 
              ? JSON.stringify(apiResponse, null, 2) 
              : 'No response data'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;