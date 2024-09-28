import { Box, Typography } from "@mui/material";

export default function ContactPage() {
    return <Box sx={{ display: "block", justifyContent: "left", alignItems: "top", height: "100vh" }}>
        <Typography variant="h3">Contact</Typography>
        <Typography variant="h4">Contact us at</Typography>
        <a href="mailto:karasu@karasu256.com">karasu@karasu256.com</a>
    </Box>
}