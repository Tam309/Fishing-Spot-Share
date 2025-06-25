import React, { useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUpload } from "react-icons/fa";
import styles from "./EditProfilePage.module.css";

const EditProfilePage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL 
  // State to store form data
  const [nick_name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const [uploading, setUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // New loading state
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  if (!token) {
    console.error("User ID not found in localStorage");
    return null; 
  }

  // Fetch user's profile when the page loads
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log(data);

      setName(data.nick_name || ""); 
      setLocation(data.location || "");
      setBio(data.bio || "");
      setAvatar(data.avatar || "");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch user profile on component mount

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  if (e.target.files && e.target.files.length > 0) {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    setInputFile(file);
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      console.log("File preview generated:", fileReader.result);
      setImagePreview(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }
};


  const uploadImgToCloudinary = async (): Promise<string | null> => {
    if (!inputFile) {
      alert("Please select a file to upload!");
      return null;
    }
    const formData = new FormData();
    formData.append("image", inputFile); 
    formData.append("folder", "user avatar"); 

    try {
      setUploading(true);
      const response = await axios.post(
        `${baseUrl}/cloudinary/upload`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      setUploading(false);
      setAvatar(response.data.url); 
      console.log("Image uploaded: ", response.data.url);
      return response.data.url; 
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image: ", error);
      return null;
    }
  };


  const updateUserProfile = async (avatarUrl: string | null) => {
    try {
      const finalPhotoUrl = avatarUrl || avatar;
      const response = await axios.put(
        `${baseUrl}/users/edit`,
        {
          nick_name: nick_name,
          location: location,
          bio: bio,
          avatar: finalPhotoUrl, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      let uploadImg: string | null = null;

      if (inputFile) {
        uploadImg = await uploadImgToCloudinary();
      }

      
      if (!inputFile || uploadImg) {
        await updateUserProfile(uploadImg); 
      }

      navigate("/profile");
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsLoading(false); 
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
            value={nick_name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            disabled={isLoading} 
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={styles.input}
            disabled={isLoading} 
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bio">Bio</label>
          <textarea
            id="bio"
            value={bio} 
            onChange={(e) => setBio(e.target.value)}
            className={styles.textarea}
            disabled={isLoading}
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
              disabled={isLoading} 
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
        <div className={styles.actions}>
          <button
            type="submit"
            className={styles.saveBtn}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={() => console.log("Cancelled")}
            disabled={isLoading} 
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
