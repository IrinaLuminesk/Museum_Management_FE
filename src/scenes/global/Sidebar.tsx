import { useState, type ReactNode } from "react";
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
} from "@mui/material";

import {
    DashboardOutlined,
    SettingsOutlined,
    FolderOutlined,
    SecurityOutlined,
    ChevronLeft,
    ChevronRight,
} from "@mui/icons-material";

interface MenuEntry {
    label: string;
    icon: ReactNode;
    path?: string;
    children?: MenuEntry[];
}

interface SidebarProps {
    onNavigate?: (path: string) => void;
}

const menuItems: MenuEntry[] = [
    {
        label: "Dashboard",
        icon: <DashboardOutlined />,
        path: "/dashboard",
    },
    {
        label: "Users",
        icon: <DashboardOutlined />,
        children: [
            {
                label: "All Users",
                icon: <DashboardOutlined />,
                path: "/users",
            },
            {
                label: "Roles",
                icon: <SecurityOutlined />,
                path: "/users/roles",
            },
        ],
    },
    {
        label: "Projects",
        icon: <FolderOutlined />,
        children: [
            {
                label: "All Projects",
                icon: <FolderOutlined />,
                path: "/projects",
            },
            {
                label: "Archived",
                icon: <FolderOutlined />,
                path: "/projects/archived",
            },
        ],
    },
    {
        label: "Settings",
        icon: <SettingsOutlined />,
        children: [
            {
                label: "General",
                icon: <SettingsOutlined />,
                path: "/settings",
            },
            {
                label: "Security",
                icon: <SecurityOutlined />,
                path: "/settings/security",
            },
        ],
    },
];

export default function Sidebar({ onNavigate }: SidebarProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [activePath, setActivePath] = useState("/dashboard");

    const handleNavigate = (path?: string) => {
        if (!path) return;

        setActivePath(path);
        onNavigate?.(path);
    };

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
                    onClick={() => handleNavigate(item.path)}
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
            rootStyles={{
                height: "100%",
                borderRight: "1px solid #e0e0e0",
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