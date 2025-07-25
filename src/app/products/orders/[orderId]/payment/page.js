"use client";

import { confirmOrder } from "@/api/orders";
import Spinner from "@/components/Spinner";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function OrderPayment() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  async function getOrderConfirmation() {
    try {
      const orderId = params?.orderId;
      const status = searchParams.get("status"); // From payment gateway URL
      const transactionId =
        searchParams.get("transaction_id") || searchParams.get("txnId");

      if (!orderId || !transactionId) {
        throw new Error("Missing orderId or transactionId.");
      }

      await confirmOrder(orderId, {
        status: status?.toLowerCase() || "completed",
        transactionId,
        paymentMethod: "khalti", // optional
      });
    } catch (error) {
      setError(error?.response?.data || error.message || "Failed to confirm order.");
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
          <div className="flex items-center justify-center p-10">{error}</div>
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
