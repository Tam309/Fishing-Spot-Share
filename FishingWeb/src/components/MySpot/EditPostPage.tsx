import React, { ChangeEvent, useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./EditPostPage.module.css";

const EditPostPage: React.FC = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL
  const { post_id } = useParams<{ post_id: string }>();
  const [spot_name, setSpotName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [fish_type, setFishSpecies] = useState<string>("");
  const [photo_url, setPhoto_url] = useState<string>("");
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [publicId, setPublicId] = useState<String>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current post details to pre-fill the form
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/posts/${post_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        const { spot_name, location, description, fish_type, photo_url } = response.data.post;
        setSpotName(spot_name);
        setLocation(location);
        setDescription(description);
        setFishSpecies(fish_type);
        setPhoto_url(photo_url); 
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
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setImagePreview(fileReader.result as string);
      };
      fileReader.readAsDataURL(e.target.files[0]);
    }
  };

  const getOldPhotoUrl = async (): Promise<string | null> => {
    try {
      const response = await axios.get(`${baseUrl}/posts/photo/${post_id}`);
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
          Authorization: `Bearer 918745228234335`, 
        },
      });
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  };
  
  

  const uploadImgToCloudinary = async (): Promise<string | null> => {
    if (!inputFile) return null; 

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
        `${baseUrl}/posts/${post_id}`,
        {
          spot_name,
          location,
          description,
          fish_type,
          image: finalPhotoUrl, 
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      );
      if(response.status === 200) {
        console.log(response.data);
        navigate("/mySpots");
      }
      
    } catch (error) {
      console.error("There was an error updating the post!", error);
    }

    console.log(`public id: ${publicId}`);
  };

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
            {imagePreview && (
            <div className={styles.imagePreview}>
              <img src={imagePreview} alt="Selected" className={styles.selectedImage} />
            </div>
          )}
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
