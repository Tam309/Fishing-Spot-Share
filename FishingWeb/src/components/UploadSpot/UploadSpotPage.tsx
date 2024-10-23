import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
import './UploadSpotPage.css'; // Import the CSS file

const UploadSpotPage: React.FC = () => {
  const user_id = localStorage.getItem("user_id");
  const [spot_name, setSpotName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fish_type, setFishSpecies] = useState<string>("");
  const [photo_url, setPhoto_url] = useState<string>(""); // Will store the Cloudinary URL
  const [inputFile, setInputFile] = useState<File | null>(null); // Store the selected file
  const [uploading, setUploading] = useState<boolean>(false); // Upload state

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInputFile(e.target.files[0]);
    }
  };

  const uploadImgToCloudinary = async (): Promise<string | null> => {
    if (!inputFile) {
      alert("Please select a file to upload!");
      return null;
    }

    const formData = new FormData();
    formData.append("file", inputFile);
    formData.append("upload_preset", "yxk5zsh4");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dstq5xce2/image/upload",
        formData
      );
      setUploading(false);
      setPhoto_url(response.data.secure_url); // Save the image URL
      console.log("Image uploaded: ", response.data.secure_url);
      return response.data.secure_url; // Return the URL after successful upload
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const sendPostDataToServer = async (uploadedImageUrl: string) => {
    try {
      const response = await axios.post("http://localhost:3001/posts/new", {
        user_id,
        spot_name,
        location,
        description,
        fish_type,
        photo_url: uploadedImageUrl, // Use the uploaded image URL
      });
      console.log(response.data);
      alert("Spot uploaded successfully!");
    } catch (error) {
      console.log("Error uploading spot data: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // First, upload the image to Cloudinary and get the URL
    const uploadedImageUrl = await uploadImgToCloudinary();
    
    // If the image was uploaded successfully, send the post data to the server
    if (uploadedImageUrl) {
      await sendPostDataToServer(uploadedImageUrl);
    }
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
            <p>Drag and drop your images here, or click to select files</p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden-file-input"
              id="uploadImages"
            />
            <label htmlFor="uploadImages" className="cursor-pointer">
              Select Image
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="upload-button" disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Spot"}
        </button>
      </form>
    </div>
  );
};

export default UploadSpotPage;
