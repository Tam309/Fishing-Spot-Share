import React from 'react';
import { FaMapMarkerAlt, FaFish } from "react-icons/fa";
import './ExploreSpotsPage.css';

const ExploreSpotsPage = () => {
  const spots = [
    { id: 1, name: "Crystal Lake", description: "Clear waters with abundant trout", image: "https://images.unsplash.com/photo-1516132006923-6cf348e5dee2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
    { id: 2, name: "Rocky River", description: "Challenging spot for experienced anglers", image: "https://images.unsplash.com/photo-1508343919546-4a5d6c083f44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" },
    { id: 3, name: "Sunset Beach", description: "Perfect for surf fishing", image: "https://images.unsplash.com/photo-1564959130747-897fb406b9af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80" },
  ];

  return (
    <div className="container">
      <h2>Explore Fishing Spots</h2>
      <div className="grid">
        {spots.map((spot) => (
          <div key={spot.id} className="card">
            <img src={spot.image} alt={spot.name} />
            <div className="card-content">
              <h3>{spot.name}</h3>
              <p>{spot.description}</p>
              <div className="card-meta">
                <span><FaMapMarkerAlt className="icon" /> 2.5 miles away</span>
                <span><FaFish className="icon" /> Trout, Bass</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreSpotsPage;
