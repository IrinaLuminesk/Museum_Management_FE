
import { useSyncExternalStore } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { loadingTracker } from "../../api/loadingTracker";

export default function Loading() {
    const isLoading = useSyncExternalStore(
        loadingTracker.subscribe,
        loadingTracker.getSnapshot,
        loadingTracker.getSnapshot
    );

    if (!isLoading) {
        return null;
    }

    return (
        <Box
            role="alert"
            aria-busy="true"
            aria-live="assertive"
            sx={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                bgcolor: "rgba(0, 0, 0, 0.45)",
                backdropFilter: "blur(2px)",
                pointerEvents: "all",
                cursor: "wait",
            }}
        >
            <CircularProgress
                size={56}
                thickness={4}
                sx={{ color: "#fff" }}
            />

            <Typography
                variant="body1"
                sx={{
                    color: "#fff",
                    fontWeight: 500,
                }}
            >
                Loading, please wait...
            </Typography>
        </Box>
    );
}
