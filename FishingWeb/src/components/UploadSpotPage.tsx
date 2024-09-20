// src/components/UploadSpotPage.tsx
import React, { ChangeEvent, useState } from 'react';
import { FaUpload } from "react-icons/fa";

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
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Upload a New Fishing Spot</h2>
      <form
        className="bg-white rounded-lg shadow-md p-6"
        onSubmit={handleSubmit}
      >
        {/* Spot Name */}
        <div className="mb-4">
          <label htmlFor="spotName" className="block text-gray-700 font-bold mb-2">
            Spot Name
          </label>
          <input
            type="text"
            id="spotName"
            value={formData.spotName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          ></textarea>
        </div>
        {/* Fish Species */}
        <div className="mb-4">
          <label htmlFor="fishSpecies" className="block text-gray-700 font-bold mb-2">
            Fish Species
          </label>
          <input
            type="text"
            id="fishSpecies"
            value={formData.fishSpecies}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="e.g., Trout, Bass, Salmon"
          />
        </div>
        {/* Upload Images */}
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Upload Images</label>
          <div className="border-dashed border-2 border-gray-400 rounded-lg p-4 text-center">
            <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
            <p className="text-gray-600">
              Drag and drop your images here, or click to select files
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="uploadImages"
            />
            <label htmlFor="uploadImages" className="cursor-pointer">
              {/* Optional: Add a button or text to trigger file selection */}
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Upload Spot
        </button>
      </form>
    </div>
  );
};

export default UploadSpotPage;
