#!/bin/bash

echo "=================================="
echo "PCB Detection - Full Stack Setup"
echo "=================================="

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not installed"
    exit 1
fi
echo "✓ Python3 found"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed"
    exit 1
fi
echo "✓ Node.js found"

# Setup Backend
echo ""
echo "Setting up Backend..."
pip install -r requirements.txt

# Setup Frontend
echo ""
echo "Setting up Frontend..."
cd frontend
npm install
cd ..

echo ""
echo "=================================="
echo "✓ Setup Complete!"
echo "=================================="
echo ""
echo "Next Steps:"
echo ""
echo "1. Train the model (or upload trained best.pt):"
echo "   python train_fast.py"
echo ""
echo "2. Start Backend (Terminal 1):"
echo "   python main.py"
echo ""
echo "3. Start Frontend (Terminal 2):"
echo "   cd frontend && npm start"
echo ""
echo "4. Open http://localhost:3000"
echo ""
echo "=================================="
