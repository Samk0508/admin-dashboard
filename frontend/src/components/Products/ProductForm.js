import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createProduct, updateProduct } from '../../store/slices/productSlice';

const ProductForm = ({ open, onClose, product }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => state.users);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();

  const rate = watch('rate');
  const taxPercent = watch('taxPercent');
  const productName = watch('productName');

  useEffect(() => {
    if (product) {
      reset({
        productName: product.productName,
        description: product.description,
        rate: product.rate,
        taxPercent: product.taxPercent,
        image: product.image,
        createdById: product.createdById,
      });
    } else {
      reset({
        productName: '',
        description: '',
        rate: '',
        taxPercent: '',
        image: '',
        createdById: '',
      });
    }
  }, [product, reset]);

  // Auto-fill description when product name changes (only for new products)
  useEffect(() => {
    if (!product && productName) {
      setValue('description', productName);
    }
  }, [productName, product, setValue]);

  const calculateFinalRate = () => {
    if (rate && taxPercent) {
      const rateValue = parseFloat(rate);
      const taxValue = parseFloat(taxPercent);
      const taxAmount = (rateValue * taxValue) / 100;
      return (rateValue + taxAmount).toFixed(2);
    }
    return '0.00';
  };

  const onSubmit = async (data) => {
    const productData = {
      ...data,
      rate: parseFloat(data.rate),
      taxPercent: parseFloat(data.taxPercent),
      createdById: data.createdById || null,
    };

    if (product) {
      await dispatch(updateProduct({ id: product.id, productData }));
    } else {
      await dispatch(createProduct(productData));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product ? 'Edit Product' : 'Create Product'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Product Name"
                {...register('productName', { required: 'Product name is required' })}
                error={!!errors.productName}
                helperText={errors.productName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Created By</InputLabel>
                <Select
                  {...register('createdById')}
                  label="Created By"
                >
                  <MenuItem value="">None</MenuItem>
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                {...register('description')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Rate"
                type="number"
                step="0.01"
                {...register('rate', {
                  required: 'Rate is required',
                  min: { value: 0.01, message: 'Rate must be greater than 0' },
                })}
                error={!!errors.rate}
                helperText={errors.rate?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Tax %"
                type="number"
                step="0.01"
                {...register('taxPercent', {
                  required: 'Tax percentage is required',
                  min: { value: 0, message: 'Tax percentage cannot be negative' },
                })}
                error={!!errors.taxPercent}
                helperText={errors.taxPercent?.message}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Final Rate"
                value={`₹${calculateFinalRate()}`}
                InputProps={{ readOnly: true }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                {...register('image')}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {product ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProductForm;
