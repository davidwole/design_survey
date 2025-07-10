import React, { useState } from "react";
import { Upload, ImageIcon, Copy, Check, AlertCircle } from "lucide-react";
import "../styles/ImageUpload.css";

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  [key: string]: any;
}

export default function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // You'll need to replace these with your actual Cloudinary credentials
  const CLOUDINARY_UPLOAD_PRESET = "e273261a-69ec-4326-879a-722c98d29bcb"; // Replace with your upload preset
  const CLOUDINARY_CLOUD_NAME = "ghlsurvey"; // Replace with your cloud name

  const handleFileSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setError("");
        setUploadedUrl("");

        // Create preview URL
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
      } else {
        setError("Please select an image file");
        setSelectedFile(null);
        setPreviewUrl("");
      }
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data: CloudinaryResponse = await response.json();
      setUploadedUrl(data.secure_url);

      // Clean up preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl("");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(`Upload failed: ${errorMessage}`);
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(uploadedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const resetUpload = (): void => {
    setSelectedFile(null);
    setUploadedUrl("");
    setError("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="header">
          <div className="header-icon">
            <div className="icon-circle">
              <ImageIcon className="icon" />
            </div>
          </div>
          <h1 className="title">Cloudinary Image Upload</h1>
          <p className="subtitle">
            Upload your images and get shareable URLs instantly
          </p>
        </div>

        <div className="upload-card">
          {!uploadedUrl && (
            <>
              {/* File Upload Area */}
              <div className="upload-section">
                <label htmlFor="file-upload" className="upload-label">
                  <div className="upload-zone">
                    <Upload className="upload-icon" />
                    <p className="upload-title">Click to upload an image</p>
                    <p className="upload-subtitle">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="file-input"
                  />
                </label>
              </div>

              {/* Selected File Preview */}
              {selectedFile && (
                <div className="file-preview">
                  <div className="preview-content">
                    <div className="preview-info">
                      {previewUrl && (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="preview-thumbnail"
                        />
                      )}
                      <div className="file-details">
                        <p className="file-name">{selectedFile.name}</p>
                        <p className="file-size">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button onClick={resetUpload} className="remove-button">
                      <svg
                        className="remove-icon"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`upload-button ${uploading ? "uploading" : ""} ${
                  !selectedFile ? "disabled" : ""
                }`}
              >
                {uploading ? (
                  <>
                    <div className="spinner"></div>
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="button-icon" />
                    <span>Upload Image</span>
                  </>
                )}
              </button>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}

          {/* Success Result */}
          {uploadedUrl && (
            <div className="success-section">
              <div className="success-header">
                <div className="success-icon-circle">
                  <svg
                    className="success-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="success-title">Upload Successful!</h2>
                <p className="success-subtitle">
                  Your image has been uploaded to Cloudinary
                </p>
              </div>

              {/* Uploaded Image Preview */}
              <div className="uploaded-image-container">
                <img
                  src={uploadedUrl}
                  alt="Uploaded"
                  className="uploaded-image"
                />
              </div>

              {/* URL Display */}
              <div className="url-section">
                <label className="url-label">Public URL:</label>
                <div className="url-container">
                  <input
                    type="text"
                    value={uploadedUrl}
                    readOnly
                    className="url-input"
                  />
                  <button onClick={copyToClipboard} className="copy-button">
                    {copied ? (
                      <>
                        <Check className="button-icon" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="button-icon" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Upload Another Button */}
              <button onClick={resetUpload} className="secondary-button">
                Upload Another Image
              </button>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="instructions-card">
          <h3 className="instructions-title">Setup Instructions:</h3>
          <ol className="instructions-list">
            <li>Create a free Cloudinary account at cloudinary.com</li>
            <li>Go to your Cloudinary Dashboard</li>
            <li>Create an upload preset in Settings → Upload</li>
            <li>Copy your Cloud Name from the dashboard</li>
            <li>
              Replace the variables in the code with your actual credentials
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
