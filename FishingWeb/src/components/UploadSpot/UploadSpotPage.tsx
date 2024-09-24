import React, { ChangeEvent, useState } from 'react';
import { FaUpload } from "react-icons/fa";
import './UploadSpotPage.css'; // Import the CSS file

const UploadSpotPage: React.FC = () => {
  const [formData, setFormData] = useState({
    spotName: '',
    location: '',
    description: '',
    fishSpecies: '',
    images: [] as File[],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend
    console.log(formData);
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
            value={formData.spotName}
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
            value={formData.location}
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
            value={formData.description}
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
            value={formData.fishSpecies}
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
