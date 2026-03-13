import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2563EB',
            light: '#3B82F6',
            dark: '#1D4ED8',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#14B8A6',
            light: '#2DD4BF',
            dark: '#0F766E',
            contrastText: '#ffffff',
        },
        warning: {
            main: '#F59E0B',
            light: '#FCD34D',
            dark: '#D97706',
        },
        success: {
            main: '#10B981',
            light: '#34D399',
            dark: '#059669',
        },
        error: {
            main: '#EF4444',
            light: '#F87171',
            dark: '#DC2626',
        },
        background: {
            default: '#F9FAFB',
            paper: '#FFFFFF',
        },
        text: {
            primary: '#111827',
            secondary: '#6B7280',
        },
        divider: '#E5E7EB',
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 800 },
        h2: { fontWeight: 800 },
        h3: { fontWeight: 700 },
        h4: {
            fontWeight: 700,
            fontSize: '1.75rem', // 28px
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.25rem', // 20px
        },
        h6: {
            fontWeight: 600,
            fontSize: '1rem', // 16px
        },
        body1: {
            fontSize: '0.875rem', // 14px
        },
        body2: {
            fontSize: '0.8125rem', // 13px
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.01em',
        },
    },
    shape: {
        borderRadius: 12,
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(0,0,0,0.06), 0px 1px 3px rgba(0,0,0,0.1)',
        '0px 1px 5px rgba(0,0,0,0.07), 0px 2px 4px rgba(0,0,0,0.07)',
        '0px 2px 8px rgba(0,0,0,0.08), 0px 4px 6px rgba(0,0,0,0.06)',
        '0px 4px 12px rgba(0,0,0,0.08), 0px 6px 10px rgba(0,0,0,0.06)',
        '0px 6px 16px rgba(0,0,0,0.09)',
        '0px 8px 20px rgba(0,0,0,0.1)',
        '0px 10px 24px rgba(0,0,0,0.1)',
        '0px 12px 28px rgba(0,0,0,0.11)',
        '0px 14px 32px rgba(0,0,0,0.12)',
        '0px 16px 36px rgba(0,0,0,0.12)',
        '0px 18px 40px rgba(0,0,0,0.13)',
        '0px 20px 44px rgba(0,0,0,0.13)',
        '0px 22px 48px rgba(0,0,0,0.14)',
        '0px 24px 52px rgba(0,0,0,0.14)',
        '0px 26px 56px rgba(0,0,0,0.15)',
        '0px 28px 60px rgba(0,0,0,0.15)',
        '0px 30px 64px rgba(0,0,0,0.16)',
        '0px 32px 68px rgba(0,0,0,0.16)',
        '0px 34px 72px rgba(0,0,0,0.17)',
        '0px 36px 76px rgba(0,0,0,0.17)',
        '0px 38px 80px rgba(0,0,0,0.18)',
        '0px 40px 84px rgba(0,0,0,0.18)',
        '0px 42px 88px rgba(0,0,0,0.19)',
        '0px 44px 92px rgba(0,0,0,0.2)',
    ],
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    padding: '9px 20px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                        boxShadow: '0 6px 20px rgba(37, 99, 235, 0.45)',
                    },
                },
                containedSecondary: {
                    background: 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
                    boxShadow: '0 4px 14px rgba(20, 184, 166, 0.35)',
                },
                sizeLarge: {
                    padding: '12px 28px',
                    fontSize: '1rem',
                    borderRadius: 12,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: '1px solid #F3F4F6',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.06)',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    '&:hover': {
                        boxShadow: '0 4px 16px rgba(0,0,0,0.1), 0 8px 24px rgba(0,0,0,0.07)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    borderRadius: 16,
                },
                elevation1: {
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.06)',
                },
                elevation3: {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#111827',
                    boxShadow: '0 1px 0 #E5E7EB',
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    border: 'none',
                    boxShadow: '2px 0 20px rgba(0,0,0,0.06)',
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 10,
                        backgroundColor: '#F9FAFB',
                        transition: 'all 0.2s',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2563EB',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#2563EB',
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: '0.75rem',
                },
            },
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    height: 10,
                    backgroundColor: '#E5E7EB',
                },
            },
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    transition: 'all 0.15s ease',
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 20,
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#111827',
                    fontSize: '0.78rem',
                    borderRadius: 8,
                    padding: '6px 10px',
                },
            },
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    border: 'none',
                    '& .MuiDataGrid-columnHeaders': {
                        backgroundColor: '#F9FAFB',
                        borderBottom: '1px solid #E5E7EB',
                    },
                    '& .MuiDataGrid-cell': {
                        borderBottom: '1px solid #F3F4F6',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#EFF6FF',
                    },
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                outlined: {
                    borderRadius: 10,
                },
            },
        },
    },
});

export default theme;
