// src/components/ExploreSpotsPage.tsx
import React from 'react';
import { FaMapMarkerAlt, FaFish } from "react-icons/fa";

interface FishingSpot {
  id: number;
  name: string;
  description: string;
  image: string;
}

const ExploreSpotsPage: React.FC = () => {
  const spots: FishingSpot[] = [
    {
      id: 1,
      name: "Crystal Lake",
      description: "Clear waters with abundant trout",
      image:
        "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 2,
      name: "Rocky River",
      description: "Challenging spot for experienced anglers",
      image:
        "https://images.unsplash.com/photo-1508343919546-4a5d6c083f44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    },
    {
      id: 3,
      name: "Sunset Beach",
      description: "Perfect for surf fishing",
      image:
        "https://images.unsplash.com/photo-1564959130747-897fb406b9af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Explore Fishing Spots</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spots.map((spot) => (
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
              <p className="text-gray-600">{spot.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500 flex items-center">
                  <FaMapMarkerAlt className="mr-1" /> 2.5 miles away
                </span>
                <span className="text-sm text-gray-500 flex items-center">
                  <FaFish className="mr-1" /> Trout, Bass
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSpotsPage;
