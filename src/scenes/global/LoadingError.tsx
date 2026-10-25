
import {
    Box,
    Typography,
    Alert,
    Button,
} from "@mui/material";
import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

function LoadingError() {
    const error = useRouteError();
    const navigate = useNavigate();

    const message = isRouteErrorResponse(error)
        ? error.statusText || error.data?.message || `Error ${error.status}`
        : error instanceof Error
            ? error.message
            : "Something went wrong.";

    return (
        <Box
            sx={{
                maxWidth: 600,
                mx: "auto",
                mt: 8,
                p: 3,
                textAlign: "center",
            }}
        >
            <Typography variant="h4" gutterBottom>
                Oops!
            </Typography>

            <Typography variant="body1" sx={{ mb: 3 }}>
                Something went wrong while loading the page.
            </Typography>

            <Alert severity="error" sx={{ mb: 3, textAlign: "left" }}>
                {message}
            </Alert>

            <Button
                variant="contained"
                onClick={() => navigate("/")}
            >
                Go Home
            </Button>
        </Box>
    );
}

export default LoadingError;
