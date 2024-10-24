import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import styles from "./EditProfilePage.module.css";

const EditProfilePage: React.FC = () => {
  // State to store form data
  const [nick_name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const user_id = localStorage.getItem("user_id");

  if (!user_id) {
    console.error("User ID not found in localStorage");
    return null; // Early return to avoid further execution
  }

  // Fetch user's profile when the page loads
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${user_id}`);
      const data = response.data;
      console.log(data); // Check if data is being fetched correctly

      // Set default values for each field after fetching the user data
      setName(data.nick_name || ""); // Ensure it's not null or undefined
      setLocation(data.location || "");
      setBio(data.bio || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch user profile on component mount

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setInputFile(e.target.files[0]);
    }
  };

  // Send picture to Cloudinary
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
      setAvatar(response.data.secure_url); // Save the image URL
      console.log("Image uploaded: ", response.data.secure_url);
      return response.data.secure_url; // Return the URL after successful upload
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  // Send data to server when button clicked
  const updateUserProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/users/edit/${user_id}`, {
        nick_name: nick_name,
        location: location,
        bio: bio,
        avatar: avatar, // Use the updated avatar URL
      });
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // Handler functions
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadImg = await uploadImgToCloudinary();
    if (uploadImg) {
      await updateUserProfile();
    }
  };

  return (
    <div className={styles.container}>
      <h1>Edit Profile</h1>
      <form onSubmit={handleSave} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={nick_name} // Ensure the value is set
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location} // Ensure the value is set
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio} // Ensure the value is set
            onChange={(e) => setBio(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <div>
          <label className={styles["upload-container"]}>Upload Avatar</label>
          <div className={styles["upload-image-area"]}>
            <FaUpload className={styles["upload-icon"]} />
            <p>Drag and drop your images here, or click to select files</p>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles["hidden-file-input"]}
              id="uploadImages"
            />
            <label htmlFor="uploadImages" className="cursor-pointer">
              Select Image
            </label>
          </div>
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.saveBtn}>Save Changes</button>
          <button type="button" className={styles.cancelBtn} onClick={() => console.log("Cancelled")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
