import React, { useState, useEffect } from 'react';
import {
    Box, Typography, Grid, Card, CardContent, CircularProgress,
    Divider, Paper, LinearProgress, Chip, Avatar
} from '@mui/material';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CurrencyRupeeRoundedIcon from '@mui/icons-material/CurrencyRupeeRounded';
import api from '../services/api';

const kpiConfig = [
    {
        key: 'totalPgs',
        title: 'Total PGs',
        icon: <HomeWorkRoundedIcon sx={{ fontSize: 28 }} />,
        gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        lightBg: '#EFF6FF',
        iconColor: '#2563EB',
        suffix: '',
    },
    {
        key: 'totalRooms',
        title: 'Total Rooms',
        icon: <BedroomParentRoundedIcon sx={{ fontSize: 28 }} />,
        gradient: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
        lightBg: '#F0FDFA',
        iconColor: '#14B8A6',
        suffix: '',
    },
    {
        key: 'availableBeds',
        title: 'Available Beds',
        icon: <HotelRoundedIcon sx={{ fontSize: 28 }} />,
        gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        lightBg: '#ECFDF5',
        iconColor: '#10B981',
        suffix: '',
    },
    {
        key: 'visitRequests',
        title: 'Visit Requests',
        icon: <VisibilityRoundedIcon sx={{ fontSize: 28 }} />,
        gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        lightBg: '#FFFBEB',
        iconColor: '#F59E0B',
        suffix: '',
    },
];

