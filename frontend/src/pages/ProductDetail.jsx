import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(id, quantity);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={product.images?.[selectedImage]?.url || '/placeholder.jpg'}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-primary-600' : ''
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={20}
                  fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.numReviews} reviews)
            </span>
          </div>

          <div className="mb-6">
            <span className="text-3xl font-bold text-primary-600">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-3 text-xl text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.discount > 0 && (
              <span className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                {product.discount}% OFF
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Brand: <span className="font-semibold">{product.brand}</span>
            </p>
            <p className="text-sm text-gray-600">
              Stock: <span className="font-semibold">{product.stock} units available</span>
            </p>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="btn btn-primary flex-1 flex items-center justify-center"
              disabled={product.stock === 0}
            >
              <FiShoppingCart className="mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button className="btn btn-outline p-3">
              <FiHeart size={24} />
            </button>
          </div>

          {product.features && product.features.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Key Features:</h3>
              <ul className="list-disc list-inside space-y-1">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="text-gray-700">{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
