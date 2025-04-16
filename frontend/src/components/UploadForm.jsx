// frontend/src/components/UploadForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './UploadForm.css';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/api/predict', formData);
      setResult(response.data);
    } catch (error) {
      console.error('Prediction failed', error);
      setResult({ error: 'Prediction failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h1>Skin Disease Detector</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
        <button type="submit" className="submit-btn">
          {loading ? 'Predicting...' : 'Predict'}
        </button>
      </form>

      {result && (
        <div className="result-card">
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <>
              <h2>Prediction Result</h2>
              <p><strong>Disease:</strong> {result.disease}</p>
              <p><strong>Confidence:</strong> {(result.confidence * 100).toFixed(2)}%</p>
              <p><strong>Suggestion:</strong> {result.suggestion}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default UploadForm;
