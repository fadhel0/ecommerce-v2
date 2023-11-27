'use client';

import Link from 'next/link';
import { CiDeliveryTruck } from 'react-icons/ci';
import MainLayout from '../layouts/MainLayout';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import UseIsLoading from '../hooks/useIsLoading';
import { useUser } from '../context/user';

export default function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  // Define the Order type if not already defined
  type Order = {
    id: number | null; // Adjust the data type accordingly
    stripe_id: string; // Add other properties as needed
    name: string;
    address: string;
    zipcode: string;
    city: string;
    country: string;
    total: number;
    created_at: string; // Assuming it's a string; adjust as needed
    orderItem: Array<{
      id: number | null; // Assuming this is the id for orderItem
      product: {
        id: number | null; // Adjust the data type accordingly
        title: string;
        url: string;
      };
    }>;
  };

  const getOrders = async () => {
    try {
      if (!user && !user?.id) return;
      const response = await fetch('/api/orders');
      const result = await response.json();
      setOrders(result);
      UseIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong?', { autoClose: 3000 });
      UseIsLoading(false);
    }
  };

  useEffect(() => {
    UseIsLoading(true);
    getOrders();
  }, [user]);

  return (
    <>
      <MainLayout>
        <div
          id="OrdersPage"
          className="mt-4 max-w-6xl mx-auto px-2 min-h-[50vh]"
        >
          <div className="bg-white w-full p-6 min-h-[150px]">
            <div className="flex items-center text-xl">
              <CiDeliveryTruck className="text-green-500" size={35} />
              <span className="pl-4">Orders</span>
            </div>
            {orders.length < 1 ? (
              <div className="flex items-center justify-center">
                You have no order history
              </div>
            ) : null}

            {orders.map((order: Order) => (
              <div key={order?.id} className="text-sm pl-12">
                <div className="border-b py-1">
                  <div className="pt-2">
                    <span className="font-bold mr-2">Stripe ID:</span>
                    {order?.stripe_id}
                  </div>

                  <div className="pt-2">
                    <span className="font-bold mr-2">Delivery Address:</span>
                    {order?.name}, {order?.address}, {order?.zipcode},{' '}
                    {order?.city}, {order?.country}
                  </div>

                  <div className="pt-2">
                    <span className="font-bold mr-2">Total:</span>$
                    {order?.total / 100}
                  </div>

                  <div className="pt-2">
                    <span className="font-bold mr-2">Order Created:</span>
                    {moment(order?.created_at).calendar()}
                  </div>

                  <div className="py-2">
                    <span className="font-bold mr-2">Delivery Time:</span>
                    {moment(order?.created_at).add(3, 'days').calendar()}
                  </div>

                  <div className="flex items-center gap-4">
                    {order?.orderItem.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <Link
                          className="py-1 hover:underline text-blue-500 font-bold"
                          href={`/product/${item.product.id}`}
                        >
                          <img
                            className="rounded"
                            width="120"
                            src={item.product.url + '/120'}
                          />
                          {item.product.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}
