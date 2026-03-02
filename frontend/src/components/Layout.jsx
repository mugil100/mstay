import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const drawerWidth = 240;

const menuItems = [
    { text: 'PG Listings', icon: <HomeIcon />, path: '/' },
    { text: 'Room Details', icon: <BedroomParentIcon />, path: '/rooms' },
    { text: 'Availability Updates', icon: <EventAvailableIcon />, path: '/availability' },
];

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#2c3e50' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div">
                        Smart Housing Solution for Students
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => navigate(item.path)}
                                selected={location.pathname === item.path}
                                sx={{
                                    backgroundColor: location.pathname === item.path ? '#e0f7fa' : 'inherit',
                                    '&:hover': { backgroundColor: '#b2ebf2' }
                                }}
                            >
                                <ListItemIcon sx={{ color: location.pathname === item.path ? '#00796b' : 'inherit' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
