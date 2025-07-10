import { useState, useEffect } from "react";
import { X, Save, Trash2 } from "lucide-react";
import "../styles/ShowImages.css";
import { API_URL } from "../CONST";

type ImageData = {
  _id: string;
  url: string;
  title: string;
  description: string;
};

export default function ShowImages() {
  const [images, setImages] = useState<ImageData[] | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [editForm, setEditForm] = useState<ImageData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getImages = async () => {
    const response = await fetch(`${API_URL}/api/style`);
    const data = await response.json();
    setImages(data);
  };

  useEffect(() => {
    getImages();
  }, []);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setEditForm({ ...image });
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
    setEditForm(null);
    setShowDeleteConfirm(false);
  };

  const handleFormChange = (field: keyof ImageData, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!editForm || !images) return;

    try {
      // Update the image in your backend
      const response = await fetch(`${API_URL}/api/style/${editForm._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        // Update local state
        setImages(
          images.map((img) => (img._id === editForm._id ? editForm : img))
        );
        handleClosePopup();
      }
    } catch (error) {
      console.error("Failed to update image:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedImage || !images) return;

    try {
      const response = await fetch(
        `${API_URL}/api/style/${selectedImage._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // Remove from local state
        setImages(images.filter((img) => img._id !== selectedImage._id));
        handleClosePopup();
      }
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="show_images_container">
      <h1 className="show_images_title">Click an image to modify or delete.</h1>

      <div className="show_images_collage">
        {images &&
          images.map((image) => (
            <div
              key={image._id}
              className="image_item"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="image_preview"
              />
              <div className="image-overlay" />
              <div className="image-info">
                <h3 className="image-title">{image.title}</h3>
              </div>
            </div>
          ))}
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedImage && editForm && (
        <div className="modal-backdrop">
          <div className="modal-container">
            {/* Header */}
            <div className="modal-header">
              <h2 className="modal-title">Edit Image</h2>
              <button onClick={handleClosePopup} className="close-button">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="modal-content">
              {/* Image Preview */}
              <div className="preview-container">
                <img
                  src={editForm.url}
                  alt={editForm.title}
                  className="preview-image"
                />
              </div>

              {/* Form Fields */}
              <div className="form-container">
                <div className="form-field">
                  {/* <label className="form-label">URL</label>
                  <input
                    type="url"
                    value={editForm.url}
                    onChange={(e) => handleFormChange("url", e.target.value)}
                    className="form-input"
                    placeholder="Enter image URL"
                  /> */}
                </div>

                <div className="form-field">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => handleFormChange("title", e.target.value)}
                    className="form-input"
                    placeholder="Enter image title"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      handleFormChange("description", e.target.value)
                    }
                    rows={7}
                    className="form-textarea"
                    placeholder="Enter image description"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-actions">
              <button onClick={confirmDelete} className="delete-button">
                <Trash2 size={16} />
                Delete
              </button>

              <div className="action-buttons">
                {/* <button onClick={handleAcceptUrl} className="accept-button">
                  <Check size={16} />
                  Accept URL
                </button> */}
                <button onClick={handleSave} className="save-button">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <h3 className="confirm-title">Delete Image</h3>
            <p className="confirm-message">
              Are you sure you want to delete this image? This action cannot be
              undone.
            </p>
            <div className="confirm-actions">
              <button onClick={cancelDelete} className="cancel-button">
                Cancel
              </button>
              <button onClick={handleDelete} className="confirm-delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
