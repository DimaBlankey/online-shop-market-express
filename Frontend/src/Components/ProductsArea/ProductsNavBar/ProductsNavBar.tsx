import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['All Products', 'Fresh Produce', 'Pantry Staples', 'Dairy & Refrigerated', 'Frozen Foods', 'Snacks & Beverages'];

interface ResponsiveAppBarProps {
  onCategoryClick: (category: string) => void;
}

function ResponsiveAppBar({ onCategoryClick }: ResponsiveAppBarProps): JSX.Element {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All Products');

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCategoryClick = (category: string) => {
    handleCloseNavMenu();
    setSelectedCategory(category);
    onCategoryClick(category);
  };

  return (
    <div className="ResponsiveAppBar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                               {pages.map((page) => (
                  <MenuItem key={page} onClick={() => handleCategoryClick(page)}>
                    <Typography textAlign="center" fontWeight={page === selectedCategory ? 'bold' : 'normal'}>
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handleCategoryClick(page)}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontWeight: page === selectedCategory ? 'bold' : 'normal',
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default ResponsiveAppBar;

