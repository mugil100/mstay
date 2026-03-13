import React, { useState, useEffect } from 'react';
import {
    Box, Typography, TextField, Button, FormControl, Select, MenuItem,
    Grid, Card, Alert, CircularProgress, Switch, Chip, Tooltip
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import WifiRoundedIcon from '@mui/icons-material/WifiRounded';
import RestaurantMenuRoundedIcon from '@mui/icons-material/RestaurantMenuRounded';
import LocalLaundryServiceRoundedIcon from '@mui/icons-material/LocalLaundryServiceRounded';
import LocalParkingRoundedIcon from '@mui/icons-material/LocalParkingRounded';
import ElectricBoltRoundedIcon from '@mui/icons-material/ElectricBoltRounded';
import SecurityRoundedIcon from '@mui/icons-material/SecurityRounded';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import api from '../services/api';

const AMENITY_CONFIG = [
    { key: 'wifi', label: 'WiFi', icon: <WifiRoundedIcon sx={{ fontSize: 22 }} /> },
    { key: 'food', label: 'Food', icon: <RestaurantMenuRoundedIcon sx={{ fontSize: 22 }} /> },
    { key: 'laundry', label: 'Laundry', icon: <LocalLaundryServiceRoundedIcon sx={{ fontSize: 22 }} /> },
    { key: 'parking', label: 'Parking', icon: <LocalParkingRoundedIcon sx={{ fontSize: 22 }} /> },
    { key: 'powerBackup', label: 'Power Backup', icon: <ElectricBoltRoundedIcon sx={{ fontSize: 22 }} /> },
    { key: 'cctv', label: 'CCTV', icon: <SecurityRoundedIcon sx={{ fontSize: 22 }} /> },
    { key: 'gym', label: 'Gym', icon: <FitnessCenterRoundedIcon sx={{ fontSize: 22 }} /> },
    { key: 'studyRoom', label: 'Study Room', icon: <SchoolRoundedIcon sx={{ fontSize: 22 }} /> },
];

const AmenityChip = ({ config, selected, onToggle }) => (
    <Tooltip title={config.label} arrow>
        <Box
            onClick={() => onToggle(config.key)}
            sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                gap: 0.75, p: 1.5, borderRadius: '12px', cursor: 'pointer', minWidth: 80,
                border: `2px solid ${selected ? '#2563EB' : '#E5E7EB'}`,
                backgroundColor: selected ? '#EFF6FF' : '#fff',
                color: selected ? '#2563EB' : '#9CA3AF',
                transition: 'all 0.18s ease',
                userSelect: 'none',
                '&:hover': { borderColor: '#93C5FD', backgroundColor: '#EFF6FF', color: '#2563EB' },
            }}
        >
            {config.icon}
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, lineHeight: 1, textAlign: 'center' }}>
                {config.label}
            </Typography>
        </Box>
    </Tooltip>
);

const EditPgPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loadingData, setLoadingData] = useState(true);
    const [formData, setFormData] = useState({
        pgName: '', address: '', location: '', rent: '',
        genderPreference: '', description: '', isActive: true, existingImages: []
    });
    const [amenities, setAmenities] = useState({
        wifi: false, food: false, laundry: false, parking: false,
        powerBackup: false, cctv: false, gym: false, studyRoom: false
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPgData = async () => {
            try {
                const response = await api.get(`/pg/${id}`);
                const data = response.data;
                setFormData({
                    pgName: data.pgName || '', address: data.address || '',
                    location: data.location || '', rent: data.rent || '',
                    genderPreference: data.genderPreference || '', description: data.description || '',
                    existingImages: data.images || [], isActive: data.isActive !== undefined ? data.isActive : true
                });
                if (data.amenities) {
                    setAmenities({
                        wifi: !!data.amenities.wifi, food: !!data.amenities.food,
                        laundry: !!data.amenities.laundry, parking: !!data.amenities.parking,
                        powerBackup: !!data.amenities.powerBackup, cctv: !!data.amenities.cctv,
                        gym: !!data.amenities.gym, studyRoom: !!data.amenities.studyRoom
                    });
                }
            } catch (err) {
                setError('Failed to load PG listing data.');
            } finally {
                setLoadingData(false);
            }
        };
        fetchPgData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleAmenity = (key) => setAmenities(prev => ({ ...prev, [key]: !prev[key] }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoadingSubmit(true);
        setError('');
        try {
            let uploadedImageUrls = [];
            if (selectedFiles.length > 0) {
                const imageFormData = new FormData();
                selectedFiles.forEach(file => imageFormData.append('images', file));
                const uploadResponse = await api.post('/upload', imageFormData, { headers: { 'Content-Type': 'multipart/form-data' } });
                uploadedImageUrls = uploadResponse.data.imageUrls;
            }
            const finalImages = [...(formData.existingImages || []), ...uploadedImageUrls];
            await api.put(`/pg/${id}`, { ...formData, rent: Number(formData.rent), amenities, images: finalImages });
            navigate('/owner/manage-pgs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update PG listing.');
        } finally {
            setLoadingSubmit(false);
        }
    };

    if (loadingData) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 2 }}>
                <CircularProgress sx={{ color: '#2563EB' }} />
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Loading PG data...</Typography>
            </Box>
        );
    }

    return (
        <Box className="fade-in-up">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Button
                    startIcon={<ArrowBackRoundedIcon />}
                    onClick={() => navigate('/owner/manage-pgs')}
                    sx={{ color: '#6B7280', mb: 1.5, fontWeight: 600, fontSize: '0.82rem', '&:hover': { backgroundColor: '#F3F4F6' } }}
                >
                    Back to Manage PGs
                </Button>
                <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827' }}>Edit PG Listing</Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mt: 0.5 }}>Update the details of <strong>{formData.pgName}</strong></Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Left Column */}
                    <Grid item xs={12} lg={8}>
                        {/* Basic Info */}
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 2.5, pb: 1.5, borderBottom: '1px solid #F3F4F6' }}>
                                Basic Information
                            </Typography>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>PG Name *</Typography>
                                    <TextField fullWidth required name="pgName" value={formData.pgName} onChange={handleChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Location / Area *</Typography>
                                    <TextField fullWidth required name="location" value={formData.location} onChange={handleChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Full Address</Typography>
                                    <TextField fullWidth name="address" value={formData.address} onChange={handleChange} multiline rows={2}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Monthly Rent (₹) *</Typography>
                                    <TextField fullWidth required name="rent" type="number" value={formData.rent} onChange={handleChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Gender Preference *</Typography>
                                    <FormControl fullWidth required>
                                        <Select name="genderPreference" value={formData.genderPreference} onChange={handleChange} sx={{ borderRadius: '10px' }}>
                                            <MenuItem value="Boys">Boys Only</MenuItem>
                                            <MenuItem value="Girls">Girls Only</MenuItem>
                                            <MenuItem value="Co-ed">Co-ed (Both)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Description</Typography>
                                    <TextField fullWidth name="description" value={formData.description} onChange={handleChange} multiline rows={3}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                            </Grid>
                        </Card>

                        {/* Image Upload */}
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 0.5 }}>Property Images</Typography>
                            <Typography sx={{ fontSize: '0.78rem', color: '#6B7280', mb: 2 }}>
                                {formData.existingImages?.length > 0 ? `${formData.existingImages.length} existing image(s). Add more below.` : 'No images yet. Upload your property photos.'}
                            </Typography>

                            {/* Existing Image Previews */}
                            {formData.existingImages?.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mb: 2.5 }}>
                                    {formData.existingImages.map((url, i) => (
                                        <Box key={i} sx={{ position: 'relative', width: 80, height: 80 }}>
                                            <Box component="img" src={url} sx={{ width: 80, height: 80, borderRadius: '10px', objectFit: 'cover', border: '2px solid #E5E7EB' }} alt="existing" />
                                            <Box
                                                onClick={() => setFormData(prev => ({ ...prev, existingImages: prev.existingImages.filter((_, idx) => idx !== i) }))}
                                                sx={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: '#EF4444', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                                            >
                                                <CloseRoundedIcon sx={{ fontSize: 13 }} />
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                            )}

                            {/* New upload area */}
                            <Box
                                component="label"
                                sx={{
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    gap: 1, p: 3, borderRadius: '12px', cursor: 'pointer',
                                    border: '2px dashed #D1D5DB', backgroundColor: '#F9FAFB',
                                    '&:hover': { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
                                }}
                            >
                                <CloudUploadRoundedIcon sx={{ fontSize: 28, color: '#9CA3AF' }} />
                                <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#374151' }}>
                                    Add more images
                                </Typography>
                                <input type="file" name="images" multiple accept="image/*" hidden onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />
                            </Box>

                            {selectedFiles.length > 0 && (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
                                    {selectedFiles.map((file, i) => (
                                        <Box key={i} sx={{ position: 'relative', width: 80, height: 80 }}>
                                            <Box component="img" src={URL.createObjectURL(file)} sx={{ width: 80, height: 80, borderRadius: '10px', objectFit: 'cover', border: '2px solid #BFDBFE' }} alt={file.name} />
                                        </Box>
                                    ))}
                                    <Typography sx={{ fontSize: '0.75rem', color: '#6B7280', alignSelf: 'center' }}>{selectedFiles.length} new file(s) selected</Typography>
                                </Box>
                            )}
                        </Card>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} lg={4}>
                        {/* Amenities */}
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 0.5 }}>Amenities</Typography>
                            <Typography sx={{ fontSize: '0.78rem', color: '#6B7280', mb: 2.5 }}>Toggle available facilities</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                {AMENITY_CONFIG.map((a) => (
                                    <AmenityChip key={a.key} config={a} selected={amenities[a.key]} onToggle={toggleAmenity} />
                                ))}
                            </Box>
                        </Card>

                        {/* Settings */}
                        <Card sx={{ p: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 2 }}>Listing Settings</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', mb: 3 }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>Active Listing</Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#6B7280', mt: 0.25 }}>Visible to students</Typography>
                                </Box>
                                <Switch
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                />
                            </Box>

                            <Button type="submit" variant="contained" size="large" fullWidth disabled={loadingSubmit}
                                sx={{ py: 1.5, borderRadius: '12px', fontWeight: 700 }}>
                                {loadingSubmit ? 'Saving Changes...' : 'Save Changes'}
                            </Button>
                            <Button variant="outlined" size="large" fullWidth onClick={() => navigate('/owner/manage-pgs')}
                                sx={{ mt: 1.5, borderRadius: '10px' }}>
                                Cancel
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default EditPgPage;
