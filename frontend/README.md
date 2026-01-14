# PCB Detection Frontend

React.js frontend for the PCB Detection API.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at http://localhost:3000

## Features

- 📤 Drag & drop image upload
- 🎯 Real-time PCB component detection
- 📊 Visual results with confidence scores
- 📈 Component statistics and breakdown
- 🎨 Modern, responsive UI

## Usage

1. Upload a PCB image
2. Click "Detect Components"
3. View detected components with confidence scores
4. See component breakdown and statistics

## API Integration

The frontend connects to the FastAPI backend at http://localhost:8000

Make sure the backend is running before starting the frontend.

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.
