import { useSelector, useDispatch } from 'react-redux';
import { removeItem, clearCart } from '../../redux/cartSlice';
import { Typography, Button, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) return <Typography>Your cart is empty</Typography>;

  return (
    <div className="p-4">
      <Typography variant="h4" gutterBottom>Your Cart</Typography>
      <List>
        {items.map(item => (
          <div key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${item.price} x ${item.quantity}`}
              />
              <Button color="error" onClick={() => dispatch(removeItem(item.id))}>Remove</Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Typography variant="h5" gutterBottom>Total: ${total}</Typography>
      <Button variant="contained" color="primary" component={Link} to="/checkout">Checkout</Button>
      <Button variant="outlined" color="secondary" onClick={() => dispatch(clearCart())} sx={{ ml: 2 }}>
        Clear Cart
      </Button>
    </div>
  );
};

export default Cart;
