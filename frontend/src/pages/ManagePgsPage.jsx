import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Button, Chip,
    Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
    Tooltip, CircularProgress, Grid, Card, CardMedia, CardContent, CardActions,
    IconButton
} from '@mui/material';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import WcRoundedIcon from '@mui/icons-material/WcRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const genderChipColor = (g) => {
    if (g === 'Boys') return { bg: '#EFF6FF', color: '#2563EB' };
    if (g === 'Girls') return { bg: '#FDF2F8', color: '#9D174D' };
    return { bg: '#F0FDF4', color: '#166534' };
};

const PgCard = ({ pg, onEdit, onDelete, onToggle }) => {
    const gc = genderChipColor(pg.genderPreference);
    const hasImage = pg.images && pg.images.length > 0;

    return (
        <Card className="card-lift" sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            {/* Image or No-Image Placeholder */}
            <Box sx={{ position: 'relative' }}>
                {hasImage ? (
                    <CardMedia
                        component="img"
                        height="175"
                        image={pg.images[0]}
                        alt={pg.pgName}
                        sx={{ objectFit: 'cover', backgroundColor: '#F3F4F6' }}
                    />
                ) : (
                    <Box sx={{
                        height: 175,
                        background: 'linear-gradient(135deg, #EFF6FF 0%, #F0FDFA 100%)',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 1,
                    }}>
                        <HomeWorkRoundedIcon sx={{ fontSize: 44, color: '#CBD5E1' }} />
                        <Typography sx={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 500 }}>
                            No photos uploaded
                        </Typography>
                    </Box>
                )}
                {/* Status badge overlay */}
                <Box sx={{ position: 'absolute', top: 10, right: 10 }}>
                    <Chip
                        label={pg.isActive ? 'Active' : 'Inactive'}
                        size="small"
                        sx={{
                            fontSize: '0.72rem', fontWeight: 700, height: 24,
                            backgroundColor: pg.isActive ? '#DCFCE7' : '#FEE2E2',
                            color: pg.isActive ? '#15803D' : '#B91C1C',
                        }}
                    />
                </Box>
            </Box>

            <CardContent sx={{ flex: 1, p: 2.5 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#111827', mb: 1, lineHeight: 1.3,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {pg.pgName}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                        <LocationOnRoundedIcon sx={{ fontSize: 14, color: '#9CA3AF' }} />
                        <Typography sx={{ fontSize: '0.8rem', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {pg.location || 'Location not specified'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5,
                            backgroundColor: '#F0FDF4', px: 1, py: 0.4, borderRadius: '6px' }}>
                            <CurrencyRupeeRoundedIcon sx={{ fontSize: 13, color: '#10B981' }} />
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#10B981' }}>
                                {pg.rent?.toLocaleString('en-IN')}<span style={{ fontWeight: 400, fontSize: '0.72rem', color: '#6B7280' }}>/mo</span>
                            </Typography>
                        </Box>
                        <Chip
                            icon={<WcRoundedIcon sx={{ fontSize: '0.85rem !important' }} />}
                            label={pg.genderPreference || 'Any'}
                            size="small"
                            sx={{ fontSize: '0.72rem', fontWeight: 600, height: 24, backgroundColor: gc.bg, color: gc.color, '& .MuiChip-icon': { color: gc.color } }}
                        />
                    </Box>
                </Box>
            </CardContent>

            <CardActions sx={{ px: 2.5, pb: 2, pt: 0, gap: 1 }}>
                <Button
                    variant="outlined"
                    size="small"
                    startIcon={<EditRoundedIcon />}
                    onClick={() => onEdit(pg._id)}
                    sx={{ flex: 1, borderRadius: '8px', fontWeight: 600, fontSize: '0.78rem', py: 0.75 }}
                >
                    Edit
                </Button>
                <Tooltip title={pg.isActive ? 'Deactivate' : 'Activate'}>
                    <IconButton
                        size="small"
                        onClick={() => onToggle(pg._id, pg.isActive)}
                        sx={{
                            borderRadius: '8px', border: '1px solid',
                            borderColor: pg.isActive ? '#FCD34D' : '#6EE7B7',
                            backgroundColor: pg.isActive ? '#FFFBEB' : '#ECFDF5',
                            color: pg.isActive ? '#D97706' : '#059669',
                            '&:hover': { backgroundColor: pg.isActive ? '#FEF3C7' : '#D1FAE5' },
                        }}
                    >
                        <PowerSettingsNewRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton
                        size="small"
                        onClick={() => onDelete(pg._id)}
                        sx={{
                            borderRadius: '8px', border: '1px solid #FECACA',
                            backgroundColor: '#FEF2F2', color: '#EF4444',
                            '&:hover': { backgroundColor: '#FEE2E2' },
                        }}
                    >
                        <DeleteRoundedIcon sx={{ fontSize: 16 }} />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

const ManagePgsPage = () => {
    const navigate = useNavigate();
    const [pgs, setPgs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [pgToDelete, setPgToDelete] = useState(null);

    const fetchPgs = async () => {
        setLoading(true);
        try {
            const response = await api.get('/pg');
            setPgs(response.data);
        } catch (error) {
            console.error('Error fetching PGs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPgs(); }, []);

    const handleEditClick = (id) => navigate(`/owner/edit-pg/${id}`);

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await api.put(`/pg/${id}`, { isActive: !currentStatus });
            fetchPgs();
        } catch (error) {
            console.error('Failed to toggle active status', error);
        }
    };

    const confirmDelete = (id) => { setPgToDelete(id); setDeleteDialogOpen(true); };

    const handleDelete = async () => {
        if (!pgToDelete) return;
        try {
            await api.delete(`/pg/${pgToDelete}`);
            setDeleteDialogOpen(false);
            setPgToDelete(null);
            fetchPgs();
        } catch (error) {
            console.error('Failed to delete PG', error);
        }
    };

    return (
        <Box className="fade-in-up">
            {/* Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827' }}>Manage PG Listings</Typography>
                    <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mt: 0.5 }}>
                        {pgs.length} {pgs.length === 1 ? 'property' : 'properties'} in your portfolio
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddRoundedIcon />}
                    onClick={() => navigate('/owner/add-pg')}
                    sx={{ borderRadius: '10px', py: 1.2, px: 2.5 }}
                >
                    Add New PG
                </Button>
            </Box>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh', gap: 2 }}>
                    <CircularProgress sx={{ color: '#2563EB' }} />
                </Box>
            ) : pgs.length === 0 ? (
                <Card sx={{ p: 6, textAlign: 'center' }}>
                    <ApartmentRoundedIcon sx={{ fontSize: 60, color: '#D1D5DB', mb: 2 }} />
                    <Typography sx={{ fontWeight: 700, fontSize: '1.2rem', color: '#374151', mb: 1 }}>No PGs listed yet</Typography>
                    <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem', mb: 3 }}>Add your first PG listing to get started</Typography>
                    <Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate('/owner/add-pg')}>
                        Add Your First PG
                    </Button>
                </Card>
            ) : (
                <Grid container spacing={3}>
                    {pgs.map((pg) => (
                        <Grid item xs={12} sm={6} lg={4} key={pg._id}>
                            <PgCard
                                pg={pg}
                                onEdit={handleEditClick}
                                onDelete={confirmDelete}
                                onToggle={handleToggleStatus}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle sx={{ fontWeight: 700 }}>Delete PG Listing?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This action cannot be undone. All associated room data will also be removed.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ p: 2.5, pt: 0, gap: 1 }}>
                    <Button onClick={() => setDeleteDialogOpen(false)} variant="outlined" sx={{ borderRadius: '8px' }}>Cancel</Button>
                    <Button onClick={handleDelete} color="error" variant="contained" sx={{ borderRadius: '8px' }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ManagePgsPage;
