import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, CircularProgress, Alert, Chip } from '@mui/material';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import AcUnitRoundedIcon from '@mui/icons-material/AcUnitRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import api from '../services/api';

const BAR_COLORS = ['#2563EB', '#14B8A6', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899'];
const PIE_COLORS_AC = ['#2563EB', '#E5E7EB'];
const PIE_COLORS_STATUS = ['#10B981', '#F59E0B', '#EF4444'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{ backgroundColor: '#1E293B', px: 2, py: 1.5, borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                {label && <Typography sx={{ color: '#94A3B8', fontSize: '0.75rem', mb: 0.5 }}>{label}</Typography>}
                {payload.map((p, i) => (
                    <Typography key={i} sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>
                        {p.name}: {p.value}
                    </Typography>
                ))}
            </Box>
        );
    }
    return null;
};

const CustomPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 30;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="#374151" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" style={{ fontSize: '0.75rem', fontWeight: 600 }}>
            {`${name} (${(percent * 100).toFixed(0)}%)`}
        </text>
    );
};

const ChartCard = ({ title, subtitle, icon, children, colSpan = 6 }) => (
    <Grid item xs={12} md={colSpan}>
        <Card sx={{ height: '100%' }}>
            <Box sx={{ px: 3, pt: 3, pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{
                        width: 38, height: 38, borderRadius: '10px',
                        background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Box sx={{ color: '#fff', display: 'flex' }}>{icon}</Box>
                    </Box>
                    <Box>
                        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#111827', lineHeight: 1.2 }}>{title}</Typography>
                        <Typography sx={{ fontSize: '0.75rem', color: '#9CA3AF' }}>{subtitle}</Typography>
                    </Box>
                </Box>
            </Box>
            <CardContent sx={{ pt: 1, pb: '16px !important' }}>
                {children}
            </CardContent>
        </Card>
    </Grid>
);

export default function VisualizationsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState({ pgsByLocation: [], roomsByType: [], availabilityStatus: [], acVsNonAc: [] });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [pgResponse, roomResponse, availabilityResponse] = await Promise.all([
                    api.get('/pg'), api.get('/rooms'), api.get('/availability')
                ]);
                const pgs = pgResponse.data;
                const rooms = roomResponse.data;
                const availability = availabilityResponse.data;

                if (!pgs.length) { setData({ pgsByLocation: [], roomsByType: [], availabilityStatus: [], acVsNonAc: [] }); return; }

                const locationCounts = pgs.reduce((acc, pg) => { const loc = pg.location || 'Unknown'; acc[loc] = (acc[loc] || 0) + 1; return acc; }, {});
                const pgsByLocation = Object.entries(locationCounts).map(([name, count]) => ({ name, count }));

                const typeCounts = rooms.reduce((acc, room) => { acc[room.roomType] = (acc[room.roomType] || 0) + 1; return acc; }, {});
                const roomsByType = Object.entries(typeCounts).map(([name, count]) => ({ name, count }));

                const acCounts = rooms.reduce((acc, room) => { const t = room.acAvailable ? 'AC' : 'Non-AC'; acc[t] = (acc[t] || 0) + 1; return acc; }, {});
                const acVsNonAc = Object.entries(acCounts).map(([name, value]) => ({ name, value }));

                const statusCounts = availability.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});
                const availabilityStatus = Object.entries(statusCounts).map(([name, value]) => ({ name, value }));

                setData({ pgsByLocation, roomsByType, availabilityStatus, acVsNonAc });
                setError('');
            } catch (err) {
                setError('Failed to load visualization data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', gap: 2 }}>
            <CircularProgress sx={{ color: '#2563EB' }} />
            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Loading analytics...</Typography>
        </Box>
    );

    if (error) return <Alert severity="error" sx={{ mt: 2, borderRadius: '12px' }}>{error}</Alert>;

    const hasData = Object.values(data).some(arr => arr.length > 0);

    if (!hasData) return (
        <Box sx={{ mt: 8, textAlign: 'center' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: '#374151', mb: 1 }}>No Data Yet</Typography>
            <Typography sx={{ color: '#9CA3AF' }}>Add PG listings and rooms to see analytics.</Typography>
        </Box>
    );

    return (
        <Box className="fade-in-up">
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#111827' }}>Analytics & Visualizations</Typography>
                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem', mt: 0.5 }}>
                    Real-time insights from your PG portfolio
                </Typography>
            </Box>

            <Grid container spacing={3}>
                {/* Chart 1: PGs by Location — full width bar */}
                <ChartCard
                    title="PGs by Location"
                    subtitle="Distribution of PG properties"
                    icon={<LocationOnRoundedIcon sx={{ fontSize: 18 }} />}
                    colSpan={12}
                >
                    <Box sx={{ height: 320, mt: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            {data.pgsByLocation.length > 0 ? (
                                <BarChart data={data.pgsByLocation} barSize={40}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="count" name="PGs" radius={[6, 6, 0, 0]}>
                                        {data.pgsByLocation.map((_, i) => (
                                            <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            ) : (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                    <Typography color="textSecondary">No location data available.</Typography>
                                </Box>
                            )}
                        </ResponsiveContainer>
                    </Box>
                </ChartCard>

                {/* Chart 2: Rooms by Type */}
                <ChartCard
                    title="Rooms by Type"
                    subtitle="Room type distribution"
                    icon={<BedroomParentRoundedIcon sx={{ fontSize: 18 }} />}
                    colSpan={6}
                >
                    <Box sx={{ height: 300, mt: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            {data.roomsByType.length > 0 ? (
                                <BarChart data={data.roomsByType} barSize={36}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="count" name="Rooms" radius={[6, 6, 0, 0]}>
                                        {data.roomsByType.map((_, i) => (
                                            <Cell key={i} fill={BAR_COLORS[(i + 2) % BAR_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            ) : (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                    <Typography color="textSecondary">No room data available.</Typography>
                                </Box>
                            )}
                        </ResponsiveContainer>
                    </Box>
                </ChartCard>

                {/* Chart 3: Availability Status Pie */}
                <ChartCard
                    title="Availability Status"
                    subtitle="Current room status breakdown"
                    icon={<EventAvailableRoundedIcon sx={{ fontSize: 18 }} />}
                    colSpan={6}
                >
                    <Box sx={{ height: 300, mt: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            {data.availabilityStatus.length > 0 ? (
                                <PieChart>
                                    <Pie data={data.availabilityStatus} cx="50%" cy="50%" outerRadius={90}
                                        dataKey="value" labelLine={false} label={CustomPieLabel}>
                                        {data.availabilityStatus.map((_, i) => (
                                            <Cell key={i} fill={PIE_COLORS_STATUS[i % PIE_COLORS_STATUS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            ) : (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                    <Typography color="textSecondary">No availability data.</Typography>
                                </Box>
                            )}
                        </ResponsiveContainer>
                    </Box>
                </ChartCard>

                {/* Chart 4: AC vs Non-AC */}
                <ChartCard
                    title="AC vs Non-AC Rooms"
                    subtitle="Air conditioning breakdown"
                    icon={<AcUnitRoundedIcon sx={{ fontSize: 18 }} />}
                    colSpan={6}
                >
                    <Box sx={{ height: 300, mt: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            {data.acVsNonAc.length > 0 ? (
                                <PieChart>
                                    <Pie data={data.acVsNonAc} cx="50%" cy="50%" outerRadius={90}
                                        dataKey="value" labelLine={false} label={CustomPieLabel}>
                                        {data.acVsNonAc.map((_, i) => (
                                            <Cell key={i} fill={PIE_COLORS_AC[i % PIE_COLORS_AC.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            ) : (
                                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                                    <Typography color="textSecondary">No room data available.</Typography>
                                </Box>
                            )}
                        </ResponsiveContainer>
                    </Box>
                </ChartCard>

                {/* Legend Row */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ p: 2.5 }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.85rem', color: '#374151', mb: 1.5 }}>Status Legend</Typography>
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            {[{ label: 'Available', color: '#10B981' }, { label: 'Limited', color: '#F59E0B' }, { label: 'Full', color: '#EF4444' }].map(item => (
                                <Box key={item.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: item.color }} />
                                    <Typography sx={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 500 }}>{item.label}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
