import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartSlice';
import { Typography, Button, Card, CardContent, CardMedia } from '@mui/material';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Card className="p-4">
      <CardMedia component="img" height="300" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography variant="h6">${product.price}</Typography>
        <Typography>{product.description}</Typography>
        <Button variant="contained" onClick={() => dispatch(addItem(product))} sx={{ mt: 2 }}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
