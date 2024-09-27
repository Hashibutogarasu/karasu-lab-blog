"use client";

import { Skeleton } from "@mui/material";
import React from "react";

export default function LoadingSkeleton({ children, width, height }: { children: React.ReactNode, width?: number, height?: number }) {
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    //get max width and height from children
    return loading ? <Skeleton variant="rectangular"
        width={width}
        height={height}
    >{children}</Skeleton> : <>{children}</>;
}

