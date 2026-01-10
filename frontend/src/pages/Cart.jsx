import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import api from '../utils/api';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartDetails();
  }, [cart]);

  const fetchCartDetails = async () => {
    if (cart.items.length === 0) {
      setLoading(false);
      return;
    }

    try {
      const productIds = cart.items.map(item => item.product || item.productId);
      const promises = productIds.map(id => api.get(`/products/${id}`));
      const responses = await Promise.all(promises);
      
      const itemsWithDetails = cart.items.map((item, idx) => ({
        ...item,
        productDetails: responses[idx].data,
      }));
      
      setCartItems(itemsWithDetails);
    } catch (error) {
      console.error('Error fetching cart details:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.productDetails?.price || 0) * item.quantity;
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <FiShoppingBag size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some products to get started!</p>
        <Link to="/products" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product} className="card flex gap-4">
                <img
                  src={item.productDetails?.images?.[0]?.url || '/placeholder.jpg'}
                  alt={item.productDetails?.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{item.productDetails?.name}</h3>
                  <p className="text-primary-600 font-bold mb-2">
                    ${item.productDetails?.price}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateCartItem(item.product, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateCartItem(item.product, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg">
                    ${(item.productDetails?.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="card sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${calculateTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${(parseFloat(calculateTotal()) + 10 + parseFloat(calculateTotal()) * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link to="/checkout" className="btn btn-primary w-full mb-3">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="btn btn-secondary w-full">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
