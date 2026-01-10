import { useState, useEffect } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}`, { status });
      toast.success('Order status updated');
      fetchOrders();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update order');
    }
  };

  const handlePaymentStatus = async (orderId, isPaid) => {
    try {
      await api.put(`/orders/${orderId}/pay`, { isPaid, paidAt: new Date() });
      toast.success('Payment status updated');
      fetchOrders();
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update payment');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4">Order ID</th>
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Total</th>
              <th className="text-left py-3 px-4">Payment</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4">#{order.id.slice(0, 8)}</td>
                <td className="py-3 px-4">{order.User?.name || 'N/A'}</td>
                <td className="py-3 px-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 font-semibold">${order.totalPrice?.toFixed(2)}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.isPaid
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.isPaid ? 'Paid' : 'Unpaid'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : order.status === 'processing'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Update Order</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Order Details</h3>
                  <p className="text-sm text-gray-600">Order ID: #{selectedOrder.id}</p>
                  <p className="text-sm text-gray-600">
                    Customer: {selectedOrder.User?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: ${selectedOrder.totalPrice?.toFixed(2)}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Update Order Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusUpdate(selectedOrder.id, status)}
                          className={`px-4 py-2 rounded ${
                            selectedOrder.status === status
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Payment Status</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePaymentStatus(selectedOrder.id, true)}
                      className={`px-4 py-2 rounded ${
                        selectedOrder.isPaid
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => handlePaymentStatus(selectedOrder.id, false)}
                      className={`px-4 py-2 rounded ${
                        !selectedOrder.isPaid
                          ? 'bg-yellow-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300'
                      }`}
                    >
                      Mark as Unpaid
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      setSelectedOrder(null);
                    }}
                    className="btn btn-secondary w-full"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
