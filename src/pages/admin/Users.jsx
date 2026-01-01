import { useEffect, useState } from 'react';
import api from '../../utils/api';
import AdminLayout from '../../components/Admin/AdminLayout';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await api.get('/admin/users');
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    fetchUsers();
  };

  return (
    <AdminLayout>
      <Typography variant="h4" gutterBottom>Manage Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(u => (
            <TableRow key={u._id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => deleteUser(u._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AdminLayout>
  );
};

export default Users;
