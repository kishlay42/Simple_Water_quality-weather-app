import React, { useState } from "react";
import Search from './components/Search/SearchWater';
import { Box, Container, Grid } from '@mui/material';
import UTCDatetime from './components/Reusable/UTCDatetime';
import Logo from './assets/logo.png';
import Drop from './assets/drop.png';
import "./style.css";
import videoBackground from './assets/water_background.mp4';

export const Water = () => {
  const [groundwater, setGroundwater] = useState(null);

  const handleOptionSelect = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    setGroundwater(selectedOption);
  };

  return (
    <>
    <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.6,
          objectFit: 'cover',
          zIndex: -1, // Set a negative z-index to ensure the video is in the background
        }}
      >
        <source src={videoBackground} type="video/mp4" />
      </video>
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '80%', md: '1100px' },
        width: '100%',
        height: '100%',
        margin: '0 auto',
        padding: '1rem 0 3rem',
        marginBottom: '1rem',
        borderRadius: {
          xs: 'none',
          sm: '0 0 1rem 1rem',
        },
        boxShadow: {
          xs: 'none',
          sm: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
        },
      }}
    >
      <Grid className="mainGrid" container columnSpacing={2}>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1rem',
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: '16px', sm: '22px', md: '20px' },
                width: 'auto',
              }}
              alt="logo"
              src={Logo}
            />
            <UTCDatetime />
          </Box>
          <Search onOptionSelect={handleOptionSelect} />
        </Grid>
        <Grid className="water-quality" item xs={12} sm={6} md={4} sx={{
          height: '100%',
          padding: '1rem 0 3rem',
          marginBottom: '1rem',
          borderRadius: '0 0 1rem 1rem',
          boxShadow: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 15,
          ml: 8,
        }}>
          <h1 style={{ fontSize: '30px', color: 'white' }}>{groundwater ? groundwater.value.gwlevel : "Loading..."}</h1>
          <h3 style={{ color: 'white' }}>Water Quality Index</h3>
        </Grid>
        <Grid className="water-quality" item xs={12} sm={6} md={4} sx={{
          height: '100%',
          padding: '1rem 0 3rem',
          marginBottom: '1rem',
          borderRadius: '0 0 1rem 1rem',
          boxShadow: 'rgba(0,0,0, 0.5) 0px 10px 15px -3px, rgba(0,0,0, 0.5) 0px 4px 6px -2px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 15,
          ml: 30,
        }}>
          <h1 style={{ fontSize: '30px', color: 'white' }}>{groundwater ? groundwater.value.gwlevel+12 : "Loading..."}</h1>
          <h3 style={{ color: 'white' }}>Ground Water Level</h3>
        </Grid>
        <Grid>
        <Box
              component="img"
              mt={10}
              ml={115}
              sx={{
                height: { xs: '16px', sm: '22px', md: '100px' },
                width: 'auto',
              }}
              alt="logo"
              src={Drop}
            />
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default Water;
