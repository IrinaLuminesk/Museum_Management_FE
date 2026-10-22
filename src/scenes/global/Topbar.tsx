
import { AppBar, Toolbar, Typography, Avatar, Box } from "@mui/material";

interface TopbarProps {
    websiteName?: string;
    userName?: string;
    avatarUrl?: string;
}

export default function Topbar({
    websiteName = "My Website",
    userName = "John Doe",
    avatarUrl,
}: TopbarProps) {
    return (
        <AppBar
            position="static"
            color="inherit"
            elevation={1}
            sx={{
                bgcolor: "background.paper",
            }}
        >
            <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
                {/* Website name - top left */}
                <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
                    {websiteName}
                </Typography>

                {/* User avatar and name - top right */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                        src={avatarUrl}
                        alt={userName}
                        sx={{ width: 36, height: 36 }}
                    >
                        {userName.charAt(0).toUpperCase()}
                    </Avatar>

                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {userName}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
