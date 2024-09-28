import { Box, Typography } from "@mui/material";

export default function NotFound() {
    return <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h1">404</Typography>
        <Typography variant="h2">Page Not Found</Typography>
    </Box>
}