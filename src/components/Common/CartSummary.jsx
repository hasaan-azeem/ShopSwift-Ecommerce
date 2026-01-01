import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Card>
    <CardMedia
      component="img"
      height="200"
      image={product.image}
      alt={product.name}
    />
    <CardContent>
      <Typography variant="h6">{product.name}</Typography>
      <Typography variant="subtitle1">${product.price}</Typography>
      <Button component={Link} to={`/product/${product._id}`} variant="contained" sx={{ mt: 1 }}>
        View
      </Button>
    </CardContent>
  </Card>
);

export default ProductCard;
