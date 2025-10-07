import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { fetchUsers } from '../../store/slices/userSlice';
import { fetchProducts } from '../../store/slices/productSlice';

const DashboardHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector(state => state.users);
  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
  }, [dispatch]);

  const dashboardCards = [
    {
      title: 'Total Users',
      count: users.length,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: '#1976d2',
      action: () => navigate('/dashboard/users'),
    },
    {
      title: 'Total Products',
      count: products.length,
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      color: '#388e3c',
      action: () => navigate('/dashboard/products'),
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {dashboardCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 6 },
                borderLeft: `4px solid ${card.color}`,
              }}
              onClick={card.action}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {card.count}
                    </Typography>
                  </Box>
                  <Box sx={{ color: card.color }}>
                    {card.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Quick Actions
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/dashboard/users')}
          >
            Create User
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/dashboard/products')}
          >
            Create Product
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardHome;
