"use client";

import { useState } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export function PaymentForm({ method }: { method: "card" | "pix" }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  async function createPaymentIntent() {
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000, method }),
    });
    const data = await res.json();
    console.log("clientSecret:", data.clientSecret);
    setClientSecret(data.clientSecret);
  }

  if (!clientSecret) {
    return (
      <button
        onClick={createPaymentIntent}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Gerar pagamento via {method === "pix" ? "Pix" : "Cartão"}
      </button>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm method={method} />
    </Elements>
  );
}

function CheckoutForm({ method }: { method: "card" | "pix" }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/success",
      },
    });

    if (result.error) setMessage(result.error.message || "Erro ao processar.");
  };

  console.log("Rendering CheckoutForm with method:", method);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <PaymentElement />
      <button
        disabled={!stripe}
        className="bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Pagar via {method === "pix" ? "Pix" : "Cartão"}
      </button>
      {message && <p className="text-red-500">{message}</p>}
    </form>
  );
}
