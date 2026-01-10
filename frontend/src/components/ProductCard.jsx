import { Link } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product.id, 1);
  };

  return (
    <Link to={`/products/${product.id}`} className="card hover:shadow-lg transition-shadow">
      <div className="relative pb-[100%] mb-4 overflow-hidden rounded-lg">
        <img
          src={product.images?.[0]?.url || '/placeholder.jpg'}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </span>
        )}
      </div>

      <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
      
      <div className="flex items-center mb-2">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FiStar
              key={i}
              size={16}
              fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600 ml-2">
          ({product.numReviews})
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-2xl font-bold text-primary-600">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        className="btn btn-primary w-full"
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </Link>
  );
};

export default ProductCard;
