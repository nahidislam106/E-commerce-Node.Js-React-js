import { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0, totalItems: 0 });
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      loadLocalCart();
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get('/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const loadLocalCart = () => {
    const localCart = localStorage.getItem('cart');
    if (localCart) {
      setCart(JSON.parse(localCart));
    }
  };

  const saveLocalCart = (cartData) => {
    localStorage.setItem('cart', JSON.stringify(cartData));
  };

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        const { data } = await api.post('/cart', { productId, quantity });
        setCart(data);
        toast.success('Added to cart!');
      } else {
        // Handle local cart
        const newCart = { ...cart };
        const existingItem = newCart.items.find(item => item.product === productId);
        
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          newCart.items.push({ product: productId, quantity, price: 0 });
        }
        
        newCart.totalItems = newCart.items.reduce((acc, item) => acc + item.quantity, 0);
        setCart(newCart);
        saveLocalCart(newCart);
        toast.success('Added to cart!');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        const { data } = await api.put(`/cart/${productId}`, { quantity });
        setCart(data);
        toast.success('Cart updated!');
      } else {
        const newCart = { ...cart };
        const item = newCart.items.find(item => item.product === productId);
        if (item) {
          item.quantity = quantity;
          newCart.totalItems = newCart.items.reduce((acc, item) => acc + item.quantity, 0);
          setCart(newCart);
          saveLocalCart(newCart);
          toast.success('Cart updated!');
        }
      }
    } catch (error) {
      toast.error('Failed to update cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setLoading(true);
    try {
      if (isAuthenticated) {
        const { data } = await api.delete(`/cart/${productId}`);
        setCart(data);
        toast.success('Removed from cart!');
      } else {
        const newCart = { ...cart };
        newCart.items = newCart.items.filter(item => item.product !== productId);
        newCart.totalItems = newCart.items.reduce((acc, item) => acc + item.quantity, 0);
        setCart(newCart);
        saveLocalCart(newCart);
        toast.success('Removed from cart!');
      }
    } catch (error) {
      toast.error('Failed to remove from cart');
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        await api.delete('/cart');
      }
      setCart({ items: [], totalPrice: 0, totalItems: 0 });
      localStorage.removeItem('cart');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
