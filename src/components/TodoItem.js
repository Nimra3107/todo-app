import React, { useRef, useState } from 'react';

function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(todo.image || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setEditImageFile(file);

  const reader = new FileReader();

  reader.onload = () => {
    setEditImagePreview(reader.result);
  };

  reader.readAsDataURL(file);

  setError('');
};

  const removeImage = () => {
    setEditImageFile(null);
    setEditImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;
    setError('');

    try {
      let imageUrl = editImagePreview;
      editTodo(todo.id, editTitle, editDescription, imageUrl);
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Something went wrong while uploading the image.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form className="edit-form" onSubmit={handleUpdate}>
          <input
            type="text"
            className="field-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            className="field-input todo-description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows="3"
          />

          <label className="image-dropzone" htmlFor={`edit-image-${todo.id}`}>  
            {/*tells the label which input it belongs to. */}
            {editImagePreview ? (
              <div className="image-preview-wrap">
                <img src={editImagePreview} alt="Selected preview" className="image-preview" />
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
              <span className="dropzone-label">+ Add a photo (optional)</span>
            )}
            <input
              id={`edit-image-${todo.id}`}
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="btn-group">
            <button type="submit" className="save-btn" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Save'}
            </button>
            <button type="button" className="cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <input
            className="checkbox"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          {todo.image && (
            <img
              src={todo.image}
              alt={todo.title}
              className="todo-thumb"
              onClick={() => toggleComplete(todo.id)}
            />
          )}
          <div className="todo-content" onClick={() => toggleComplete(todo.id)}>
            <span className="todo-title">{todo.title}</span>
            {todo.description && <p className="todo-desc-text">{todo.description}</p>}
          </div>
          <div className="btn-group">
            <button className="edit-btn" onClick={() => setIsEditing(true)} disabled={todo.completed}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoItem;
