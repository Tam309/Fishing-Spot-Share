import React, { ChangeEvent, useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
import './UploadSpotPage.css'; // Import the CSS file

const UploadSpotPage: React.FC = () => {
  const user_id = 1;
  const [spot_name, setSpotName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fishSpecies, setFishSpecies] = useState<string>("");
  const [photo_url, setPhoto_url] = useState<File>();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const input = e.target.value;
    switch (e.target.id) {
      case "spotName":
        setSpotName(input);
        break;
      case "location":
        setLocation(input);
        break;
      case "description":
        setDescription(input);
        break;
      case "fishSpecies":
        setFishSpecies(input);
        break;
      default:
        break;
    }
  };

  const sendPostDataToServer = async () => {
    try {
      const response = await axios.post("http://localhost:3001/posts/new" , {
        user_id,
        spot_name,
        location,
        description,
        fishSpecies,
        photo_url,
      })
      console.log(response.data);
      alert("Spot uploaded successfully!");
    } catch(error) {
      console.log(error);
    }
  }
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
      sendPostDataToServer();
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Upload a New Fishing Spot</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        {/* Spot Name */}
        <div>
          <label htmlFor="spotName" className="block text-gray-700 font-bold mb-2">
            Spot Name
          </label>
          <input
            type="text"
            id="spotName"
            onChange={handleInputChange}
            className="upload-input"
            required
          />
        </div>
        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            onChange={handleInputChange}
            className="upload-input"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            onChange={handleInputChange}
            rows={4}
            className="upload-textarea"
            required
          ></textarea>
        </div>
        {/* Fish Species */}
        <div>
          <label htmlFor="fishSpecies" className="block text-gray-700 font-bold mb-2">
            Fish Species
          </label>
          <input
            type="text"
            id="fishSpecies"
            onChange={handleInputChange}
            className="upload-input"
            placeholder="e.g., Trout, Bass, Salmon"
          />
        </div>
        {/* Upload Images */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">Upload Images</label>
          <div className="upload-image-area">
            <FaUpload className="upload-icon" />
            <p>
              Drag and drop your images here, or click to select files
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden-file-input"
              id="uploadImages"
            />
            <label htmlFor="uploadImages" className="cursor-pointer">
              {/* Optional: Add a button or text to trigger file selection */}
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="upload-button">
          Upload Spot
        </button>
      </form>
    </div>
  );
};

export default UploadSpotPage;
