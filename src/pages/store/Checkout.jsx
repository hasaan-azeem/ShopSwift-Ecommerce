import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const { total } = useSelector(state => state.cart);

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Typography variant="h6">Total Amount: ${total}</Typography>
      <Button variant="contained" color="primary" component={Link} to="/checkout">
        Proceed to Stripe Payment
      </Button>
    </div>
  );
};

export default Checkout;
