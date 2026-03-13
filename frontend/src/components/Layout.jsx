import { useState, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText,
    Typography, AppBar, Toolbar, CssBaseline, Divider, Avatar,
    IconButton, Menu, MenuItem, Badge, Tooltip, useTheme, useMediaQuery
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import HomeWorkRoundedIcon from '@mui/icons-material/HomeWorkRounded';
import { AuthContext } from '../context/AuthContext';

const DRAWER_WIDTH = 248;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardRoundedIcon />, path: '/' },
    { text: 'Add PG', icon: <AddHomeRoundedIcon />, path: '/owner/add-pg' },
    { text: 'Manage PGs', icon: <ApartmentRoundedIcon />, path: '/owner/manage-pgs' },
    { text: 'Room Details', icon: <BedroomParentRoundedIcon />, path: '/rooms' },
    { text: 'Availability', icon: <EventAvailableRoundedIcon />, path: '/availability' },
    { text: 'Visualizations', icon: <BarChartRoundedIcon />, path: '/visualizations' },
];

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout, user } = useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const drawerContent = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', py: 1 }}>
            {/* Logo Area */}
            <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <Box sx={{
                    width: 48, height: 48, borderRadius: '12px',
                    backgroundColor: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                    p: 0.5, overflow: 'hidden'
                }}>
                    <img src="/logo.jpeg" alt="MOV Stay Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
                <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: '1.05rem', color: '#111827', lineHeight: 1.2 }}>
                        MOV Stay
                    </Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: '#6B7280', fontWeight: 600, lineHeight: 1, letterSpacing: '0.02em' }}>
                        MATCH • OPTIMIZE • VERIFY
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ px: 2, mb: 1 }}>
                <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.08em', textTransform: 'uppercase', px: 1.5 }}>
                    Main Menu
                </Typography>
            </Box>

            {/* Nav Items */}
            <List sx={{ px: 1.5, flexGrow: 1, gap: 0.5, display: 'flex', flexDirection: 'column' }}>
                {menuItems.map((item) => {
                    const active = isActive(item.path);
                    return (
                        <ListItemButton
                            key={item.text}
                            onClick={() => { navigate(item.path); if (isMobile) setMobileOpen(false); }}
                            sx={{
                                borderRadius: '10px',
                                mb: 0.25,
                                px: 1.5,
                                py: 1.1,
                                backgroundColor: active ? 'primary.main' : 'transparent',
                                color: active ? '#fff' : '#4B5563',
                                '&:hover': {
                                    backgroundColor: active ? 'primary.dark' : '#F3F4F6',
                                    color: active ? '#fff' : '#111827',
                                },
                            }}
                        >
                            <ListItemIcon sx={{
                                color: active ? '#fff' : '#9CA3AF',
                                minWidth: 36,
                                '& svg': { fontSize: '1.25rem' }
                            }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.text}
                                primaryTypographyProps={{
                                    fontWeight: active ? 700 : 500,
                                    fontSize: '0.875rem',
                                }}
                            />
                            {active && (
                                <Box sx={{
                                    width: 6, height: 6, borderRadius: '50%',
                                    backgroundColor: 'rgba(255,255,255,0.7)'
                                }} />
                            )}
                        </ListItemButton>
                    );
                })}
            </List>

            <Divider sx={{ mx: 2, my: 1, borderColor: '#F3F4F6' }} />

            {/* Logout */}
            <Box sx={{ px: 1.5, pb: 2 }}>
                <ListItemButton
                    onClick={handleLogout}
                    sx={{
                        borderRadius: '10px',
                        px: 1.5, py: 1.1,
                        color: '#EF4444',
                        '&:hover': { backgroundColor: '#FEF2F2', color: '#DC2626' },
                    }}
                >
                    <ListItemIcon sx={{ color: '#EF4444', minWidth: 36, '& svg': { fontSize: '1.25rem' } }}>
                        <LogoutRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 600, fontSize: '0.875rem' }} />
                </ListItemButton>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
            <CssBaseline />

            {/* AppBar */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    zIndex: (t) => t.zIndex.drawer + 1,
                    width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { md: `${DRAWER_WIDTH}px` },
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #E5E7EB',
                }}
            >
                <Toolbar sx={{ height: 64, px: { xs: 2, md: 3 }, gap: 1 }}>
                    {/* Mobile hamburger */}
                    <IconButton
                        edge="start"
                        onClick={() => setMobileOpen(true)}
                        sx={{ display: { md: 'none' }, color: '#374151', mr: 1 }}
                    >
                        <MenuRoundedIcon />
                    </IconButton>

                    {/* Page title derived from path */}
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#111827' }}>
                            {menuItems.find(m => isActive(m.path))?.text || 'Dashboard'}
                        </Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: '#2563EB', fontWeight: 700, letterSpacing: '0.05em' }}>
                            MATCH • OPTIMIZE • VERIFY
                        </Typography>
                    </Box>

                    {/* Notifications */}
                    <Tooltip title="Notifications">
                        <IconButton sx={{
                            color: '#6B7280',
                            backgroundColor: '#F9FAFB',
                            border: '1px solid #E5E7EB',
                            borderRadius: '10px',
                            width: 38, height: 38,
                            '&:hover': { backgroundColor: '#EFF6FF', color: '#2563EB' }
                        }}>
                            <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: '0.6rem', minWidth: 16, height: 16 } }}>
                                <NotificationsNoneRoundedIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                    </Tooltip>

                    {/* User avatar + dropdown */}
                    <Box
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        sx={{
                            display: 'flex', alignItems: 'center', gap: 1,
                            cursor: 'pointer', ml: 1, px: 1.5, py: 0.75,
                            borderRadius: '10px', border: '1px solid #E5E7EB',
                            backgroundColor: '#F9FAFB',
                            transition: 'all 0.15s ease',
                            '&:hover': { backgroundColor: '#EFF6FF', borderColor: '#BFDBFE' }
                        }}
                    >
                        <Avatar sx={{
                            width: 30, height: 30, fontSize: '0.8rem', fontWeight: 700,
                            background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                        }}>
                            {user?.name?.charAt(0)?.toUpperCase() || 'O'}
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827', lineHeight: 1.2 }}>
                                {user?.name || 'Owner'}
                            </Typography>
                            <Typography sx={{ fontSize: '0.67rem', color: '#9CA3AF', lineHeight: 1 }}>
                                PG Owner
                            </Typography>
                        </Box>
                        <KeyboardArrowDownRoundedIcon sx={{ fontSize: '1rem', color: '#9CA3AF' }} />
                    </Box>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        PaperProps={{ sx: { mt: 1, borderRadius: '12px', minWidth: 160, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' } }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem disabled sx={{ opacity: 0.7 }}>
                            <Typography variant="body2" fontWeight={600}>{user?.email || ''}</Typography>
                        </MenuItem>
                        <Divider />
                        <MenuItem
                            onClick={() => { setAnchorEl(null); handleLogout(); }}
                            sx={{ color: '#EF4444', fontWeight: 600, fontSize: '0.875rem' }}
                        >
                            <LogoutRoundedIcon sx={{ mr: 1, fontSize: '1rem' }} />
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            {/* Sidebar — Mobile */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Sidebar — Desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
                }}
                open
            >
                {drawerContent}
            </Drawer>

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
                    minHeight: '100vh',
                    backgroundColor: '#F9FAFB',
                }}
            >
                <Toolbar sx={{ height: 64 }} />
                <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1400, mx: 'auto' }}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}
