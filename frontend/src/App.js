import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setResults(null);
      setError(null);
    } else {
      setError('Please select a valid image file');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setResults(null);
    setError(null);
  };

  const handleDetect = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/detect', formData, {
        params: {
          conf_threshold: 0.25,
          return_image: false
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResults(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Detection failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getComponentCounts = () => {
    if (!results) return {};
    const counts = {};
    results.detections.forEach(det => {
      counts[det.class_name] = (counts[det.class_name] || 0) + 1;
    });
    return counts;
  };

  const componentCounts = getComponentCounts();

  return (
    <div className="app-container">
      <header className="header">
        <h1>🔍 PCB Detection System</h1>
        <p>Powered by YOLOv11 - Detect 23 types of PCB components instantly</p>
      </header>

      <div className="main-content">
        {/* Upload Section */}
        <div className="upload-section">
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Upload PCB Image</h2>
          
          <div
            className={`upload-area ${dragging ? 'dragging' : ''}`}
            onClick={() => document.getElementById('fileInput').click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="upload-icon">📤</div>
            <div className="upload-text">
              {selectedFile ? 'Change Image' : 'Click or Drag to Upload'}
            </div>
            <div className="upload-subtext">
              Supports: JPG, PNG, JPEG
            </div>
          </div>

          <input
            id="fileInput"
            type="file"
            className="file-input"
            accept="image/*"
            onChange={handleFileSelect}
          />

          {selectedFile && (
            <div className="selected-file">
              <span className="file-name">📄 {selectedFile.name}</span>
              <button className="remove-btn" onClick={handleRemoveFile}>
                Remove
              </button>
            </div>
          )}

          {imagePreview && (
            <div style={{ marginBottom: '20px' }}>
              <img
                src={imagePreview}
                alt="Preview"
                className="image-preview"
              />
            </div>
          )}

          <button
            className="detect-btn"
            onClick={handleDetect}
            disabled={!selectedFile || loading}
          >
            {loading ? '🔄 Detecting...' : '🎯 Detect Components'}
          </button>

          {error && (
            <div className="error" style={{ marginTop: '20px' }}>
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Results Section */}
        <div className="results-section">
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Detection Results</h2>

          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <div className="loading-text">Analyzing PCB components...</div>
            </div>
          )}

          {!loading && !results && (
            <div className="no-results">
              <div className="no-results-icon">🔎</div>
              <p>Upload and detect an image to see results</p>
            </div>
          )}

          {results && (
            <>
              <div className="results-header">
                <span className="results-title">Components Found</span>
                <span className="detection-count">
                  {results.num_detections} detected
                </span>
              </div>

              {results.num_detections > 0 ? (
                <>
                  <div className="component-list">
                    {results.detections.map((detection, index) => (
                      <div key={index} className="component-item">
                        <span className="component-name">
                          {detection.class_name}
                        </span>
                        <span className="component-confidence">
                          {(detection.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="component-stats">
                    <div className="stat-card">
                      <div className="stat-value">{results.num_detections}</div>
                      <div className="stat-label">Total Components</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">
                        {Object.keys(componentCounts).length}
                      </div>
                      <div className="stat-label">Unique Types</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">
                        {(results.detections.reduce((sum, d) => sum + d.confidence, 0) / results.detections.length * 100).toFixed(0)}%
                      </div>
                      <div className="stat-label">Avg Confidence</div>
                    </div>
                  </div>

                  <div style={{ marginTop: '30px' }}>
                    <h3 style={{ marginBottom: '15px', color: '#333' }}>Component Breakdown</h3>
                    {Object.entries(componentCounts).map(([name, count]) => (
                      <div key={name} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 0',
                        borderBottom: '1px solid #f0f0f0'
                      }}>
                        <span style={{ color: '#666' }}>{name}</span>
                        <span style={{ fontWeight: '600', color: '#667eea' }}>{count}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">❌</div>
                  <p>No components detected in this image</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
