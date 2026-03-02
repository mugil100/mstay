import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Grid, MenuItem,
    Paper, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControlLabel, Switch, Snackbar, Alert
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import api from '../services/api';

export default function PgListingPage() {
    const [listings, setListings] = useState([]);
    const [formData, setFormData] = useState({
        pgName: '', address: '', location: '', rent: '',
        genderPreference: '', description: '', isActive: true
    });
    const [editingId, setEditingId] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
    const [actionDialog, setActionDialog] = useState({ open: false, type: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [searchText, setSearchText] = useState('');

    const fetchListings = async () => {
        try {
            const { data } = await api.get('/pg');
            setListings(data.map(item => ({ ...item, id: item._id })));
        } catch (err) {
            showSnackbar('Failed to fetch listings', 'error');
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        if (!formData.pgName || !formData.address || !formData.location || !formData.rent || !formData.genderPreference) {
            showSnackbar('Please fill all required fields', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        setActionDialog({ open: true, type: editingId ? 'Update' : 'Insert' });
    };

    const confirmAction = async () => {
        try {
            if (editingId) {
                await api.put(`/pg/${editingId}`, formData);
                showSnackbar('PG Listing updated successfully!');
            } else {
                await api.post('/pg', formData);
                showSnackbar('PG Listing added successfully!');
            }
            resetForm();
            fetchListings();
        } catch (err) {
            showSnackbar('Validation failed or server error', 'error');
        } finally {
            setActionDialog({ open: false, type: '' });
        }
    };

    const handleEdit = (row) => {
        setFormData({
            pgName: row.pgName,
            address: row.address,
            location: row.location,
            rent: row.rent,
            genderPreference: row.genderPreference,
            description: row.description || '',
            isActive: row.isActive
        });
        setEditingId(row.id);
    };

    const handleDeleteClick = (id) => {
        setConfirmDialog({ open: true, id });
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/pg/${confirmDialog.id}`);
            showSnackbar('PG Listing deleted successfully!');
            fetchListings();
        } catch (err) {
            showSnackbar('Failed to delete listing', 'error');
        } finally {
            setConfirmDialog({ open: false, id: null });
        }
    };

    const resetForm = () => {
        setFormData({
            pgName: '', address: '', location: '', rent: '',
            genderPreference: '', description: '', isActive: true
        });
        setEditingId(null);
    };

    const handleSearch = async () => {
        if (!searchText) return fetchListings();
        try {
            const { data } = await api.get(`/pg/search/${searchText}`);
            setListings(data.map(item => ({ ...item, id: item._id })));
        } catch (err) {
            showSnackbar('No listings found', 'warning');
            setListings([]);
        }
    };

    const columns = [
        { field: 'pgName', headerName: 'PG Name', width: 200 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'rent', headerName: 'Monthly Rent (₹)', width: 150, type: 'number' },
        { field: 'genderPreference', headerName: 'Gender', width: 120 },
        { field: 'isActive', headerName: 'Status', width: 120, type: 'boolean' },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => handleEdit(params.row)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(params.id)}
                />,
            ],
        },
    ];

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                PG / Hostel Listing Management
            </Typography>

            <Paper sx={{ p: 3, mb: 4, elevation: 3 }}>
                <Typography variant="h6" gutterBottom color="primary">
                    {editingId ? 'Update PG Listing' : 'Add New PG Listing'}
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                required fullWidth label="PG Name" name="pgName"
                                value={formData.pgName} onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                required fullWidth label="Location" name="location"
                                value={formData.location} onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                required fullWidth label="Address" name="address"
                                multiline rows={2} value={formData.address} onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                required fullWidth label="Monthly Rent" name="rent"
                                type="number" value={formData.rent} onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField
                                required fullWidth select label="Gender Preference" name="genderPreference"
                                value={formData.genderPreference} onChange={handleChange}
                            >
                                <MenuItem value="Boys">Boys</MenuItem>
                                <MenuItem value="Girls">Girls</MenuItem>
                                <MenuItem value="Co-ed">Co-ed</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }} display="flex" alignItems="center">
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        name="isActive"
                                    />
                                }
                                label="Active Status"
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                fullWidth label="Description" name="description"
                                multiline rows={2} value={formData.description} onChange={handleChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }} display="flex" gap={2}>
                            <Button type="submit" variant="contained" color={editingId ? "warning" : "primary"}>
                                {editingId ? 'Update Listing' : 'Insert Listing'}
                            </Button>
                            {editingId && (
                                <Button variant="outlined" onClick={resetForm}>Cancel</Button>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, elevation: 3 }}>
                <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography variant="h6" color="primary">All PG Listings</Typography>
                    <Box display="flex" gap={1}>
                        <TextField
                            size="small" label="Search by Name, Location, or ID"
                            value={searchText} onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button variant="outlined" onClick={handleSearch}>Search</Button>
                        <Button variant="text" onClick={() => { setSearchText(''); fetchListings(); }}>Clear</Button>
                    </Box>
                </Box>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={listings}
                        columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 5 } },
                        }}
                        disableRowSelectionOnClick
                    />
                </Box>
            </Paper>

            {/* Delete Confirmation Dialog */}
            <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this PG Listing? This action cannot be undone.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialog({ open: false, id: null })}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Insert/Update Confirmation Dialog */}
            <Dialog open={actionDialog.open} onClose={() => setActionDialog({ open: false, type: '' })}>
                <DialogTitle>Confirm {actionDialog.type}</DialogTitle>
                <DialogContent>Are you sure you want to {actionDialog.type.toLowerCase()} this PG Listing?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setActionDialog({ open: false, type: '' })}>Cancel</Button>
                    <Button onClick={confirmAction} color="primary" variant="contained">OK</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notifications */}
            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
                <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
