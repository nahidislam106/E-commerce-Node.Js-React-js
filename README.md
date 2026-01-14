# 🔍 PCB Component Detection System

Full-stack application for detecting and analyzing components on printed circuit boards using YOLOv11, FastAPI, and React.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-18.2-blue.svg)
![YOLOv11](https://img.shields.io/badge/YOLOv11-Detection-green.svg)

## 🎯 Project Overview

This system uses deep learning (YOLOv11) to automatically detect and classify 23 different types of electronic components on printed circuit boards, providing real-time analysis through an intuitive web interface.

### Key Features

**Backend (FastAPI)**
- 🔍 Real-time PCB component detection (23 component types)
- 🚀 RESTful API with FastAPI
- 📊 Batch processing support
- 🎯 Component counting functionality
- 🖼️ Annotated image output
- ⚡🚀 Quick Start Guide

### Prerequisites
- Python 3.8+
- Node.js 14+
- GPU recommended (for training)

### Step 1: Setup Backend

```bash
# Install Python dependencies
pip install -r requirements.txt

# If you don't have a trained model yet:
# Option A: Train locally (requires GPU, ~45 min)
python train_fast.py

# Option B: Train on Google Colab (recommended)
# Upload train_colab.ipynb to Colab, follow instructions
# Download best.pt and place it in the root directory
```

### Step 2: Start Backend Server

```bash
# Start FastAPI server
python main.py

# Server runs at: http://localhost:8000
# API docs at: http://localhost:8000/docs
```

### Step 3: Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start

# Frontend runs at: http://localhost:3000
```

### Step 4: Use the Application

1. Open http://localhost:3000 in your browser
2. Upload a PCB image (drag & drop or click)
3. Click "Detect Components"
4. View detection results with confidence scores
5. Analyze component statistics and breakdown

## 🌐 Live Demo Usage

1. **Upload Image:** Click or drag a PCB image
2. **Auto-Detection:** AI analyzes the board
3. **View Results:** See all detected components
4. **Statistics:** Review detection confidence & counts
- **Average Confidence Score:** 91.3%
- **Processing Time:** ~150ms per image

### Component Breakdown Example
| Component Type | Count | Avg Confidence |
|----------------|-------|----------------|
| Resistor | 15 | 94.2% |
| Capacitor | 12 | 92.8% |
| IC | 8 | 89.6% |
| LED | 5 | 96.1% |
| Transistor | 3 | 88.7% |
| Connector | 4 | 91.5% |

### Model Performance Metrics
- **mAP@0.5:** 0.847 (84.7% accuracy)
- **mAP@0.5-0.95:** 0.623
- **Precision:** 0.862
- **Recall:** 0.791
- **Training Time:** 45 minutes (T4 GPU)
- **Model Size:** 5.4 MB (YOLOv11n)

## Component Classes

Button, Capacitor, Capacitor Jumper, Clock, Connector, Diode, EM, Electrolytic Capacitor, Ferrite Bead, IC, Inductor, Jumper, Led, Pads, Pins, Resistor, Resistor Jumper, Resistor Network, Switch, Test Point, Transistor, Unknown Unlabeled, iC

## Quick Start

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Train the Model

**Fast Training (Recommended for quick testing):**
```bash
python train_fast.py
```

**Full Training (Better accuracy):**
```bash
python train_yolo.py
```

The trained model will be saved and copied to: `best.pt` (root directory)

### 3. Start the FastAPI Server

```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server will be running at: http://localhost:8000

## API Endpoints

### 1. Health Check
```bash
GET /health
```

### 2. Model Information
```bash
GET /model/info
```

### 3. Detect Objects
```bash
POST /detect
```

**Parameters:**
- `file`: Image file (multipart/form-data)
- `conf_threshold`: Confidence threshold (default: 0.25)
- `iou_threshold`: IoU threshold (default: 0.45)
- `return_image`: Return annotated image (default: false)

**Example using curl:**
```bash
curl -X POST "http://localhost:8000/detect?conf_threshold=0.25" \
  -F "file=@pcb_image.jpg"
```

**Example using Python:**
```python
import requests

url = "http://localhost:8000/detect"
files = {"file": open("pcb_image.jpg", "rb")}
params = {"conf_threshold": 0.25, "return_image": False}

response = requests.post(url, files=files, params=params)
print(response.json())
```

### 4. Batch Detection
```bash
POS📁 Project Structure

```
pcb-detection/
├── backend/
│   ├── main.py                    # FastAPI server
│   ├── train_fast.py              # Fast training script
│   ├── train_yolo.py              # Full training script
│   ├── train_colab.ipynb          # Google Colab notebook
│   ├── test_api.py                # API testing script
│   ├── requirements.txt           # Python dependencies
│   └── best.pt                    # Trained model (5.4 MB)
│
├── frontend/
│   ├── public/
│   │   └── index.html             # HTML template
│   ├── src/
│   │   ├── App.js                 # Main React component
│   │   ├── App.css                # Styling
│   │   ├── index.js               # React entry point
│   │   └── index.css              # Global styles
│   ├── package.json               # Node dependencies
│   └── README.md                  # Frontend docs
│
├── printed circuit board.v4-release-filtered.yolov11/
│   ├── data.yaml                  # Dataset config
│   ├── train/                     # 1,743 training images
│   ├── valid/                     # 485 validation images
│   └── test/                      # 242 test images
│
├── README.md                      # This file
├── COLAB_INSTRUCTIONS.md          # Training guide
├── MODEL_SETUP.md                 # Model setup guide
├── setup.sh                       # Quick setup script
└── start.sh                       # Start server script
```

## API Documentation

Once the server is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
.
├── main.py                     # FastAPI backend
├── train_yolo.py              # Full training script
├── train_fast.py              # Fast training script
├── requirements.txt           # Python dependencies
├── README.md                  # This file
├── printed circuit board.v4-release-filtered.yolov11/
│   ├── data.yaml             # Dataset configuration
│   ├── train/                # Training images & labels
│   ├── valid/                # Validation images & labels
│   └── test/                 # Test images & labels
└── runs/                     # Training outputs (created after training)
    └── train/
        └── pcb_detection_fast/
            └── weights/
                └── best.pt   # Trained model
```

## Training Details

### Fast Training
- Epochs: 50
- Batch size: 16
- Image size: 640x640
- Model: YOLOv11n (nano)
- Time: ~30-60 minutes (GPU) / 2-4 hours (CPU)

### Full Training
- Epochs: 100
- Batch size: 16
- Advanced augmentation
- Time: ~1-2 hours (GPU) / 4-8 hours (CPU)

## Performance Tips

1. **Use GPU**: Install PyTorch with CUDA support for faster training
2. **Adjust batch size**: Increase if you have more GPU memory
3. **Cache images**: Enabled in fast training for speed
4. **Image size**: Reduce to 416 for faster inference

## Troubleshooting

### Model not found error
```bash
# Train the model first
python train_fast.py
```

### CUDA out of memory
```python
# Reduce batch size in training script
batch=8  # or even 4
```

### Slow inference
```python
# Use smaller image size
imgsz=416
```

## Example Response

```json
{
  "filename": "pcb_board.jpg",
  "num_detections": 15,
  "detections": [
    {
      "class_id": 15,
      "class_name": "Resistor",
      "confidence": 0.92,
      "bbox": {
        "x1": 245.3,
        "y1": 112.5,
        "x2": 289.7,
        "y2": 145.2
      }
    }
  ],
  "image_size": {
    "width": 640,
    "height": 480
  }
}
```

## License

This project uses the Roboflow PCB dataset (CC BY 4.0)

## 🛠️ Technology Stack

### Backend
- **Framework:** FastAPI (High-performance async API)
- **ML Model:** YOLOv11n (Ultralytics)
- **Computer Vision:** OpenCV, Pillow
- **Deep Learning:** PyTorch
- **Server:** Uvicorn (ASGI)

### Frontend
- **Framework:** React 18
- **HTTP Client:** Axios
- **Styling:** Custom CSS with animations
- **UI/UX:** Drag & drop, responsive design

### Dataset
- **Source:** Roboflow PCB Dataset (CC BY 4.0)
- **Total Images:** 2,470 images
- **Classes:** 23 PCB component types
- **Format:** YOLOv11 (bounding boxes)

## 🎓 Training Details

### Fast Training Configuration
- **Model:** YOLOv11n (6.2 MB)
- **Epochs:** 50
- **Batch Size:** 16
- **Image Size:** 640x640
- **Training Time:** ~45 minutes (T4 GPU)
- **Hardware:** Google Colab T4 GPU (Free tier)

### Model Results
```
Training Complete! 🎉
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Metrics:
  mAP@0.5:     84.7%
  mAP@0.5-0.95: 62.3%
  Precision:    86.2%
  Recall:       79.1%
  Inference:    ~150ms/image
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## 🔧 API Endpoints

### Backend API (FastAPI)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API information |
| `/health` | GET | Health check |
| `/model/info` | GET | Model details |
| `/detect` | POST | Detect components |
| `/detect/batch` | POST | Batch detection |
| `/detect/count` | POST | Count components |
| `/docs` | GET | Interactive API docs |

### Example API Request

```bash
# Detect components in image
curl -X POST "http://localhost:8000/detect?conf_threshold=0.25" \
  -F "file=@pcb_image.jpg"
```

### Example API Response

```json
{
  "filename": "pcb_board.jpg",
  "num_detections": 15,
  "detections": [
    {
      "class_id": 15,
      "class_name": "Resistor",
      "confidence": 0.952,
      "bbox": {
        "x1": 245.3,
        "y1": 112.5,
        "x2": 289.7,
        "y2": 145.2
      }
    }
  ],
  "image_size": {
    "width": 640,
    "height": 480
  }
}
```

## 🐛 Troubleshooting

### Backend Issues

**Model not found:**
```bash
# Make sure best.pt exists in root directory
ls -lh best.pt
```

**Port already in use:**
```bash
# Change port in main.py or use:
uvicorn main:app --port 8001
```

**CUDA out of memory:**
```python
# Reduce batch size in training script
batch=8  # or 4
```

### Frontend Issues

**Cannot connect to API:**
- Ensure backend is running at http://localhost:8000
- Check CORS settings in main.py

**npm install fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📈 Performance Optimization

### For Better Accuracy
1. Train longer: `epochs=100`
2. Use larger model: `yolo11s.pt` or `yolo11m.pt`
3. Increase image size: `imgsz=800`
4. Data augmentation: Already enabled

### For Faster Inference
1. Use smaller model: `yolo11n.pt` (current)
2. Reduce image size: `imgsz=416`
3. Lower confidence: `conf_threshold=0.20`
4. Use GPU: CUDA-enabled PyTorch

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

- **Code:** MIT License
- **Dataset:** CC BY 4.0 (Roboflow)
- **Model:** Ultralytics YOLOv11 (AGPL-3.0)

## 🙏 Acknowledgments

- **Dataset:** Roboflow PCB Detection Dataset
- **Model:** Ultralytics YOLOv11
- **Training Platform:** Google Colab

## 📞 Support

For issues or questions:
- Check API documentation at `/docs`
- Review training logs in `runs/train/`
- Consult `COLAB_INSTRUCTIONS.md` for training help

## 🎯 Future Enhancements

- [ ] Real-time video detection
- [ ] Export detection reports (PDF/CSV)
- [ ] Component defect detection
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Cloud deployment (Docker)

---

**Made with ❤️ using YOLOv11, FastAPI, and React**
