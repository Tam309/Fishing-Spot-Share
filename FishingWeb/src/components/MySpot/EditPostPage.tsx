import React, { ChangeEvent, useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./EditPostPage.module.css";

const EditPostPage: React.FC = () => {
  const { post_id } = useParams<{ post_id: string }>();
  const [spot_name, setSpotName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fish_type, setFishSpecies] = useState<string>("");
  const [photo_url, setPhoto_url] = useState<string>("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [publicId, setPublicId] = useState<String>("");

  // Your useEffect and functions here...

  return (
    <div className={styles.uploadContainer}>
      <h2 className={styles.uploadTitle}>Edit Fishing Spot</h2>
      <form className={styles.uploadForm} onSubmit={handleSubmit}>
        {/* Spot Name */}
        <div>
          <label htmlFor="spotName" className="block text-gray-700 font-bold mb-2">
            Spot Name
          </label>
          <input
            type="text"
            id="spotName"
            value={spot_name}
            onChange={handleInputChange}
            className={styles.uploadInput}
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
            value={location}
            onChange={handleInputChange}
            className={styles.uploadInput}
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
            value={description}
            onChange={handleInputChange}
            rows={4}
            className={styles.uploadTextarea}
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
            value={fish_type}
            onChange={handleInputChange}
            className={styles.uploadInput}
            placeholder="e.g., Trout, Bass, Salmon"
          />
        </div>
        {/* Upload Images */}
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Upload New Image
          </label>
          <div className={styles.uploadImageArea}>
            <FaUpload className={styles.uploadIcon} />
            <p>Drag and drop your image here, or click to select a file</p>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.hiddenFileInput}
              id="uploadImages"
            />
            <label htmlFor="uploadImages" className="cursor-pointer">
              Select File
            </label>
          </div>
        </div>
        {/* Submit Button */}
        <button type="submit" className={styles.uploadButton} disabled={uploading}>
          {uploading ? "Uploading..." : "Update Spot"}
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
