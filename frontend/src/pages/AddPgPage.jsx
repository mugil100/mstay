import React, { useState } from 'react';
import {
    Box, Typography, TextField, Button, FormControl, InputLabel, Select,
    MenuItem, Grid, Card, Alert, Tooltip, Switch, FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
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
                '&:hover': {
                    borderColor: '#93C5FD',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                },
            }}
        >
            {config.icon}
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, lineHeight: 1, textAlign: 'center' }}>
                {config.label}
            </Typography>
        </Box>
    </Tooltip>
);

const ImageDropZone = ({ selectedFiles, onChange }) => {
    const [dragging, setDragging] = useState(false);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        onChange(files);
    };

    return (
        <Box>
            <Box
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                component="label"
                sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 1.5, p: 4, borderRadius: '14px', cursor: 'pointer',
                    border: `2px dashed ${dragging ? '#2563EB' : '#D1D5DB'}`,
                    backgroundColor: dragging ? '#EFF6FF' : '#F9FAFB',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: '#2563EB', backgroundColor: '#EFF6FF' },
                }}
            >
                <Box sx={{
                    width: 52, height: 52, borderRadius: '14px',
                    background: dragging ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : '#E5E7EB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s ease',
                }}>
                    <CloudUploadRoundedIcon sx={{ fontSize: 26, color: dragging ? '#fff' : '#9CA3AF' }} />
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.9rem', color: '#374151' }}>
                        Drop images here or <span style={{ color: '#2563EB' }}>click to browse</span>
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', mt: 0.25 }}>
                        PNG, JPG, WEBP up to 10MB each
                    </Typography>
                </Box>
                <input type="file" name="images" multiple accept="image/*" hidden onChange={(e) => onChange(Array.from(e.target.files))} />
            </Box>

            {selectedFiles.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, mt: 2 }}>
                    {selectedFiles.map((file, i) => (
                        <Box key={i} sx={{ position: 'relative', width: 80, height: 80 }}>
                            <Box
                                component="img"
                                src={URL.createObjectURL(file)}
                                sx={{ width: 80, height: 80, borderRadius: '10px', objectFit: 'cover', border: '2px solid #E5E7EB' }}
                                alt={file.name}
                            />
                            <Box
                                onClick={() => onChange(selectedFiles.filter((_, idx) => idx !== i))}
                                sx={{
                                    position: 'absolute', top: -8, right: -8,
                                    width: 22, height: 22, borderRadius: '50%',
                                    background: '#EF4444', color: '#fff',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer',
                                }}
                            >
                                <CloseRoundedIcon sx={{ fontSize: 13 }} />
                            </Box>
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

const AddPgPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        pgName: '', address: '', location: '', rent: '',
        genderPreference: '', description: '', images: '', isActive: true
    });
    const [amenities, setAmenities] = useState({
        wifi: false, food: false, laundry: false, parking: false,
        powerBackup: false, cctv: false, gym: false, studyRoom: false
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleAmenity = (key) => setAmenities(prev => ({ ...prev, [key]: !prev[key] }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            let uploadedImageUrls = [];
            if (selectedFiles.length > 0) {
                const imageFormData = new FormData();
                selectedFiles.forEach(file => imageFormData.append('images', file));
                const uploadResponse = await api.post('/upload', imageFormData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                uploadedImageUrls = uploadResponse.data.imageUrls;
            }
            const submitData = { ...formData, rent: Number(formData.rent), amenities, images: uploadedImageUrls };
            await api.post('/pg', submitData);
            navigate('/owner/manage-pgs');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add PG listing. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className="fade-in-up">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827' }}>Add New PG Listing</Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mt: 0.5 }}>Fill in the details to list your PG property</Typography>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>{error}</Alert>}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* Left Column */}
                    <Grid item xs={12} lg={8}>
                        {/* Basic Info Card */}
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 2.5, pb: 1.5, borderBottom: '1px solid #F3F4F6' }}>
                                Basic Information
                            </Typography>
                            <Grid container spacing={2.5}>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>PG Name *</Typography>
                                    <TextField fullWidth required name="pgName" placeholder="e.g. Sri Lakshmi PG" value={formData.pgName} onChange={handleChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Location / Area *</Typography>
                                    <TextField fullWidth required name="location" placeholder="e.g. T. Nagar, Chennai" value={formData.location} onChange={handleChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Full Address</Typography>
                                    <TextField fullWidth name="address" placeholder="Street address, landmark..." value={formData.address} onChange={handleChange} multiline rows={2}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Monthly Rent (₹) *</Typography>
                                    <TextField fullWidth required name="rent" type="number" placeholder="e.g. 8500" value={formData.rent} onChange={handleChange}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Gender Preference *</Typography>
                                    <FormControl fullWidth required>
                                        <Select name="genderPreference" value={formData.genderPreference} onChange={handleChange} displayEmpty
                                            sx={{ borderRadius: '10px' }}>
                                            <MenuItem value="" disabled><span style={{ color: '#9CA3AF' }}>Select preference</span></MenuItem>
                                            <MenuItem value="Boys">Boys Only</MenuItem>
                                            <MenuItem value="Girls">Girls Only</MenuItem>
                                            <MenuItem value="Co-ed">Co-ed (Both)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151', mb: 0.75 }}>Description</Typography>
                                    <TextField fullWidth name="description" placeholder="Describe your PG, nearby landmarks, special features..." value={formData.description} onChange={handleChange} multiline rows={3}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
                                </Grid>
                            </Grid>
                        </Card>

                        {/* Image Upload Card */}
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 0.5 }}>Property Images</Typography>
                            <Typography sx={{ fontSize: '0.78rem', color: '#6B7280', mb: 2.5 }}>Upload multiple images to showcase your PG</Typography>
                            <ImageDropZone selectedFiles={selectedFiles} onChange={setSelectedFiles} />
                        </Card>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} lg={4}>
                        {/* Amenities Card */}
                        <Card sx={{ p: 3, mb: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 0.5 }}>Amenities</Typography>
                            <Typography sx={{ fontSize: '0.78rem', color: '#6B7280', mb: 2.5 }}>Select all available facilities</Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                                {AMENITY_CONFIG.map((a) => (
                                    <AmenityChip key={a.key} config={a} selected={amenities[a.key]} onToggle={toggleAmenity} />
                                ))}
                            </Box>
                        </Card>

                        {/* Settings Card */}
                        <Card sx={{ p: 3 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', mb: 2 }}>Listing Settings</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderRadius: '10px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                                <Box>
                                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#111827' }}>Active Listing</Typography>
                                    <Typography sx={{ fontSize: '0.75rem', color: '#6B7280', mt: 0.25 }}>Visible to students</Typography>
                                </Box>
                                <Switch
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                    sx={{
                                        '& .MuiSwitch-thumb': {},
                                        '& .Mui-checked + .MuiSwitch-track': { backgroundColor: '#2563EB' },
                                    }}
                                />
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={loading}
                                sx={{ mt: 3, py: 1.5, borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem' }}
                            >
                                {loading ? 'Publishing...' : 'Publish PG Listing'}
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                onClick={() => navigate('/owner/manage-pgs')}
                                sx={{ mt: 1.5, borderRadius: '10px' }}
                            >
                                Cancel
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default AddPgPage;
