import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(false); // State to handle errors

  // Function to fetch records
  const fetchRecords = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://206.189.138.125/auth/home', {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        setRecords([response.data]);
        console.log([response.data]); // Assuming the API returns an array of records
        setError(false); // Reset error state if fetch is successful
      } else {
        setError(true); // Set error state if response status is not 200
        navigate('/login');
      }
    } catch (err) {
      setError(true); // Set error state on exception
      navigate('/login');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRecords(); // Fetch records immediately on mount
    const interval = setInterval(fetchRecords, 5000); // Set interval for fetching records every 5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-md p-4 max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-gray-700">ICTG39 IoT Core</h1>
          <button className="bg-green-200 hover:bg-green-300 text-green-800 px-4 py-2 rounded-md" onClick={() => navigate("/control")}>
            Goto Control
          </button>
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-600 mb-4">List of Records</h2>
          {error ? (
            <div className="text-red-500 text-center">Oops, some problem occurred!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Time (UTC)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Device ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Field 1</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Field 2</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Field 3</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Current</th>
                    <th className="border border-gray-300 px-4 py-2 text-left text-gray-600">Field 5</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={record.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="border border-gray-300 px-4 py-2">{record.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.time}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.device_id}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.data1}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.data2 || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.data3 || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.data4 || "N/A"}</td>
                      <td className="border border-gray-300 px-4 py-2">{record.data5 || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <iframe 
              src="http://206.189.138.125:3000/d/de4sul6y2bj7ka/new-dashboard?orgId=1&from=2024-12-12T09:01:08.892Z&to=2024-12-12T09:06:08.892Z&timezone=browser&refresh=auto&viewPanel=panel-1"
              width="100%"
              height="600"
              frameborder="0">
              </iframe>
              <iframe
              src="http://206.189.138.125:3000/d/de4sul6y2bj7ka/new-dashboard?orgId=1&from=2024-12-12T09:10:13.889Z&to=2024-12-12T09:15:13.889Z&timezone=browser&refresh=auto&viewPanel=panel-2"
              width="100%"
              height="600"
              frameborder="0">
              </iframe>
              <iframe
              src="http://206.189.138.125:3000/d/de4sul6y2bj7ka/new-dashboard?orgId=1&from=2024-12-12T09:12:28.784Z&to=2024-12-12T09:17:28.784Z&timezone=browser&refresh=auto&viewPanel=panel-3"
              width="100%"
              height="600"
              frameborder="0">
              </iframe>
              <iframe
              src="http://206.189.138.125:3000/d/de4sul6y2bj7ka/new-dashboard?orgId=1&from=2024-12-12T09:13:18.540Z&to=2024-12-12T09:18:18.540Z&timezone=browser&refresh=auto&viewPanel=panel-4"
              width="100%"
              height="600"
              frameborder="0">
              </iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
