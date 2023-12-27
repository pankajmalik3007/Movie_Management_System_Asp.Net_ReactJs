import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ onMenuIconClick }) => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton color="inherit" onClick={onMenuIconClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Movie Katta
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
