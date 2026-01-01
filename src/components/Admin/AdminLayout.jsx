import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6">Admin Dashboard</Typography>
      </Toolbar>
    </AppBar>
    <AdminSidebar />
    <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
      {children}
    </Box>
  </Box>
);

export default AdminLayout;
