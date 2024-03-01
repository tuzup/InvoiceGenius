import React, { useState } from 'react';
import NavigationBar from './NavBar';
import MultiPageForm from '../Form';
import { Box, Container, Paper, Typography } from '@mui/material';


export default function DashboardLayout({title}) {

  return (
    <>
      <NavigationBar/>
      <Container  sx={{ paddingTop: 4, paddingBottom: 4, width: '100%'}}>
        <MultiPageForm title="Quote Generator"/>
      </Container>
    </>
  );
}
