#!/bin/bash

echo "=================================="
echo "Starting PCB Detection Backend"
echo "=================================="

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "❌ Virtual environment not found. Run ./setup.sh first"
    exit 1
fi

# Activate virtual environment
source venv/bin/activate

# Check if model exists
if [ ! -f "best.pt" ]; then
    echo "⚠️  Trained model not found!"
    echo "Would you like to train the model now? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo "Starting training..."
        python train_fast.py
    else
        echo "Please train the model first: python train_fast.py"
        exit 1
    fi
fi

# Start the server
echo ""
echo "Starting FastAPI server..."
echo "API will be available at: http://localhost:8000"
echo "Documentation at: http://localhost:8000/docs"
echo ""
uvicorn main:app --reload --host 0.0.0.0 --port 8000
