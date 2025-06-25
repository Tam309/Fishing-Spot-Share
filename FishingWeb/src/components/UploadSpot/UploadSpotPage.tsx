import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { FaUpload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import styles from './UploadSpotPage.module.css';

const UploadSpotPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const user_id = localStorage.getItem("user_id");
  const [spot_name, setSpotName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fish_type, setFishSpecies] = useState<string>("");
  const [photo_url, setPhoto_url] = useState<string>(""); 
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();

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
      const selectedFile = e.target.files[0];
      setInputFile(selectedFile);
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const uploadImgToCloudinary = async (): Promise<string | null> => {
    if (!inputFile) {
      alert("Please select a file to upload!");
      return null;
    }

    const formData = new FormData();
    formData.append("image", inputFile);
    formData.append("folder", "fish spot");

    try {
      setUploading(true);
      const response = await axios.post(
        `${baseUrl}/cloudinary/upload`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      setUploading(false);
      setPhoto_url(response.data.url);
      console.log("Image uploaded: ", response.data.url);
      return response.data.url;
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const sendPostDataToServer = async (uploadedImageUrl: string) => {
    try {
      await axios.post(`${baseUrl}/posts/create`, {
        user_id,
        spot_name,
        location,
        description,
        fish_type,
        image: uploadedImageUrl,
      },{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        }
      });
      alert("Spot uploaded successfully!");
    } catch (error) {
      console.log("Error uploading spot data: ", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadedImageUrl = await uploadImgToCloudinary();
    if (uploadedImageUrl) {
      await sendPostDataToServer(uploadedImageUrl);
      navigate("/mySpots");
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <h2 className={styles.uploadTitle}>Upload a New Fishing Spot</h2>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="spotName" className="block text-gray-700 font-bold mb-2">
            Spot Name
          </label>
          <input
            type="text"
            id="spotName"
            onChange={handleInputChange}
            className={styles.uploadInput}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            onChange={handleInputChange}
            className={styles.uploadInput}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
            Description
          </label>
          <textarea
            id="description"
            onChange={handleInputChange}
            rows={4}
            className={styles.uploadTextarea}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="fishSpecies" className="block text-gray-700 font-bold mb-2">
            Fish Species
          </label>
          <input
            type="text"
            id="fishSpecies"
            onChange={handleInputChange}
            className={styles.uploadInput}
            placeholder="e.g., Trout, Bass, Salmon"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Upload Images</label>
          <div className={styles.uploadImageArea}>
            <FaUpload className={styles.uploadIcon} />
            <p>Drag and drop your images here, or click to select files</p>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.hiddenFileInput}
              id="uploadImages"
            />
            <label htmlFor="uploadImages" className="cursor-pointer">
              Select Image
            </label>
          {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Selected" className={styles.selectedImage} />
            </div>
          )}
          </div>
        </div>
        <button type="submit" className={styles.uploadButton} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload Spot"}
        </button>
      </form>
    </div>
  );
};

export default UploadSpotPage;
