"use client";

import { Box, useMediaQuery } from "@mui/material";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
    const mediaQuery = useMediaQuery("(max-width: 1023px)");
    return mediaQuery ? <div style={{ margin: "30% 10%" }}>{children}</div> : <Box sx={{ m: 25 }}>
        {children}
    </Box>;
}