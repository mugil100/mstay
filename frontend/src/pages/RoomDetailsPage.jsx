import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, Grid, MenuItem,
    Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions,
    FormControlLabel, Switch, Snackbar, Alert, Autocomplete, Chip, Tooltip
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import api from '../services/api';

export default function RoomDetailsPage() {
    const [rooms, setRooms] = useState([]);
    const [pgOptions, setPgOptions] = useState([]);
    const [formData, setFormData] = useState({
        pgId: null, roomType: '', sharingCapacity: '',
        roomRent: '', acAvailable: false, totalBeds: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
    const [actionDialog, setActionDialog] = useState({ open: false, type: '' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        try {
            const [roomsRes, pgsRes] = await Promise.all([api.get('/rooms'), api.get('/pg')]);
            setRooms(roomsRes.data.map(item => ({ ...item, id: item._id })));
            setPgOptions(pgsRes.data);
        } catch (err) {
            showSnackbar('Failed to fetch data', 'error');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const showSnackbar = (message, severity = 'success') => setSnackbar({ open: true, message, severity });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const validateForm = () => {
        if (!formData.pgId || !formData.roomType || !formData.sharingCapacity || !formData.roomRent || !formData.totalBeds) {
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
            const payload = { ...formData, pgId: formData.pgId._id };
            if (editingId) {
                await api.put(`/rooms/${editingId}`, payload);
                showSnackbar('Room updated successfully!');
            } else {
                await api.post('/rooms', payload);
                showSnackbar('Room added successfully!');
            }
            resetForm();
            fetchData();
        } catch (err) {
            showSnackbar('Validation failed or server error', 'error');
        } finally {
            setActionDialog({ open: false, type: '' });
        }
    };

    const handleEdit = (row) => {
        setFormData({ pgId: row.pgId, roomType: row.roomType, sharingCapacity: row.sharingCapacity, roomRent: row.roomRent, acAvailable: row.acAvailable, totalBeds: row.totalBeds });
        setEditingId(row.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteClick = (id) => setConfirmDialog({ open: true, id });

    const confirmDelete = async () => {
        try {
            await api.delete(`/rooms/${confirmDialog.id}`);
            showSnackbar('Room deleted successfully!');
            fetchData();
        } catch (err) {
            showSnackbar('Failed to delete room', 'error');
        } finally {
            setConfirmDialog({ open: false, id: null });
        }
    };

    const resetForm = () => {
        setFormData({ pgId: null, roomType: '', sharingCapacity: '', roomRent: '', acAvailable: false, totalBeds: '' });
        setEditingId(null);
    };

    const handleSearch = async () => {
        if (!searchText) return fetchData();
        try {
            const { data } = await api.get(`/rooms/search/${searchText}`);
            setRooms(data.map(item => ({ ...item, id: item._id })));
        } catch (err) {
            showSnackbar('No rooms found', 'warning');
            setRooms([]);
        }
    };

    const columns = [
        {
            field: 'pgName', headerName: 'Parent PG', flex: 1, minWidth: 160,
            valueGetter: (value, row) => row?.pgId?.pgName || 'Unknown'
        },
        { field: 'roomType', headerName: 'Room Type', width: 130 },
        { field: 'sharingCapacity', headerName: 'Sharing', width: 100, type: 'number' },
        { field: 'totalBeds', headerName: 'Total Beds', width: 110, type: 'number' },
        {
            field: 'roomRent', headerName: 'Rent (₹)', width: 120, type: 'number',
            renderCell: (params) => (
                <Typography sx={{ fontWeight: 600, color: '#10B981', fontSize: '0.85rem', mt: 1.5 }}>
                    ₹{params.value?.toLocaleString('en-IN')}
                </Typography>
            )
        },
        {
            field: 'acAvailable', headerName: 'AC', width: 100, type: 'boolean',
            renderCell: (params) => (
                <Box sx={{ mt: 1.5 }}>
                    <Chip
                        icon={<AcUnitRoundedIcon sx={{ fontSize: '0.85rem !important' }} />}
                        label={params.value ? 'AC' : 'Non-AC'}
                        size="small"
                        sx={{
                            fontSize: '0.7rem', fontWeight: 700, height: 22,
                            backgroundColor: params.value ? '#EFF6FF' : '#F3F4F6',
                            color: params.value ? '#2563EB' : '#6B7280',
                            '& .MuiChip-icon': { color: params.value ? '#2563EB' : '#9CA3AF' }
                        }}
                    />
                </Box>
            )
        },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 100,
            getActions: (params) => [
                <GridActionsCellItem
                    key="edit"
                    icon={<Tooltip title="Edit"><EditRoundedIcon sx={{ color: '#2563EB' }} /></Tooltip>}
                    label="Edit"
                    onClick={() => handleEdit(params.row)}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<Tooltip title="Delete"><DeleteRoundedIcon sx={{ color: '#EF4444' }} /></Tooltip>}
                    label="Delete"
                    onClick={() => handleDeleteClick(params.id)}
                />,
            ],
        },
    ];

    return (
        <Box className="fade-in-up">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827' }}>Room Configuration</Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mt: 0.5 }}>Add and manage room details for your PG properties</Typography>
            </Box>

            {/* Form Card */}
            <Card sx={{ mb: 3, overflow: 'hidden' }}>
                {/* Blue header bar */}
                <Box sx={{
                    px: 3, py: 2,
                    background: editingId
                        ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                        : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                    display: 'flex', alignItems: 'center', gap: 1.5,
                }}>
                    <BedroomParentRoundedIcon sx={{ color: '#fff', fontSize: 22 }} />
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
                        {editingId ? 'Update Room Details' : 'Add New Room'}
                    </Typography>
                    {editingId && (
                        <Chip label="Editing" size="small" sx={{ ml: 'auto', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 700, fontSize: '0.72rem' }} />
                    )}
                </Box>

                <CardContent sx={{ p: 3 }}>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={2.5}>
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Parent PG *</Typography>
                                <Autocomplete
                                    options={pgOptions}
                                    getOptionLabel={(option) => option.pgName || ''}
                                    value={formData.pgId}
                                    onChange={(e, newValue) => setFormData({ ...formData, pgId: newValue })}
                                    isOptionEqualToValue={(option, value) => option._id === value?._id}
                                    renderInput={(params) => <TextField {...params} placeholder="Select PG..." required sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Room Type *</Typography>
                                <TextField fullWidth required select name="roomType" value={formData.roomType} onChange={handleChange}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}>
                                    <MenuItem value="Single">Single</MenuItem>
                                    <MenuItem value="Double">Double</MenuItem>
                                    <MenuItem value="Triple">Triple</MenuItem>
                                    <MenuItem value="Dormitory">Dormitory</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Sharing Capacity *</Typography>
                                <TextField fullWidth required name="sharingCapacity" type="number" placeholder="e.g. 2" value={formData.sharingCapacity} onChange={handleChange}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Total Beds *</Typography>
                                <TextField fullWidth required name="totalBeds" type="number" placeholder="e.g. 4" value={formData.totalBeds} onChange={handleChange}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Room Rent (₹) *</Typography>
                                <TextField fullWidth required name="roomRent" type="number" placeholder="e.g. 6000" value={formData.roomRent} onChange={handleChange}
                                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <AcUnitRoundedIcon sx={{ color: '#2563EB', fontSize: 20 }} />
                                        <Box>
                                            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>AC Available</Typography>
                                            <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>Air-conditioned room</Typography>
                                        </Box>
                                    </Box>
                                    <Switch
                                        checked={formData.acAvailable}
                                        onChange={(e) => setFormData(prev => ({ ...prev, acAvailable: e.target.checked }))}
                                        name="acAvailable"
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box sx={{ display: 'flex', gap: 1.5 }}>
                                    <Button type="submit" variant="contained"
                                        color={editingId ? 'warning' : 'primary'}
                                        sx={{ borderRadius: '10px', px: 3, fontWeight: 700 }}>
                                        {editingId ? 'Update Room' : 'Insert Room'}
                                    </Button>
                                    {editingId && (
                                        <Button variant="outlined" onClick={resetForm} sx={{ borderRadius: '10px' }}>
                                            Cancel
                                        </Button>
                                    )}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </CardContent>
            </Card>

            {/* Data Table Card */}
            <Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5, borderBottom: '1px solid #F3F4F6' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>All Rooms</Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                            size="small" placeholder="Search rooms..."
                            value={searchText} onChange={(e) => setSearchText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' }, width: 220 }}
                        />
                        <Button variant="outlined" onClick={handleSearch} sx={{ borderRadius: '8px', px: 2 }}>Search</Button>
                        <Button variant="text" onClick={() => { setSearchText(''); fetchData(); }} sx={{ borderRadius: '8px' }}>Clear</Button>
                    </Box>
                </Box>
                <Box sx={{ height: 420, '& .MuiDataGrid-root': { border: 'none' }, '& .MuiDataGrid-columnHeaders': { backgroundColor: '#F9FAFB', fontWeight: 700 } }}>
                    <DataGrid
                        rows={rooms} columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                        disableRowSelectionOnClick
                        sx={{ border: 'none', '& .MuiDataGrid-cell:focus': { outline: 'none' } }}
                    />
                </Box>
            </Card>

            {/* Dialogs */}
            <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })}>
                <DialogTitle sx={{ fontWeight: 700 }}>Delete this Room?</DialogTitle>
                <DialogContent>Are you sure? This action cannot be undone.</DialogContent>
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button onClick={() => setConfirmDialog({ open: false, id: null })} variant="outlined" sx={{ borderRadius: '8px' }}>Cancel</Button>
                    <Button onClick={confirmDelete} color="error" variant="contained" sx={{ borderRadius: '8px' }}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={actionDialog.open} onClose={() => setActionDialog({ open: false, type: '' })}>
                <DialogTitle sx={{ fontWeight: 700 }}>Confirm {actionDialog.type}</DialogTitle>
                <DialogContent>Ready to {actionDialog.type?.toLowerCase()} this room?</DialogContent>
                <DialogActions sx={{ p: 2.5, gap: 1 }}>
                    <Button onClick={() => setActionDialog({ open: false, type: '' })} variant="outlined" sx={{ borderRadius: '8px' }}>Cancel</Button>
                    <Button onClick={confirmAction} color="primary" variant="contained" sx={{ borderRadius: '8px' }}>Confirm</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
                <Alert onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} severity={snackbar.severity} sx={{ width: '100%', borderRadius: '10px' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
