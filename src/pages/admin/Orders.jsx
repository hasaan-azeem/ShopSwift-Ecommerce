import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminLayout from '../../components/Admin/AdminLayout';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Select, MenuItem } from '@mui/material';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await api.get('/admin/orders');
    setOrders(res.data);
  };

  useEffect(() => { fetchOrders(); }, []);

  const updateStatus = async (id, status) => {
    await api.put(`/admin/orders/${id}`, { status });
    fetchOrders();
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>Manage Orders</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Total</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o._id}>
              <TableCell>{o._id}</TableCell>
              <TableCell>{o.user.name}</TableCell>
              <TableCell>${o.total}</TableCell>
              <TableCell>
                <Select value={o.status} onChange={(e) => updateStatus(o._id, e.target.value)}>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="shipped">Shipped</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default Orders;
