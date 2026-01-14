# Model Placement Instructions

## Where to place your trained model

After training your model on Google Colab, place the `best.pt` file in the **root directory** of your project:

```
/home/nikola-tesla/projects/new folder/new/
├── best.pt  👈 Place your trained model here
├── main.py
├── train_fast.py
├── requirements.txt
└── ...
```

## Option 1: After Training Locally

If you trained using `train_fast.py` or `train_yolo.py`, the model is **automatically copied** to the root directory as `best.pt`.

## Option 2: After Training on Colab

1. Download `best.pt` from Google Colab
2. Place it in the project root directory
3. The file should be at the same level as `main.py`

## Verify Model Location

```bash
# Check if model exists
ls -lh best.pt

# Should show something like:
# -rw-r--r-- 1 user user 6.2M Jan 15 12:00 best.pt
```

## Start the API Server

Once `best.pt` is in place:

```bash
python main.py
```

The FastAPI server will automatically load the model from `best.pt` on startup.

## Model File Size

Expected size: **5-10 MB** (for YOLOv11n)
- YOLOv11n: ~6 MB
- YOLOv11s: ~22 MB
- YOLOv11m: ~50 MB

## Troubleshooting

### "Model not found" error
```bash
# Check current directory
pwd

# List files
ls -la

# Verify best.pt exists
[ -f best.pt ] && echo "✓ Model found" || echo "❌ Model not found"
```

### Model in wrong location
```bash
# If model is in nested directory, copy it:
cp runs/train/pcb_detection_fast/weights/best.pt ./best.pt
```

### Wrong model format
Make sure you downloaded the `.pt` file (PyTorch format), not `.onnx` or other formats.
