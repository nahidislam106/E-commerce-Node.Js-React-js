"""
YOLOv11 Training Script for PCB Detection
Train the model to create best.pt file
"""
from ultralytics import YOLO
import os
import shutil

def train_model():
    # Initialize YOLOv11 model
    model = YOLO('yolo11n.pt')  # Using nano model for faster training
    
    # Train the model
    results = model.train(
        data='printed circuit board.v4-release-filtered.yolov11/data.yaml',
        epochs=100,
        imgsz=640,
        batch=16,
        name='pcb_detection',
        patience=20,
        save=True,
        device='0',  # Use GPU if available, otherwise 'cpu'
        project='runs/train',
        exist_ok=True,
        pretrained=True,
        optimizer='auto',
        verbose=True,
        seed=42,
        deterministic=True,
        single_cls=False,
        rect=False,
        cos_lr=False,
        close_mosaic=10,
        resume=False,
        amp=True,
        fraction=1.0,
        profile=False,
        freeze=None,
        lr0=0.01,
        lrf=0.01,
        momentum=0.937,
        weight_decay=0.0005,
        warmup_epochs=3.0,
        warmup_momentum=0.8,
        warmup_bias_lr=0.1,
        box=7.5,
        cls=0.5,
        dfl=1.5,
        pose=12.0,
        kobj=1.0,
        label_smoothing=0.0,
        nbs=64,
        hsv_h=0.015,
        hsv_s=0.7,
        hsv_v=0.4,
        degrees=0.0,
        translate=0.1,
        scale=0.5,
        shear=0.0,
        perspective=0.0,
        flipud=0.0,
        fliplr=0.5,
        mosaic=1.0,
        mixup=0.0,
        copy_paste=0.0
    )
    
    print("\n" + "="*50)
    print("Training completed!")
    print(f"Best model saved at: runs/train/pcb_detection/weights/best.pt")
    
    # Copy best.pt to root directory for easy access
    best_model_path = "runs/train/pcb_detection/weights/best.pt"
    if os.path.exists(best_model_path):
        shutil.copy(best_model_path, "best.pt")
        print("✓ Model copied to: best.pt (root directory)")
    
    print("="*50 + "\n")
    
    return results

if __name__ == "__main__":
    train_model()
