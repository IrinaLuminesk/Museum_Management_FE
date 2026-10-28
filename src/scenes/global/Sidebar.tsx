import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
    Sidebar as ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
} from "react-pro-sidebar";

import {
    Box,
    IconButton,
    Divider,
    Typography,
    Tooltip
} from "@mui/material";

import { DashboardOutlined, ChevronRight, ChevronLeft } from "@mui/icons-material";
import MuseumOutlinedIcon from '@mui/icons-material/MuseumOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';

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
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [activePath, setActivePath] = useState("/");

    const renderItems = (items: MenuEntry[]): ReactNode =>
        items.map((item) =>
            item.children?.length ? (
                <SubMenu
                    key={item.label}
                    label={item.label}
                    icon={item.icon}

                >
                    {renderItems(item.children)}
                </SubMenu>
            ) : (
                <MenuItem
                    key={item.label}
                    icon={item.icon}
                    active={activePath === item.path}
                    onClick={() => navigate(item.path)}
                >
                    {item.label}
                </MenuItem>
            )
        );

    return (
        <ProSidebar
            collapsed={collapsed}
            width="240px"
            collapsedWidth="72px"
            transitionDuration={350}
            backgroundColor="#ffffff"
            // rootStyles={{
            //     height: "100%",
            //     borderRight: "1px solid #e0e0e0",
            // }}
            rootStyles={{
                height: "auto",
                minHeight: "100%",
                alignSelf: "stretch",
                borderRight: "1px solid #e0e0e0",
                flexShrink: 0,
            }}
        >
            {/* Collapse toggle */}
            <Box
                sx={{
                    height: 56,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-end",
                    px: 1,
                }}
            >
                {!collapsed && (
                    <Tooltip title="Museum Management System" placement="bottom-start">
                        <Typography
                            variant="h5"
                            sx={{
                                pl: 1, fontWeight: 700, flex: 1,
                                textOverflow: "ellipsis",
                                cursor: "default",
                            }}
                        >
                            Museum Management System
                        </Typography>
                    </Tooltip>
                )}
                <IconButton
                    size="large"
                    aria-label={
                        collapsed ? "Expand sidebar" : "Collapse sidebar"
                    }
                    onClick={() => setCollapsed((prev) => !prev)}
                >
                    {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
            </Box>

            <Divider sx={{ paddingTop: "8px" }} />

            {/* Navigation */}
            <Menu
                transitionDuration={300}
                menuItemStyles={{
                    button: ({ active }) => ({
                        margin: "4px 8px",
                        borderRadius: "8px",
                        height: "44px",
                        // color: active ? "#1976d2" : "#424242",
                        //backgroundColor: active ? "#e3f2fd" : undefined,
                        // "&:hover": {
                        //     backgroundColor: active ? "#e3f2fd" : "#f5f5f5",
                        // },
                    }),
                    subMenuContent: {
                        backgroundColor: "#ffffff",
                    },
                }}
            >
                {renderItems(menuItems)}
            </Menu>
        </ProSidebar>
    );
}