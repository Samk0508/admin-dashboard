import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { fetchProducts, deleteProduct } from '../../store/slices/productSlice';
import { fetchUsers } from '../../store/slices/userSlice';
import ProductForm from './ProductForm';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [openForm, setOpenForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setOpenForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setOpenForm(true);
  };

  const handleDeleteProduct = (product) => {
    setDeleteDialog({ open: true, product });
  };

  const confirmDelete = () => {
    if (deleteDialog.product) {
      dispatch(deleteProduct(deleteDialog.product.id));
      setDeleteDialog({ open: false, product: null });
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Product Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateProduct}
        >
          Create Product
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Product Code</TableCell>
              <TableCell>Rate</TableCell>
              <TableCell>Tax %</TableCell>
              <TableCell>Final Rate</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.productCode}</TableCell>
                <TableCell>₹{product.rate}</TableCell>
                <TableCell>{product.taxPercent}%</TableCell>
                <TableCell>₹{product.finalRate}</TableCell>
                <TableCell>{product.createdByName || 'N/A'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditProduct(product)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteProduct(product)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ProductForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        product={editingProduct}
      />

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, product: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete product "{deleteDialog.product?.productName}"?
          This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, product: null })}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductManagement;
