"use client";

import { confirmOrder } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function OrderPayment({ params, searchParams }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  async function getOrderConfirmation() {
    try {
      const orderId = (await params).orderId;
      const status = (await searchParams).status;

      await confirmOrder(orderId, status);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);

      setTimeout(() => {
        router.replace("/products/orders");
      }, 2500);
    }
  }

  useEffect(() => {
    getOrderConfirmation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="py-8 px-2 sm:p-10">
      {loading ? (
        <div className="rounded-2xl bg-slate-100 dark:bg-slate-700 border p-10">
          <h3 className="text-center text-xl md:text-3xl text-textColor dark:text-white">
            Verifying payment
          </h3>
          <div className="flex items-center justify-center p-10">
            <Spinner className="h-20 w-20" />
          </div>
        </div>
      ) : error ? (
        <div className="rounded-2xl bg-red-100 dark:bg-red-700 border p-10">
          <h3 className="text-center text-xl md:text-3xl text-textColor dark:text-white">
            Payment failed
          </h3>
          <div className="flex items-center justify-center p-10">{error} </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-green-100 dark:bg-green-700 border p-10">
          <h3 className="text-center text-xl md:text-3xl text-textColor dark:text-white">
            Payment success
          </h3>
        </div>
      )}
    </div>
  );
}

export default OrderPayment;
