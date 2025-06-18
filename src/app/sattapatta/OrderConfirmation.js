import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import api from '@/api'; // Import your API client

const OrderConfirmation = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const router = useRouter();
  const { orderId } = router.query; // Get the order ID from the query parameters

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        try {
          const response = await api.get(`/orders/${orderId}`); // Fetch order details from API
          setOrderDetails(response.data);
        } catch (error) {
          console.error('Error fetching order details:', error);
          router.push('/'); // Redirect to homepage if order details cannot be fetched
        }
      } else {
        router.push('/'); // Redirect if orderId is not available
      }
    };

    fetchOrderDetails();
  }, [router, orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-5 py-5">
      <h1 className="text-3xl font-bold text-[#68217A] text-center mb-5">Order Confirmation</h1>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Order Details</h2>
        <p><strong>Product:</strong> {orderDetails.itemRequested.title}</p>
        <p><strong>Exchange Product:</strong> {orderDetails.itemOffered.title}</p>
        <p><strong>Price:</strong> ${orderDetails.extraPrice}</p>
        <p><strong>Status:</strong> {orderDetails.status}</p>
      </div>
    </div>
  );
};

export default OrderConfirmation;
