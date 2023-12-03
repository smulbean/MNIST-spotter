import React, { useState } from 'react';
import axios from 'axios';
import './uploadImage.css';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [response, setResponse] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        console.log(file);
        setImage(reader.result);
        localStorage.setItem('selectedImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    const storedImage = selectedImage;

    if (storedImage) {
      const formData = new FormData();
      console.log(storedImage);
      formData.append('image', selectedImage);

      const apiUrl = 'http://127.0.0.1:5000/predict';
      console.log(formData);
      try {
        const response = await axios.post(apiUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setResponse(response.data.result);
        // Handle the response as needed
      } catch (error) {
        console.error('Error uploading image:', error);
        // Handle errors
      }
    } else {
      console.error('No image selected for upload.');
    }
  };

  return (
    <div className="image-upload-container">
      <h2>Image Upload</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {selectedImage && (
        <div className="image-preview">
          <h3>Preview:</h3>
          <img src={image} alt="Preview" />
        </div>
      )}
      <button onClick={handleImageUpload}>Upload Image</button>
      <div> {response} </div>
    </div>
  );
};

export default UploadImage;
