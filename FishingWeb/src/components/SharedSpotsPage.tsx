// src/components/SharedSpotsPage.tsx
import React from 'react';
import { FaUser, FaFish, FaComments } from "react-icons/fa";

interface SharedSpot {
  id: number;
  name: string;
  description: string;
  image: string;
  sharedBy: string;
  date: string;
}

const SharedSpotsPage: React.FC = () => {
  const sharedSpots: SharedSpot[] = [
    {
      id: 1,
      name: "Golden Pond",
      description: "A serene spot for carp fishing",
      image:
        "https://images.unsplash.com/photo-1593816151811-39a9db0b7c82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      sharedBy: "Alice Smith",
      date: "2023-05-15",
    },
    {
      id: 2,
      name: "Whispering Creek",
      description: "Perfect for trout fishing in spring",
      image:
        "https://images.unsplash.com/photo-1516034618791-0a1dd83f7e24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      sharedBy: "Bob Johnson",
      date: "2023-05-10",
    },
    {
      id: 3,
      name: "Eagle's Nest Lake",
      description: "Great for bass fishing with beautiful scenery",
      image:
        "https://images.unsplash.com/photo-1454623228540-d5832958ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      sharedBy: "Carol Davis",
      date: "2023-05-05",
    },
  ];

  const handleDiscuss = (id: number) => {
    // Handle discuss action, e.g., navigate to discussion page or open modal
    console.log(`Discuss spot with ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Recently Shared Fishing Spots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sharedSpots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
          >
            <img
              src={spot.image}
              alt={spot.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{spot.name}</h3>
              <p className="text-gray-600 mb-4">{spot.description}</p>
              {/* Shared By and Date */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="flex items-center">
                  <FaUser className="mr-1" /> {spot.sharedBy}
                </span>
                <span>{spot.date}</span>
              </div>
              {/* Discuss Button and Fish Species */}
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => handleDiscuss(spot.id)}
                  className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center"
                >
                  <FaComments className="mr-2" /> Discuss
                </button>
                <span className="text-sm text-gray-500 flex items-center">
                  <FaFish className="mr-1" /> Carp, Bass
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SharedSpotsPage;
