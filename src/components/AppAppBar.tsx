"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { SiteLogo } from './SiteLogo';
import { StyledButton, StyledLink, StyledToolbar } from './StyledComponents';
import { useSession } from 'next-auth/react';
import { AppIconButton } from './AppIconButton';
import LoadingSkeleton from './Skeleton';
import { AccountMenu } from './AccountMenu';

export default function AppAppBar() {
  const session = useSession();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 10 }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <SiteLogo />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <StyledButton variant="text" size="small">
                Mods
              </StyledButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >

            <LoadingSkeleton width={40} height={40}>
              {
                session.data?.user ? (
                  <>
                    <AccountMenu />
                  </>
                ) : <>
                  <StyledButton variant="outlined" size="large" href="/login">
                    Log in or Sign up
                  </StyledButton>
                </>
              }
            </LoadingSkeleton>
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <LoadingSkeleton>
                  {
                    !session.data?.user ? <>
                      <MenuItem>
                        <StyledButton variant="outlined" size="large" href="/login">
                          Log in or Sign up
                        </StyledButton>
                      </MenuItem>
                    </> : <MenuItem>
                      <StyledButton color="primary" variant="outlined" fullWidth href="/settings/profile">
                        Profile
                      </StyledButton>
                    </MenuItem>
                  }
                </LoadingSkeleton>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
