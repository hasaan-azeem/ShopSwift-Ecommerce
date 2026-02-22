import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { clearCart } from "../../redux/cartSlice";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const fieldLabels = {
  firstName: "First Name",
  lastName: "Last Name",
  address: "Address",
  city: "City",
  state: "State / Province",
  postalCode: "Postal Code",
  country: "Country",
  phone: "Phone",
};

// ----------------------------------------------------------------
// Inner payment form — inside <Elements> provider
// ----------------------------------------------------------------
const PaymentForm = ({ shippingAddress, totalPrice, cartItems, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage("");

    // Step 1: Confirm payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
        payment_method_data: {
          billing_details: {
            name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
            phone: shippingAddress.phone,
            address: {
              line1: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.postalCode,
              country: shippingAddress.country,
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
      return;
    }

    // Step 2: Payment succeeded — create the order in our database
    try {
      const orderItems = cartItems.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        qty: item.quantity,
        size: item.size,
        color: item.color,
      }));

      const orderRes = await api.post("/orders", {
        orderItems,
        shippingAddress: {
          address: shippingAddress.address,
          city: shippingAddress.city,
          state: shippingAddress.state,
          postalCode: shippingAddress.postalCode,
          country: shippingAddress.country,
          phone: shippingAddress.phone,
        },
        paymentMethod: "Stripe",
        totalPrice,
        isPaid: true,
        paidAt: new Date().toISOString(),
        paymentIntentId: paymentIntent?.id || "",
      });

      // Step 3: Save order ID so OrderConfirmation can read it
      localStorage.setItem("lastOrderId", orderRes.data._id);

      // Step 4: Clear cart
      dispatch(clearCart());

      // Step 5: Navigate
      navigate("/order-confirmation");
    } catch (orderErr) {
      // Payment went through but order save failed — show error but still
      // navigate so user knows payment was taken
      console.error("Order save failed:", orderErr);
      localStorage.removeItem("lastOrderId");
      dispatch(clearCart());
      navigate("/order-confirmation");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-lg mb-4">Pay with Card</h3>
      <PaymentElement className="mb-4" />
      {errorMessage && (
        <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing
          ? "Processing..."
          : `Pay PKR ${totalPrice.toLocaleString()}`}
      </button>
    </form>
  );
};

// ----------------------------------------------------------------
// Main checkout page
// ----------------------------------------------------------------
const StripeCheckout = () => {
  // FIX: read from Redux cart, not hardcoded data
  const { items: cartItems, total: cartTotal } = useSelector(
    (state) => state.cart,
  );
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState(null);
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");

  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Pakistan",
    phone: "",
  });

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <p className="text-xl font-semibold text-gray-700 mb-4">
          Your cart is empty
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    setLoadingIntent(true);
    setIntentError("");

    try {
      const res = await api.post("/stripe/create-payment-intent", {
        amount: cartTotal,
        currency: "pkr",
      });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      setIntentError(err.response?.data?.error || "Failed to create payment.");
    } finally {
      setLoadingIntent(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left — shipping + payment */}
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        {!clientSecret ? (
          <form onSubmit={handleCreateCheckout}>
            <h3 className="text-lg mb-2">Contact</h3>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full p-2 border border-gray-200 text-gray-400 rounded mb-6"
              disabled
            />

            <h3 className="text-lg mb-4">Delivery</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(shippingAddress).map((key) => (
                <input
                  key={key}
                  placeholder={fieldLabels[key] || key}
                  value={shippingAddress[key]}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      [key]: e.target.value,
                    })
                  }
                  className={`p-2 border border-gray-200 rounded ${key === "address" ? "col-span-2" : "col-span-1"}`}
                  required
                />
              ))}
            </div>

            {intentError && (
              <p className="text-red-500 text-sm mt-3">{intentError}</p>
            )}

            <button
              type="submit"
              disabled={loadingIntent}
              className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition-colors disabled:opacity-60"
            >
              {loadingIntent ? "Loading..." : "Continue to Payment"}
            </button>
          </form>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: "stripe",
                variables: { colorPrimary: "#4f46e5" },
              },
            }}
          >
            <PaymentForm
              shippingAddress={shippingAddress}
              totalPrice={cartTotal}
              cartItems={cartItems}
            />
          </Elements>
        )}
      </div>

      {/* Right — order summary from REAL cart */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl uppercase mb-6">Order Summary</h2>
        <div className="border-t border-gray-200 pt-4 mb-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-3 border-b border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-24 object-cover mr-4 rounded"
              />
              <div className="flex-1">
                <p className="font-medium text-md">{item.name}</p>
                <p className="text-gray-500 text-sm">Size: {item.size}</p>
                <p className="text-gray-500 text-sm">Color: {item.color}</p>
                <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
              </div>
              <p className="text-lg font-medium ml-4">
                PKR {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center py-3 text-lg">
          <span>Subtotal</span>
          <span>PKR {cartTotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t border-gray-200 pt-4 font-bold">
          <p>Total</p>
          <p>PKR {cartTotal.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout;
