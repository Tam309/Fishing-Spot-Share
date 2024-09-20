// src/components/MySpotsPage.tsx
import React from 'react';

interface MySpot {
  id: number;
  name: string;
  description: string;
  image: string;
}

const MySpotsPage: React.FC = () => {
  const mySpots: MySpot[] = [
    {
      id: 1,
      name: "Secret Cove",
      description: "Hidden gem for night fishing",
      image:
        "https://images.unsplash.com/photo-1573155993874-d5d48af862ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1315&q=80",
    },
    {
      id: 2,
      name: "Mountain Stream",
      description: "Great for fly fishing",
      image:
        "https://images.unsplash.com/photo-1610850775142-b4d106bb7481?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    },
  ];

  const handleEdit = (id: number) => {
    // Handle edit action, e.g., navigate to edit page or open modal
    console.log(`Edit spot with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Handle delete action, e.g., remove from state or send request to backend
    console.log(`Delete spot with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">My Fishing Spots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mySpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={spot.image}
              alt={spot.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
              <p className="text-gray-600 mb-4">{spot.description}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleEdit(spot.id)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(spot.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySpotsPage;
