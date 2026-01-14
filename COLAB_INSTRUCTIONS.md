# Training YOLOv11 on Google Colab

## Quick Start Guide

### Step 1: Upload to Google Colab

1. Go to [Google Colab](https://colab.research.google.com/)
2. Click **File → Upload notebook**
3. Upload `train_colab.ipynb`
4. Or click **File → Open notebook → GitHub** and paste the notebook URL

### Step 2: Enable GPU

⚠️ **Important:** You need a GPU for faster training!

1. Go to **Runtime → Change runtime type**
2. Select **T4 GPU** (or L4, A100 if available)
3. Click **Save**

### Step 3: Prepare Your Dataset

**Option A: Upload ZIP (Recommended)**

1. Zip your dataset folder on your local machine:
```bash
cd "/home/nikola-tesla/projects/new folder/new"
zip -r pcb_dataset.zip "printed circuit board.v4-release-filtered.yolov11"
```

2. Run the upload cell in Colab
3. Select the ZIP file when prompted

**Option B: Upload to Google Drive**

1. Upload your dataset to Google Drive
2. In Colab, mount Drive and copy dataset:
```python
!cp -r /content/drive/MyDrive/your-dataset-folder /content/
```

**Option C: Download from Roboflow**

The dataset is already on Roboflow, you can download it directly in Colab.

### Step 4: Run All Cells

1. Click **Runtime → Run all** or run cells one by one
2. The notebook will:
   - Check GPU availability
   - Install dependencies
   - Upload/prepare dataset
   - Train YOLOv11 model
   - Validate and test
   - Save results

### Step 5: Download Your Model

After training completes:

1. Run the download cell (cell #12)
2. Download `best.pt` to your computer
3. Place it in your FastAPI project at:
   ```
   runs/train/pcb_detection_fast/weights/best.pt
   ```

## Training Time Estimates

| GPU Type | Epochs | Estimated Time |
|----------|--------|----------------|
| T4       | 50     | 30-45 min      |
| L4       | 50     | 20-30 min      |
| A100     | 50     | 10-15 min      |
| CPU      | 50     | 4-6 hours ❌   |

## Training Parameters

You can adjust these in Cell #7:

```python
epochs=50,        # Number of training epochs (50-100)
batch=16,         # Batch size (reduce if OOM: 8, 4)
imgsz=640,        # Image size (640 recommended)
patience=10,      # Early stopping patience
```

## Troubleshooting

### "CUDA out of memory"
```python
# Reduce batch size
batch=8  # or even 4
```

### "Dataset not found"
- Check DATASET_PATH variable in Cell #5
- Verify dataset was uploaded/extracted correctly
- Run `!ls -la /content/` to see contents

### "No GPU detected"
- Go to Runtime → Change runtime type → GPU
- Restart runtime

### Slow training
- Make sure GPU is enabled
- Reduce image size: `imgsz=416`
- Use smaller model: Already using `yolo11n.pt`

## After Training

Your trained model will be saved at:
- Colab: `/content/runs/train/pcb_detection/weights/best.pt`
- Google Drive: `/content/drive/MyDrive/PCB_Detection_Models/best.pt`

### Model Performance Metrics

After training, you'll see:
- **mAP50**: Mean Average Precision at 0.5 IoU
- **mAP50-95**: Mean Average Precision at 0.5-0.95 IoU
- **Precision**: Correctly predicted / total predicted
- **Recall**: Correctly predicted / total actual

Good model: mAP50 > 0.80

## Using the Model

Once downloaded, use it in your FastAPI backend:

```python
from ultralytics import YOLO

# Load your trained model
model = YOLO('best.pt')

# Run inference
results = model.predict('pcb_image.jpg', conf=0.25)

# Process results
for result in results:
    boxes = result.boxes
    for box in boxes:
        class_name = model.names[int(box.cls[0])]
        confidence = float(box.conf[0])
        print(f"{class_name}: {confidence:.2f}")
```

## Tips for Better Results

1. **More epochs**: Increase to 100 for better accuracy
2. **Larger model**: Use `yolo11s.pt` or `yolo11m.pt`
3. **Data augmentation**: Already enabled in the notebook
4. **Early stopping**: Set `patience=20` for more training
5. **Multiple runs**: Train multiple times and pick the best

## Saving Your Work

The notebook automatically:
- ✓ Saves model to Google Drive
- ✓ Saves all training plots
- ✓ Saves validation results
- ✓ Downloads best.pt to your computer

## Need Help?

Common issues:
- Dataset format: Check `data.yaml` paths
- GPU access: Enable in Runtime settings
- Training errors: Check console output
- Model performance: Try more epochs or larger model

## Free vs Paid Colab

**Free Tier:**
- T4 GPU access
- Limited compute units
- Session timeout after 12 hours
- Works fine for this project!

**Colab Pro ($10/month):**
- Better GPUs (A100, L4)
- More compute units
- Longer sessions
- Background execution

For this project, **free tier is sufficient**!
