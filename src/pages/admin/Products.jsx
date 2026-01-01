import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminLayout from '../../components/Admin/AdminLayout';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await api.get('/admin/products');
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const deleteProduct = async (id) => {
    await api.delete(`/admin/products/${id}`);
    fetchProducts();
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>Manage Products</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map(p => (
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => deleteProduct(p._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default Products;
