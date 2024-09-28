"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Post } from '@prisma/client';
import { useSocialUsersById } from '@/hooks/useSocialUser';
import { useUserPosts } from '@/hooks/useUserPosts';
import { UserIcon } from './UserIcon';
import { CamelToSnake } from 'snake-camel-types';
import { useRouter } from 'next/navigation';

const StyledTypography = styled(Typography)({
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({ theme }) => ({
    position: 'relative',
    textDecoration: 'none',
    '&:hover': { cursor: 'pointer' },
    '& .arrow': {
        visibility: 'hidden',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
    },
    '&:hover .arrow': {
        visibility: 'visible',
        opacity: 0.7,
    },
    '&:focus-visible': {
        outline: '3px solid',
        outlineColor: 'hsla(210, 98%, 48%, 0.5)',
        outlineOffset: '3px',
        borderRadius: '8px',
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: '1px',
        bottom: 0,
        left: 0,
        backgroundColor: theme.palette.text.primary,
        opacity: 0.3,
        transition: 'width 0.3s ease, opacity 0.3s ease',
    },
    '&:hover::before': {
        width: '100%',
    },
}));


export function PostList() {
    const router = useRouter();
    const posts = useUserPosts();
    const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
        null,
    );

    const handleClick = (index: number) => {
        const id = posts[index].path;
        router.push(`/blog/view/${id}`);
    }

    const handleFocus = (index: number) => {
        setFocusedCardIndex(index);
    };

    const handleBlur = () => {
        setFocusedCardIndex(null);
    };

    return (
        <div>
            <Typography variant="h3" gutterBottom>
                Blog
            </Typography>
            <Grid container spacing={8} columns={12} sx={{ my: 4 }}>
                {posts.filter((e)=>e.state == "published").map((article, index) => {
                    return (
                        <Grid key={index} size={{ xs: 12, sm: 6 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: 1,
                                    height: '100%',
                                }}
                            >
                                {
                                    article.tags != null ? article.tags.map((tag, index) => {
                                        return (
                                            <Typography key={index} variant="body2" color="text.secondary" gutterBottom>
                                                {tag}
                                            </Typography>
                                        )
                                    }) : null
                                }
                                <TitleTypography
                                    gutterBottom
                                    variant="h6"
                                    onFocus={() => handleFocus(index)}
                                    onClick={() => handleClick(index)}
                                    onBlur={handleBlur}
                                    tabIndex={0}
                                    className={focusedCardIndex === index ? 'Mui-focused' : ''}
                                >
                                    {article.title}
                                    <NavigateNextRoundedIcon
                                        className="arrow"
                                        sx={{ fontSize: '1rem' }}
                                    />
                                </TitleTypography>
                                <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                                    {article.content}
                                </StyledTypography>
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {article.created_at.toString()}
                                </Typography>
                                <UserIcon user_id={article.user_id} />
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10} />
            </Box>
        </div>
    );
}
