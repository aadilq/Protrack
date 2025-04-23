import { useState, useEffect } from "react";
import axios from 'axios';

const App = () => {
    const [Message, setMessage] = useState('');
    const [Loading, setLoading] = useState(true);

    useEffect(() =>{
        const fetchData = async() =>{
            try{
                const response = await axios.get('http://localhost:5000/api/test');
                setMessage(response.data.Message);
            } catch(error){
                setMessage('Error connecting to the backend!');
                console.log('Error fetching data: ', error)
            }
            finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [])
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
            ProTrack
        </h1>
        </div>
    </div>
  )
}

export default App
