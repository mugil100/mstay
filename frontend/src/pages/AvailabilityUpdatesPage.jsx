import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Card, CardContent, TextField, Button, Grid,
    MenuItem, Dialog, DialogTitle, DialogContent, DialogActions,
    Snackbar, Alert, Chip, Tooltip
} from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import api from '../services/api';

const StatusChip = ({ status }) => {
    const styles = {
        Available: { bg: '#DCFCE7', color: '#15803D', dot: '#16A34A' },
        Limited: { bg: '#FEF3C7', color: '#B45309', dot: '#D97706' },
        Full: { bg: '#FEE2E2', color: '#B91C1C', dot: '#DC2626' },
    };
    const s = styles[status] || styles.Available;

    return (
        <Box sx={{ mt: 1.5 }}>
            <Chip
                label={status}
                size="small"
                icon={
                    <Box sx={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: s.dot, ml: '8px !important' }} />
                }
                sx={{ backgroundColor: s.bg, color: s.color, fontWeight: 700, fontSize: '0.72rem', height: 24 }}
            />
        </Box>
    );
};

export default function AvailabilityUpdatesPage() {
    const [availabilities, setAvailabilities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [editingAvailability, setEditingAvailability] = useState(null);
    const [actionDialog, setActionDialog] = useState(false);
    const [formData, setFormData] = useState({ roomId: '', availableBeds: '', status: 'Available' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [searchText, setSearchText] = useState('');

    const fetchData = async () => {
        try {
            const [availRes, roomsRes] = await Promise.all([api.get('/availability'), api.get('/rooms')]);
            const formattedData = availRes.data.map(item => ({
                id: item._id, roomId: item.roomId?._id,
                pgName: item.roomId?.pgId?.pgName || 'Unknown PG',
                roomType: item.roomId?.roomType || 'Unknown Room',
                totalBeds: item.roomId?.totalBeds || 0,
                availableBeds: item.availableBeds,
                status: item.status,
                lastUpdatedOn: new Date(item.lastUpdatedOn).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
            }));
            setAvailabilities(formattedData);
            setRooms(roomsRes.data);
        } catch (err) {
            showSnackbar('Failed to fetch data', 'error');
        }
    };

    useEffect(() => { fetchData(); }, []);

    const showSnackbar = (message, severity = 'success') => setSnackbar({ open: true, message, severity });

    const handleEdit = (row) => {
        setEditingAvailability(row);
        setFormData({ roomId: row.roomId, availableBeds: row.availableBeds, status: row.status });
        setActionDialog(true);
    };

    const handleNew = () => {
        setEditingAvailability(null);
        setFormData({ roomId: '', availableBeds: '', status: 'Available' });
        setActionDialog(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const confirmAction = async () => {
        if (!formData.roomId || formData.availableBeds === '' || !formData.status) {
            showSnackbar('Please fill all required fields', 'warning');
            return;
        }
        try {
            await api.put(`/availability/${formData.roomId}`, formData);
            showSnackbar('Availability updated successfully!');
            fetchData();
        } catch (err) {
            showSnackbar(err.response?.data?.message || 'Failed to update availability', 'error');
        } finally {
            setActionDialog(false);
        }
    };

    const filteredRows = availabilities.filter(row => {
        if (!searchText) return true;
        const sl = searchText.toLowerCase();
        return row.pgName.toLowerCase().includes(sl) || row.roomType.toLowerCase().includes(sl) || row.status.toLowerCase().includes(sl);
    });

    const columns = [
        { field: 'pgName', headerName: 'PG Name', flex: 1, minWidth: 160 },
        { field: 'roomType', headerName: 'Room Type', width: 130 },
        { field: 'totalBeds', headerName: 'Total Beds', width: 110, type: 'number' },
        { field: 'availableBeds', headerName: 'Available Beds', width: 130, type: 'number' },
        {
            field: 'status', headerName: 'Status', width: 130,
            renderCell: (params) => <StatusChip status={params.value} />
        },
        { field: 'lastUpdatedOn', headerName: 'Last Updated', width: 180 },
        {
            field: 'actions', type: 'actions', headerName: 'Actions', width: 80,
            getActions: (params) => [
                <GridActionsCellItem
                    key="edit"
                    icon={<Tooltip title="Update Availability"><EditRoundedIcon sx={{ color: '#2563EB' }} /></Tooltip>}
                    label="Edit"
                    onClick={() => handleEdit(params.row)}
                />,
            ],
        },
    ];

    return (
        <Box className="fade-in-up">
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827' }}>Availability Updates</Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mt: 0.5 }}>Manage bed availability across all your rooms</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<EventAvailableRoundedIcon />}
                    onClick={handleNew}
                    sx={{ borderRadius: '10px', py: 1.2, px: 2.5 }}
                >
                    Update Availability
                </Button>
            </Box>

            {/* Summary chips */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                {['Available', 'Limited', 'Full'].map(status => {
                    const count = availabilities.filter(a => a.status === status).length;
                    const styles = {
                        Available: { bg: '#DCFCE7', color: '#15803D' },
                        Limited: { bg: '#FEF3C7', color: '#B45309' },
                        Full: { bg: '#FEE2E2', color: '#B91C1C' },
                    };
                    return (
                        <Box key={status} sx={{ px: 2.5, py: 1.25, borderRadius: '10px', backgroundColor: styles[status].bg }}>
                            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: styles[status].color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                                {status}
                            </Typography>
                            <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: styles[status].color, lineHeight: 1.2 }}>
                                {count}
                            </Typography>
                        </Box>
                    );
                })}
            </Box>

            {/* Data Table */}
            <Card>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5, borderBottom: '1px solid #F3F4F6' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
                        Room Availabilities
                    </Typography>
                    <TextField
                        size="small" placeholder="Search by PG, room or status..."
                        value={searchText} onChange={(e) => setSearchText(e.target.value)}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' }, width: 260 }}
                    />
                </Box>
                <Box sx={{ height: 450, '& .MuiDataGrid-root': { border: 'none' }, '& .MuiDataGrid-columnHeaders': { backgroundColor: '#F9FAFB' } }}>
                    <DataGrid
                        rows={filteredRows} columns={columns}
                        pageSizeOptions={[5, 10, 20]}
                        initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
                        disableRowSelectionOnClick
                        sx={{ border: 'none', '& .MuiDataGrid-cell:focus': { outline: 'none' } }}
                    />
                </Box>
            </Card>

            {/* Update Dialog */}
            <Dialog open={actionDialog} onClose={() => setActionDialog(false)} maxWidth="sm" fullWidth
                PaperProps={{ sx: { borderRadius: '20px' } }}>
                <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>
                    {editingAvailability ? 'Update Room Availability' : 'Set Room Availability'}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2.5} sx={{ mt: 0.5 }}>
                        <Grid item xs={12}>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Select Room *</Typography>
                            <TextField select required fullWidth name="roomId"
                                value={formData.roomId} onChange={handleChange}
                                disabled={!!editingAvailability}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}>
                                {rooms.map(room => (
                                    <MenuItem key={room._id} value={room._id}>
                                        {room.pgId?.pgName || 'Unknown PG'} — {room.roomType} ({room.sharingCapacity} sharing)
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Available Beds *</Typography>
                            <TextField required fullWidth name="availableBeds" type="number"
                                value={formData.availableBeds} onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Status *</Typography>
                            <TextField select required fullWidth name="status"
                                value={formData.status} onChange={handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}>
                                <MenuItem value="Available">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#16A34A' }} /> Available
                                    </Box>
                                </MenuItem>
                                <MenuItem value="Limited">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D97706' }} /> Limited
                                    </Box>
                                </MenuItem>
                                <MenuItem value="Full">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#DC2626' }} /> Full
                                    </Box>
                                </MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
                    <Button onClick={() => setActionDialog(false)} variant="outlined" sx={{ borderRadius: '10px' }}>Cancel</Button>
                    <Button onClick={confirmAction} variant="contained" sx={{ borderRadius: '10px' }}>Save Changes</Button>
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
