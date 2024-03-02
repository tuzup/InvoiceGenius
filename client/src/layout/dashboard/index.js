import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
//

import NavigationBar from './NavBar';
import { Container } from '@mui/material';
import Copyright from '../../components/copyright';



export default function DashboardLayout() {
 
  return (
    <>
      <NavigationBar/>
      <Container sx={{ paddingTop: 4, paddingBottom: 4, width: '100%' }}>
        <Outlet />
      </Container>
      <Copyright/>
    </>
  );
}

