import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import DashboardHome from './DashboardHome';
import UserManagement from '../Users/UserManagement';
import ProductManagement from '../Products/ProductManagement';

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/products" element={<ProductManagement />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default Dashboard;