const OccupancyBar = ({ rate }) => {
    const numRate = Number(rate) || 0;
    const color = numRate > 80 ? '#10B981' : numRate > 50 ? '#F59E0B' : '#EF4444';
    const label = numRate > 80 ? 'Excellent' : numRate > 50 ? 'Moderate' : 'Low';

    return (
        <Card sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
                        Overall Occupancy Rate
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#6B7280', mt: 0.25 }}>
                        Across all your PG properties
                    </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.8rem', color, lineHeight: 1 }}>
                        {numRate}%
                    </Typography>
                    <Chip
                        label={label}
                        size="small"
                        sx={{
                            mt: 0.5, fontSize: '0.72rem', fontWeight: 700, height: 20,
                            backgroundColor: color + '20', color,
                        }}
                    />
                </Box>
            </Box>
            <Box sx={{ position: 'relative' }}>
                <LinearProgress
                    variant="determinate"
                    value={numRate}
                    sx={{
                        height: 14, borderRadius: 8,
                        backgroundColor: '#F3F4F6',
                        '& .MuiLinearProgress-bar': {
                            background: `linear-gradient(90deg, ${color}99 0%, ${color} 100%)`,
                            borderRadius: 8,
                        },
                    }}
                />
                {/* Threshold markers */}
                <Box sx={{ position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)' }}>
                    <Box sx={{ width: 2, height: 26, backgroundColor: '#D1D5DB', borderRadius: 1 }} />
                </Box>
                <Box sx={{ position: 'absolute', top: -6, left: '80%', transform: 'translateX(-50%)' }}>
                    <Box sx={{ width: 2, height: 26, backgroundColor: '#D1D5DB', borderRadius: 1 }} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>0%</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>50% threshold</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>80% threshold</Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#9CA3AF' }}>100%</Typography>
            </Box>
        </Card>
    );
};

const OwnerDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/dashboard/owner-stats');
                setStats(response.data);
            } catch (err) {
                setError('Failed to load dashboard statistics.');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 2 }}>
                <CircularProgress sx={{ color: '#2563EB' }} size={44} />
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Loading dashboard...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="error" variant="h6">{error}</Typography>
            </Box>
        );
    }

    return (
        <Box className="fade-in-up">
            {/* Page Header */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827', lineHeight: 1.2 }}>
                    Dashboard Overview
                </Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mt: 0.5 }}>
                    Here's what's happening with your PG portfolio today
                </Typography>
            </Box>

            {/* KPI Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {kpiConfig.map((kpi, idx) => (
                    <Grid item xs={12} sm={6} lg={3} key={kpi.key}>
                        <Card
                            className="card-lift"
                            sx={{
                                p: 0, overflow: 'hidden', cursor: 'default',
                                animationDelay: `${idx * 80}ms`
                            }}
                        >
                            <Box sx={{
                                p: 2.5,
                                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                            }}>
                                <Box>
                                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>
                                        {kpi.title}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 800, fontSize: '2.5rem', color: '#111827', lineHeight: 1 }}>
                                        {stats[kpi.key] ?? 0}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    width: 52, height: 52, borderRadius: '14px',
                                    background: kpi.gradient,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: `0 6px 16px ${kpi.iconColor}40`,
                                    flexShrink: 0,
                                }}>
                                    <Box sx={{ color: '#fff' }}>{kpi.icon}</Box>
                                </Box>
                            </Box>
                            {/* Bottom color bar */}
                            <Box sx={{ height: 4, background: kpi.gradient }} />
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Occupancy Bar */}
            <OccupancyBar rate={stats.occupancyRate} />

            {/* Activity Panels */}
            <Grid container spacing={3}>
                {/* Recent Activity */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
                                Recent Activity
                            </Typography>
                            <Chip label={`${stats.recentActivity?.length || 0} events`} size="small"
                                sx={{ backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 600, fontSize: '0.72rem' }} />
                        </Box>
                        <Divider sx={{ borderColor: '#F3F4F6' }} />
                        <Box sx={{ p: 2 }}>
                            {stats.recentActivity?.length > 0 ? (
                                stats.recentActivity.map((activity, index) => (
                                    <Box key={activity.id || index} sx={{
                                        display: 'flex', alignItems: 'flex-start', gap: 2,
                                        py: 1.5,
                                        borderBottom: index < stats.recentActivity.length - 1 ? '1px solid #F3F4F6' : 'none',
                                    }}>
                                        <Box sx={{
                                            width: 34, height: 34, borderRadius: '10px',
                                            backgroundColor: '#EFF6FF', display: 'flex',
                                            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                        }}>
                                            <FiberManualRecordRoundedIcon sx={{ fontSize: 10, color: '#2563EB' }} />
                                        </Box>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827', lineHeight: 1.3 }}>
                                                {String(activity.description)}
                                            </Typography>
                                            <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF', mt: 0.25 }}>
                                                {new Date(activity.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box sx={{ py: 4, textAlign: 'center' }}>
                                    <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem' }}>No recent activity</Typography>
                                </Box>
                            )}
                        </Box>
                    </Card>
                </Grid>

                {/* Recent Listings */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%' }}>
                        <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827' }}>
                                Recent Listings Added
                            </Typography>
                            <Chip label={`${stats.recentListings?.length || 0} listings`} size="small"
                                sx={{ backgroundColor: '#F0FDFA', color: '#14B8A6', fontWeight: 600, fontSize: '0.72rem' }} />
                        </Box>
                        <Divider sx={{ borderColor: '#F3F4F6' }} />
                        <Box sx={{ p: 2 }}>
                            {stats.recentListings?.length > 0 ? (
                                stats.recentListings.map((listing, index) => (
                                    <Box key={listing._id} sx={{
                                        display: 'flex', alignItems: 'center', gap: 2,
                                        py: 1.5,
                                        borderBottom: index < stats.recentListings.length - 1 ? '1px solid #F3F4F6' : 'none',
                                    }}>
                                        <Avatar sx={{
                                            width: 38, height: 38, borderRadius: '10px',
                                            background: 'linear-gradient(135deg, #14B8A6, #2563EB)',
                                            fontSize: '0.875rem', fontWeight: 700, flexShrink: 0,
                                        }}>
                                            {listing.pgName?.charAt(0) || 'P'}
                                        </Avatar>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {listing.pgName}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.25 }}>
                                                <LocationOnRoundedIcon sx={{ fontSize: 12, color: '#9CA3AF' }} />
                                                <Typography sx={{ fontSize: '0.75rem', color: '#6B7280' }}>{listing.location}</Typography>
                                            </Box>
                                        </Box>
                                        <Box sx={{
                                            display: 'flex', alignItems: 'center', gap: 0.25,
                                            backgroundColor: '#F0FDFA', px: 1.5, py: 0.5, borderRadius: '8px',
                                        }}>
                                            <CurrencyRupeeRoundedIcon sx={{ fontSize: 13, color: '#14B8A6' }} />
                                            <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#14B8A6' }}>
                                                {listing.rent?.toLocaleString('en-IN')}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                            ) : (
                                <Box sx={{ py: 4, textAlign: 'center' }}>
                                    <Typography sx={{ color: '#9CA3AF', fontSize: '0.875rem' }}>No listings yet</Typography>
                                </Box>
                            )}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default OwnerDashboard;
