import React, { ChangeEvent, useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./EditPostPage.css"; // Import the CSS file

const EditPostPage: React.FC = () => {
  const { post_id } = useParams<{ post_id: string }>();
  const [spot_name, setSpotName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fish_type, setFishSpecies] = useState<string>("");
  const [photo_url, setPhoto_url] = useState<string>(""); // Correct photo_url type
  const [inputFile, setInputFile] = useState<File | null>(null); // Handle single file
  const [uploading, setUploading] = useState<boolean>(false);
  const [publicId, setPublicId] = useState<String>("");

  useEffect(() => {
    // Fetch the current post details to pre-fill the form
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/posts/${post_id}`
        );
        const { spot_name, location, description, fish_type, photo_url } =
          response.data;
        setSpotName(spot_name);
        setLocation(location);
        setDescription(description);
        setFishSpecies(fish_type);
        setPhoto_url(photo_url); // Pre-fill with current image URL
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };
    fetchPostData();
  }, [post_id]);

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
      setInputFile(e.target.files[0]); // Store the selected file
    }
  };

  const getOldPhotoUrl = async (): Promise<string | null> => {
    try {
      const response = await axios.get(`http://localhost:3001/posts/photo/${post_id}`);
      console.log("Response from server:", response.data); // Log the response
      const url = response.data; // Make sure this is a string
      const publicId = url.toString().split('/').pop().split('.')[0];
      setPublicId(publicId);
      return publicId;
    } catch (error) {
      console.error("Error fetching old photo URL:", error);
      return null;
    }
  };
  

  useEffect(() => {
    getOldPhotoUrl();
  }, []);
  const deleteOldPhotoFromCloud = async () => {
    try {
      await axios.delete(`https://api.cloudinary.com/v1_1/dstq5xce2/image/destroy`, {
        data: {
          public_id: publicId,
          type: 'upload' // Use 'upload' for images uploaded to the default upload folder
        },
        headers: {
          Authorization: `Bearer 918745228234335`, // Replace with your actual API key
        },
      });
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  };
  
  

  const uploadImgToCloudinary = async (): Promise<string | null> => {
    if (!inputFile) return null; // If no new image is selected, return null

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
      setPhoto_url(response.data.secure_url); // Update the state with the new image URL
      console.log("Image uploaded: ", response.data.secure_url);
      return response.data.secure_url; // Return the new image URL
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await deleteOldPhotoFromCloud();
    // First, upload the image (if there's a new file)
    const uploadedImageUrl = await uploadImgToCloudinary();

    // Use the new image URL if it exists, otherwise, use the current image URL
    const finalPhotoUrl = uploadedImageUrl || photo_url;

    try {
      // Send updated post data, including the (possibly updated) photo URL
      const response = await axios.put(
        `http://localhost:3001/posts/${post_id}`,
        {
          spot_name,
          location,
          description,
          fish_type,
          photo_url: finalPhotoUrl, // Use the correct image URL (new or existing)
        }
      );
      console.log(response.data);
      alert("Post updated successfully");
    } catch (error) {
      console.error("There was an error updating the post!", error);
    }

    console.log(`public id: ${publicId}`);
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Edit Fishing Spot</h2>
      <form className="upload-form" onSubmit={handleSubmit}>
        {/* Spot Name */}
        <div>
          <label
            htmlFor="spotName"
            className="block text-gray-700 font-bold mb-2"
          >
            Spot Name
          </label>
          <input
            type="text"
            id="spotName"
            value={spot_name} // Pre-fill with the existing value
            onChange={handleInputChange}
            className="upload-input"
            required
          />
        </div>
        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-gray-700 font-bold mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location} // Pre-fill with the existing value
            onChange={handleInputChange}
            className="upload-input"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description} // Pre-fill with the existing value
            onChange={handleInputChange}
            rows={4}
            className="upload-textarea"
            required
          ></textarea>
        </div>
        {/* Fish Species */}
        <div>
          <label
            htmlFor="fishSpecies"
            className="block text-gray-700 font-bold mb-2"
          >
            Fish Species
          </label>
          <input
            type="text"
            id="fishSpecies"
            value={fish_type} // Pre-fill with the existing value
            onChange={handleInputChange}
            className="upload-input"
            placeholder="e.g., Trout, Bass, Salmon"
          />
        </div>
        {/* Upload Images */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Upload New Image
          </label>
          <div className="upload-image-area">
            <FaUpload className="upload-icon" />
            <p>Drag and drop your image here, or click to select a file</p>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden-file-input"
              id="uploadImages"
            />
            <label htmlFor="uploadImages" className="cursor-pointer">
              Select File
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className="upload-button" disabled={uploading}>
          {uploading ? "Uploading..." : "Update Spot"}
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
