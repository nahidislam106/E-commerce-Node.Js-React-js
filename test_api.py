"""
Test the FastAPI endpoints
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test health endpoint"""
    print("\n=== Testing Health Endpoint ===")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_model_info():
    """Test model info endpoint"""
    print("\n=== Testing Model Info Endpoint ===")
    response = requests.get(f"{BASE_URL}/model/info")
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")

def test_detect(image_path):
    """Test detection endpoint"""
    print(f"\n=== Testing Detection Endpoint ===")
    print(f"Image: {image_path}")
    
    try:
        with open(image_path, 'rb') as f:
            files = {'file': f}
            params = {
                'conf_threshold': 0.25,
                'return_image': False
            }
            response = requests.post(f"{BASE_URL}/detect", files=files, params=params)
            print(f"Status: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
    except FileNotFoundError:
        print(f"❌ Image not found: {image_path}")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_count(image_path):
    """Test component counting endpoint"""
    print(f"\n=== Testing Component Counting ===")
    print(f"Image: {image_path}")
    
    try:
        with open(image_path, 'rb') as f:
            files = {'file': f}
            params = {'conf_threshold': 0.25}
            response = requests.post(f"{BASE_URL}/detect/count", files=files, params=params)
            print(f"Status: {response.status_code}")
            print(f"Response: {json.dumps(response.json(), indent=2)}")
    except FileNotFoundError:
        print(f"❌ Image not found: {image_path}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    # Test basic endpoints
    test_health()
    test_model_info()
    
    # Test with sample image (update path as needed)
    sample_image = "printed circuit board.v4-release-filtered.yolov11/test/images/pcb107rec1_jpg.rf.4b596fe8d7cab0fb5194faea8a586d01.jpg"
    test_detect(sample_image)
    test_count(sample_image)
