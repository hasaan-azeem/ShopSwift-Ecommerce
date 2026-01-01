import AdminLayout from '../../components/Admin/AdminLayout';
import { Typography, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get('/admin/dashboard-stats');
      setStats(res.data);
    };
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}><Typography>Users: {stats.users}</Typography></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}><Typography>Products: {stats.products}</Typography></Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2 }}><Typography>Orders: {stats.orders}</Typography></Paper>
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default Dashboard;
