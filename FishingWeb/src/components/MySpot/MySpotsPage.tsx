import React from 'react';
import './MySpotsPage.css'; // Import the CSS file

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
    console.log(`Edit spot with ID: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete spot with ID: ${id}`);
  };

  return (
    <div className="my-spots-container">
      <h2 className="my-spots-heading">My Fishing Spots</h2>
      <div className="my-spots-grid">
        {mySpots.map((spot) => (
          <div key={spot.id} className="spot-card">
            <img src={spot.image} alt={spot.name} />
            <div className="spot-card-content">
              <h3 className="spot-card-title">{spot.name}</h3>
              <p className="spot-card-description">{spot.description}</p>
              <div className="spot-card-buttons">
                <button
                  onClick={() => handleEdit(spot.id)}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(spot.id)}
                  className="delete-btn"
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
