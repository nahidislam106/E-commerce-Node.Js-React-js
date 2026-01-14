"""
FastAPI Backend for PCB Detection using YOLOv11
"""
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import cv2
import numpy as np
from PIL import Image
import io
from typing import List, Dict, Any
import os
from pathlib import Path

app = FastAPI(
    title="PCB Detection API",
    description="YOLOv11-based API for detecting components on printed circuit boards",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model variable
model = None
MODEL_PATH = "best.pt"  # Model file in root directory

@app.on_event("startup")
async def load_model():
    """Load the trained YOLO model on startup"""
    global model
    try:
        if os.path.exists(MODEL_PATH):
            model = YOLO(MODEL_PATH)
            print(f"✓ Model loaded from {MODEL_PATH}")
        else:
            print(f"⚠ Model not found at {MODEL_PATH}. Please train the model first.")
            print("Run: python train_fast.py")
    except Exception as e:
        print(f"Error loading model: {e}")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "PCB Detection API",
        "status": "running",
        "model_loaded": model is not None,
        "endpoints": {
            "detect": "/detect",
            "detect_batch": "/detect/batch",
            "health": "/health",
            "model_info": "/model/info"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "model_path": MODEL_PATH if os.path.exists(MODEL_PATH) else "not found"
    }

@app.get("/model/info")
async def model_info():
    """Get model information"""
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    return {
        "model_type": "YOLOv11",
        "task": "detection",
        "classes": model.names,
        "num_classes": len(model.names),
        "model_path": MODEL_PATH
    }

@app.post("/detect")
async def detect_objects(
    file: UploadFile = File(...),
    conf_threshold: float = 0.25,
    iou_threshold: float = 0.45,
    return_image: bool = False
):
    """
    Detect PCB components in an uploaded image
    
    Args:
        file: Image file to process
        conf_threshold: Confidence threshold for detection (0-1)
        iou_threshold: IoU threshold for NMS (0-1)
        return_image: If True, returns annotated image
    
    Returns:
        Detection results with bounding boxes and confidence scores
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded. Please train the model first.")
    
    try:
        # Read image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Run inference
        results = model.predict(
            source=image,
            conf=conf_threshold,
            iou=iou_threshold,
            verbose=False
        )
        
        # Parse results
        detections = []
        for result in results:
            boxes = result.boxes
            for box in boxes:
                detection = {
                    "class_id": int(box.cls[0]),
                    "class_name": model.names[int(box.cls[0])],
                    "confidence": float(box.conf[0]),
                    "bbox": {
                        "x1": float(box.xyxy[0][0]),
                        "y1": float(box.xyxy[0][1]),
                        "x2": float(box.xyxy[0][2]),
                        "y2": float(box.xyxy[0][3])
                    }
                }
                detections.append(detection)
        
        response = {
            "filename": file.filename,
            "num_detections": len(detections),
            "detections": detections,
            "image_size": {
                "width": image.shape[1],
                "height": image.shape[0]
            }
        }
        
        # Return annotated image if requested
        if return_image:
            annotated_image = results[0].plot()
            _, buffer = cv2.imencode('.jpg', annotated_image)
            return StreamingResponse(
                io.BytesIO(buffer.tobytes()),
                media_type="image/jpeg",
                headers={"X-Detections": str(len(detections))}
            )
        
        return JSONResponse(content=response)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Detection failed: {str(e)}")

@app.post("/detect/batch")
async def detect_objects_batch(
    files: List[UploadFile] = File(...),
    conf_threshold: float = 0.25,
    iou_threshold: float = 0.45
):
    """
    Detect PCB components in multiple images
    
    Args:
        files: List of image files to process
        conf_threshold: Confidence threshold for detection (0-1)
        iou_threshold: IoU threshold for NMS (0-1)
    
    Returns:
        Batch detection results
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        batch_results = []
        
        for file in files:
            contents = await file.read()
            nparr = np.frombuffer(contents, np.uint8)
            image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if image is None:
                batch_results.append({
                    "filename": file.filename,
                    "error": "Invalid image file"
                })
                continue
            
            # Run inference
            results = model.predict(
                source=image,
                conf=conf_threshold,
                iou=iou_threshold,
                verbose=False
            )
            
            # Parse results
            detections = []
            for result in results:
                boxes = result.boxes
                for box in boxes:
                    detection = {
                        "class_id": int(box.cls[0]),
                        "class_name": model.names[int(box.cls[0])],
                        "confidence": float(box.conf[0]),
                        "bbox": {
                            "x1": float(box.xyxy[0][0]),
                            "y1": float(box.xyxy[0][1]),
                            "x2": float(box.xyxy[0][2]),
                            "y2": float(box.xyxy[0][3])
                        }
                    }
                    detections.append(detection)
            
            batch_results.append({
                "filename": file.filename,
                "num_detections": len(detections),
                "detections": detections
            })
        
        return {
            "total_images": len(files),
            "results": batch_results
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch detection failed: {str(e)}")

@app.post("/detect/count")
async def count_components(
    file: UploadFile = File(...),
    conf_threshold: float = 0.25
):
    """
    Count PCB components by type
    
    Args:
        file: Image file to process
        conf_threshold: Confidence threshold for detection (0-1)
    
    Returns:
        Component counts by type
    """
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Read image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Invalid image file")
        
        # Run inference
        results = model.predict(
            source=image,
            conf=conf_threshold,
            verbose=False
        )
        
        # Count components by class
        component_counts = {}
        for result in results:
            boxes = result.boxes
            for box in boxes:
                class_name = model.names[int(box.cls[0])]
                component_counts[class_name] = component_counts.get(class_name, 0) + 1
        
        return {
            "filename": file.filename,
            "total_components": sum(component_counts.values()),
            "components": component_counts
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Component counting failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
