import { Box, Button, Container, Typography, Stack } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";


export default function RouteError() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    gap: 3,
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: 100, sm: 140 },
                        fontWeight: 800,
                        lineHeight: 1,
                        color: "primary.main",
                        opacity: 0.15,
                    }}
                >
                    404
                </Typography>

                <Box sx={{ position: "relative" }}>
                    <Typography variant="h4" sx={{fontWeight: 700}} gutterBottom>
                        Page not found
                    </Typography>

                    {/* <Typography color="text.secondary" sx={{ mb: 4 }}>
                        Page not found
                    </Typography> */}
                </Box>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    sx={{ width: { xs: "100%", sm: "auto" } }}
                >
                    <Button
                        variant="contained"
                        startIcon={<HomeRoundedIcon />}
                        onClick={() => navigate("/")}
                        size="large"
                    >
                        Back to Home
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<ArrowBackRoundedIcon />}
                        onClick={() => navigate(-1)}
                        size="large"
                    >
                        Go Back
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
