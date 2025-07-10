import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Upload.css";
import { API_URL } from "../CONST";
import { Link } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
}

export default function Upload() {
  const [fileInputState, setFileInputState] = useState<string>("");
  const [previewSource, setPreviewSource] = useState<
    string | ArrayBuffer | null
  >("");
  const [imageUrl, setImageUrl] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileInputState(e.target.value);
      previewFile(file);
    }
  };

  const uploadImage = async (
    base64EncodedImage: string | ArrayBuffer | null
  ) => {
    setIsUploading(true);
    try {
      const response = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-type": "application/json" },
      });
      const data = await response.json();

      setImageUrl(data.url);
      setShowForm(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!previewSource || typeof previewSource !== "string") return;
    uploadImage(previewSource);
  };

  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "id" ? parseInt(value) || 0 : value,
    }));
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/style`, {
        method: "POST",
        body: JSON.stringify({ ...formData, url: imageUrl }),
        headers: { "Content-type": "application/json" },
      });

      if (response.ok) {
        alert("Image data saved successfully!");
        // Reset form
        setFormData({ title: "", description: "" });
        setShowForm(false);
        setImageUrl("");
        setPreviewSource("");
        setFileInputState("");
      } else {
        alert("Failed to save image data");
      }
    } catch (error) {
      console.log(error);
      alert("Error saving image data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData({ title: "", description: "" });
    setPreviewSource("");
  };

  return (
    <div className="upload-container">
      <div className="upload-section">
        <h2>Upload Your Image</h2>
        <form onSubmit={handleSubmitFile} className="upload-form">
          <div className="file-input-wrapper">
            <input
              type="file"
              id="file-input"
              onChange={handleFileInputChange}
              value={fileInputState}
              accept="image/*"
              className="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 8L12 3L7 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 3V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {!previewSource ? (
                <>
                  <div className="upload-text">Drop your image here</div>
                  <div className="upload-hint">or click to browse files</div>
                </>
              ) : (
                <div className="upload-text">Image selected</div>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="upload-btn"
            disabled={!previewSource || isUploading}
          >
            {isUploading ? (
              <>
                <div className="spinner"></div>
                Uploading...
              </>
            ) : (
              "Upload Image"
            )}
          </button>
        </form>
        <Link to="/showimages">
          <button className="upload-btn show_btn">View Images</button>
        </Link>
      </div>

      {/* Modal Overlay */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Image Preview Section */}
            {previewSource && typeof previewSource === "string" && (
              <div className="modal-image-section">
                <img
                  src={previewSource}
                  alt="Upload Preview"
                  className="preview-image"
                />
              </div>
            )}

            {/* Form Section */}
            <div className="modal-form-section">
              <div className="modal-header">
                <h3>Add Image Details</h3>
                <button type="button" className="close-btn" onClick={closeForm}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="details-form">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleFormInputChange}
                    required
                    placeholder="Title"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleFormInputChange}
                    required
                    placeholder="Description"
                    rows={4}
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="spinner"></div>
                        Saving...
                      </>
                    ) : (
                      "Save Image"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
