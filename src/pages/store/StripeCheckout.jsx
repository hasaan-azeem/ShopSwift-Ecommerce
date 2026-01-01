import { useSelector } from 'react-redux';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';

const StripeCheckout = () => {
  const { items, total } = useSelector(state => state.cart);
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const res = await api.post('/create-payment-intent', { items, total });
      const clientSecret = res.data.clientSecret;

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId: clientSecret });
    } catch (error) {
      console.error(error);
      alert('Payment failed');
    }
  };

  return (
    <div className="p-4">
      <Typography variant="h4">Checkout</Typography>
      <Typography>Total: ${total}</Typography>
      <Button variant="contained" onClick={handlePayment}>Pay with Stripe</Button>
    </div>
  );
};

export default StripeCheckout;
