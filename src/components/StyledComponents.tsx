"use client";

import { alpha, Avatar, Button, ButtonBase, Card, styled, Toolbar } from "@mui/material";
import Link from "next/link";

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: alpha(theme.palette.background.default, 0.4),
    boxShadow: theme.shadows[1],
    padding: '8px 12px',
}));

export const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
    },
}));

export const DangerButton = styled(Button)(({ theme }) => ({
    color: theme.palette.error.main,
    '&:hover': {
        backgroundColor: alpha(theme.palette.error.main, 0.1),
    },
}));

export const StyledCard = styled(Card)({
    //centering card
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    //styling card
    width: '100%',
    padding: '1rem',
    borderRadius: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    //background
    background: 'linear-gradient(145deg, #ffffff, #f1f1f1)',
    //border
    border: '1px solid #f1f1f1',
})