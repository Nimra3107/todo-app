import React, { useRef, useState } from 'react';

function TodoForm({ addTodo }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null); //This creates a reference to the <input type="file">.

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;
  //   setImageFile(file);
  //   setImagePreview(URL.createObjectURL(file));  //This creates a temporary URL for the selected image.
  //   setError('');
  // };

  const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setImageFile(file);
  const reader = new FileReader();
  reader.onload = () => {
    setImagePreview(reader.result);
  };
  reader.readAsDataURL(file);
  setError('');
};
  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';  //If the file input exists, clear its selected file.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (!imageFile) {
      setError("Image is required");
      return;
    }

    try {
      // let imageUrl = null;
      // if (imageFile) {
      //   setIsUploading(true);
      //   imageUrl = await uploadImageToCloudinary(imageFile);  //contains the permanent Cloudinary image URL.
      // }
      // addTodo(title, description, imageUrl);
      if (!imageFile) {
  setError("Image is required");
  return;
}

addTodo(title, description, imagePreview);
      setTitle('');
      setDescription('');
      removeImage();
    } catch (err) {
      setError(err.message || 'Something went wrong while uploading the image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="field-input title-input"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="field-input todo-description"
        placeholder="Add a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
      />

      <label className="image-dropzone" htmlFor="todo-image-input">
        {imagePreview ? (
          <div className="image-preview-wrap">
            <img src={imagePreview} alt="Selected preview" className="image-preview" />
            {/* So the browser displays the selected image. */}
            <button
              type="button"
              className="remove-image-btn"
              onClick={(e) => {
                e.preventDefault();
                removeImage();
              }}
            >
              Remove
            </button>
          </div>
        ) : (
          <span className="dropzone-label">+ Add a photo</span>
        )}
        <input
          id="todo-image-input"
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
          hidden
        />
      </label>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="todo-btn" disabled={isUploading}>
        {isUploading ? 'Uploading photo...' : 'Add task'}
      </button>
    </form>
  );
}

export default TodoForm;
