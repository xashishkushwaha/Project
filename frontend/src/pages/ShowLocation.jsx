import { useEffect, useState } from 'react';
import axios from 'axios';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

const ShowLocation = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/app/v1/location');
        if (response.data && typeof response.data === 'object') {
          setLocations(Object.values(response.data));
        } else {
          setError('Invalid response data. Expected a JSON object.');
        }
      } catch (err) {
        console.error('Error fetching locations:', err);
        setError('Failed to fetch locations.');
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-3xl h-screen mx-auto p-8 bg-gradient-to-b from-green-200 to-green-100 rounded-lg shadow-lg">
    <h1 className="text-4xl font-bold mb-6 text-green-800">Cleanup Focus Areas</h1>
    {locations.length === 0 ? (
      <p className="text-gray-700 text-center text-xl">No locations found.</p>
    ) : (
      <ul className="list-none p-0 m-0 space-y-4">
        {locations.slice(0, 3).map(location => (
          <li
            key={location._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-semibold text-green-700">{location.locationName}</p>
                <div className="text-gray-500 text-sm mb-2">{location.description}</div>
              </div>
              <div className="flex items-center">
                <p className="text-lg font-bold text-gray-800">{location.count}</p> {/* Assuming a rating of 5.0 */}
              </div>
            </div>
            <p className="text-gray-800 mt-2 flex items-center">
    <strong className="mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#155bca">
            <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/>
        </svg>
    </strong>
    {location.address}
</p>
            <p className="text-gray-800 mt-2 flex items-center">
    <strong className="mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#155bca"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
    </strong>
    {location.description}
</p>

          </li>
        ))}
      </ul>
    )}
  </div>
  
  );
};

export default ShowLocation;
