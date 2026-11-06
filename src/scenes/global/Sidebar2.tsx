import React, { useState, type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Divider,
    IconButton,
    Typography,
    Popover,
    styled,
    type Theme,
    type CSSObject,
} from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    ExpandLess,
    ExpandMore,
    Layers as LogoIcon,
} from '@mui/icons-material';

import { DashboardOutlined } from "@mui/icons-material";
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
const drawerWidth = 260;

// Styles for when the drawer is expanded
const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

// Styles for when the drawer is collapsed (mini variant)
const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

interface MenuEntry {
    label: string;
    icon: ReactNode;
    path?: string;
    children?: MenuEntry[];
}


const menuItems: MenuEntry[] = [
    {
        label: "Dashboard",
        icon: <DashboardOutlined />,
        path: "/",
    },
    {
        label: "Master Data",
        icon: <StorageOutlinedIcon />,
        children: [
            {
                label: "Museum",
                icon: <MuseumOutlinedIcon />,
                path: "/Masterdata/Museum"
            },
        ]
    },
    {
        label: "Configuration Management",
        icon: <SettingsOutlinedIcon />,
        children: [
            {
                label: "Allcode",
                icon: <CodeOutlinedIcon />,
                path: "/ConfigurationManagement/Allcode"
            },
        ]
    }
];

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const [textVisible, setTextVisible] = useState(true);
    const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

    const [popoverAnchors, setPopoverAnchors] = useState<Record<string, HTMLElement | null>>({});

    const handleDrawerToggle = () => {
        // setOpen(!open);
        // if (open) setSubmenuOpen(false); // Close submenus automatically when collapsing
        if (open) {
            // Closing: Hide text instantly so it doesn't cause vertical stretching
            setTextVisible(false);
            setOpen(false);
            setPopoverAnchors({});
        } else {
            // Opening: Expand drawer first, then reveal text after transition completes
            setOpen(true);
            setTimeout(() => {
                setTextVisible(true);
            }, 200);
        }
    };

    const handleSubmenuToggle = (label: string) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    const handlePopoverOpen = (label: string, element: HTMLElement) => {
        setPopoverAnchors((prev) => ({ ...prev, [label]: element }));
    };

    const handlePopoverClose = (label: string) => {
        setPopoverAnchors((prev) => ({ ...prev, [label]: null }));
    };

    return (
        <StyledDrawer variant="permanent" open={open}>
            {/* 1. TOP AREA: Logo & Collapse Button */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: open ? 'space-between' : 'center',
                    px: [1, 2],
                    minHeight: 64,
                    flexShrink: 0
                }}
            >
                {open && textVisible && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 1, flexShrink: 0 }}>
                        <LogoIcon color="primary" />
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700 }}>
                            AppLogo
                        </Typography>
                    </Box>
                )}
                <IconButton onClick={handleDrawerToggle}>
                    {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>

            <Divider />

            {/* 2. MIDDLE AREA: Scrollable Menu & Sub-menus */}
            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '&::-webkit-scrollbar': {
                        width: '6px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: 'rgba(0,0,0,0.15)',
                        borderRadius: '4px',
                    },
                }}
            >
                <List component="nav" sx={{ px: 1 }}>
                    {menuItems.map((item) => {
                        const hasChildren = !!item.children?.length;
                        const isExpanded = !!expandedMenus[item.label];
                        const isPopoverOpen = Boolean(popoverAnchors[item.label]);

                        return (
                            <React.Fragment key={item.label}>
                                {/* Main Menu */}
                                <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }}>
                                    <ListItemButton
                                        component={hasChildren ? 'div' : RouterLink}
                                        to={hasChildren ? undefined : item.path}
                                        // onClick={hasChildren
                                        //     ? () => handleSubmenuToggle(item.label)
                                        //     : undefined
                                        // }
                                        onClick={(e) => {
                                            if (!open && hasChildren) {
                                                // Sidebar closed: Toggle popover for this specific item
                                                if (isPopoverOpen) {
                                                    handlePopoverClose(item.label);
                                                } else {
                                                    handlePopoverOpen(item.label, e.currentTarget);
                                                }
                                            } else if (hasChildren) {
                                                // Sidebar open: Toggle inline collapse
                                                handleSubmenuToggle(item.label);
                                            }
                                        }}
                                        sx={{
                                            minHeight: 48,
                                            justifyContent: open ? 'initial' : 'center',
                                            px: 2.5,
                                            borderRadius: 1,
                                        }}
                                    >
                                        <ListItemIcon
                                            sx={{
                                                minWidth: 0,
                                                mr: open ? 1 : 'auto',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {item.icon}
                                        </ListItemIcon>

                                        <ListItemText
                                            primary={item.label}
                                            sx={{
                                                display: textVisible ? 'block' : 'none',
                                                flex: 1,
                                                minWidth: 0,
                                                '& .MuiListItemText-primary': {
                                                    whiteSpace: 'normal',
                                                    overflowWrap: 'break-word',
                                                    lineHeight: 1.4,
                                                },
                                            }}
                                        />

                                        {hasChildren && open && textVisible && (
                                            isExpanded ? <ExpandLess /> : <ExpandMore />
                                        )}
                                    </ListItemButton>
                                </ListItem>

                                {/* Sub-menu */}
                                {hasChildren && open && textVisible && (
                                    <Collapse
                                        in={isExpanded}
                                        timeout="auto"
                                        unmountOnExit
                                    >
                                        <List
                                            component="div"
                                            disablePadding
                                            sx={{
                                                pl: 2.0,
                                                py: 0.5,
                                                position: 'relative',
                                                backgroundColor: '#d8e2f2',
                                                borderRadius: 2,
                                                mx: 1,
                                                my: 0.5,
                                                boxShadow: 'inset 2px 0 0 0 rgba(0, 0, 0, 0.08)',
                                                '&::before': {
                                                    content: '""',
                                                    position: 'absolute',
                                                    left: '16px',
                                                    top: '8px',
                                                    bottom: '8px',
                                                    width: '2px',
                                                    backgroundColor: 'primary.main',
                                                    borderRadius: '4px',
                                                    opacity: 0.4,
                                                },
                                            }}
                                        >
                                            {item.children?.map((child) => (
                                                <ListItemButton
                                                    key={child.label}
                                                    component={RouterLink}
                                                    to={child.path}
                                                    sx={{
                                                        borderRadius: 1,
                                                        my: 0.5,
                                                        py: 0.75,
                                                        '&:hover': {
                                                            backgroundColor: 'action.hover',
                                                        },
                                                    }}
                                                >
                                                    <ListItemIcon
                                                        sx={{
                                                            minWidth: 0,
                                                            mr: open ? 1 : 'auto',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        {child.icon}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={child.label}
                                                        slotProps={{
                                                            primary: {
                                                                variant: 'body2',
                                                                fontWeight: 500,
                                                                color: 'text.secondary',
                                                            },
                                                        }}
                                                    />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                )}
                                {hasChildren && !open && (
                                    <Popover
                                        open={isPopoverOpen}
                                        anchorEl={popoverAnchors[item.label]}
                                        onClose={() => handlePopoverClose(item.label)}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        PaperProps={{
                                            elevation: 3,
                                            sx: {
                                                ml: 1.5,
                                                minWidth: 200,
                                                borderRadius: 2,
                                                p: 1,
                                                backgroundColor: '#ffffff',
                                            }
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ px: 2, py: 1, fontWeight: 700, color: 'text.primary' }}
                                        >
                                            {item.label}
                                        </Typography>
                                        <Divider sx={{ my: 0.5 }} />
                                        <List dense sx={{ p: 0 }}>
                                            {item.children?.map((child) => (
                                                <ListItemButton
                                                    key={child.label}
                                                    component={RouterLink}
                                                    to={child.path}
                                                    onClick={() => handlePopoverClose(item.label)}
                                                    sx={{
                                                        borderRadius: 1,
                                                        my: 0.5,
                                                        '&:hover': { backgroundColor: 'action.hover' }
                                                    }}
                                                >
                                                    {child.icon && (
                                                        <ListItemIcon sx={{ minWidth: 32, color: 'text.secondary' }}>
                                                            {child.icon}
                                                        </ListItemIcon>
                                                    )}
                                                    <ListItemText
                                                        primary={child.label}
                                                        slotProps={{
                                                            primary: {
                                                                variant: 'body2',
                                                                fontWeight: 500,
                                                            }
                                                        }}
                                                    />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Popover>
                                )}
                            </React.Fragment>
                        );
                    })}
                </List>
            </Box>
            <Divider />
        </StyledDrawer>
    );
}