"""
Fast YOLOv11 Training Script (Optimized for Quick Results)
"""
from ultralytics import YOLO
import shutil
import os

def train_model_fast():
    # Initialize YOLOv11 model
    model = YOLO('yolo11n.pt')  # Nano model - fastest
    
    # Fast training with fewer epochs
    results = model.train(
        data='printed circuit board.v4-release-filtered.yolov11/data.yaml',
        epochs=50,  # Reduced epochs for faster training
        imgsz=640,
        batch=16,
        name='pcb_detection_fast',
        patience=10,
        save=True,
        device='0',
        project='runs/train',
        exist_ok=True,
        cache=True,  # Cache images for faster training
        workers=8,
        verbose=True
    )
    
    print("\n" + "="*50)
    print("Fast training completed!")
    print(f"Best model saved at: runs/train/pcb_detection_fast/weights/best.pt")
    
    # Copy best.pt to root directory for easy access
    best_model_path = "runs/train/pcb_detection_fast/weights/best.pt"
    if os.path.exists(best_model_path):
        shutil.copy(best_model_path, "best.pt")
        print("✓ Model copied to: best.pt (root directory)")
    
    print("="*50 + "\n")
    
    return results

if __name__ == "__main__":
    train_model_fast()
