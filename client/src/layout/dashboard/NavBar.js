import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Divider,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { navbarConfig } from '../../config';

export default function NavigationBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: navbarConfig.backgroundColor, color: navbarConfig.textColor, paddingY: 2 }}>
        <Container>
          <Toolbar>
            {/* Menu Icon for Smaller Screens */}
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ marginRight: 2, display: { xs: 'block', sm: 'none' } }} onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

            {/* Company Name */}
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              InvoiceGenius
            </Typography>

            {/* Navigation Links - Display on Desktop */}
            <Button color="inherit" href="#home" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Home
            </Button>
            <Button color="inherit" href="#about" sx={{ display: { xs: 'none', sm: 'block' } }}>
              About
            </Button>
            <Button color="inherit" href="#contact" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Contact Us
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width:  250 }}>
        <List>
            <ListItemButton>
            <ListItemIcon>
                <InboxIcon/>
            </ListItemIcon>
            <ListItemText>
                Mail
            </ListItemText>
            </ListItemButton>
        </List>
        </Box>
      </Drawer>
    </>
  );
}
