import React, { useState } from 'react';
import { Container, TextField, Button,Grid} from '@mui/material';
import videoBackground from './assets/common_background.mp4';

const WaterQualityIndexCalculator = () => {
  const [temperature, setTemperature] = useState('');
  const [bod, setBod] = useState('');
  const [tss, setTss] = useState('');
  const [dissolvedOxygen, setDissolvedOxygen] = useState('');
  const [conductivity, setConductivity] = useState('');
  const [waterQualityIndex, setWaterQualityIndex] = useState(null);

  const calculateWaterQualityIndex = () => {
    const ITEMP = 1 - (Math.min(temperature - 20, 0) / 10);
    const IBOD = bod <= 12 ? (30 - bod) / 12 : 0;
    const ITSS = tss <= 250 ? (25 - (tss / 10)) : 0;
    const IDO = dissolvedOxygen > 10 ? 25 : 0;
    const ICOND = conductivity <= 4000 ? (20 - (conductivity / 200)) : 0;

    const isqa = ITEMP * (IBOD + ITSS + IDO + ICOND);
    setWaterQualityIndex(isqa.toFixed(2));
  };

  return (
    <>
     <style>
        {`
          .MuiOutlinedInput-notchedOutline {
            border-color: white !important;
          }

          .MuiInputLabel-root {
            color: #AAA6C3 !important;
          }

          .MuiInputBase-input {
            color: white !important;
          }
        `}
      </style>
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
    <div>
    <Grid item xs={12} style={{ textAlign: 'center' }}>
                <h1 style={{ color:'white',fontSize:'30px'}}>Water Quality Index Calculator</h1>
              </Grid>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={12}>
            <TextField
                  label="Temperature (°C)"
                  type="number"
                  fullWidth
                  value={temperature} onChange={(e) => setTemperature(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  label="Biological Oxygen Demand (BOD) (mg/L)"
                  type="number"
                  value={bod} onChange={(e) => setBod(e.target.value)} 
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  label="Total Suspended Solids (TSS) (mg/L)"
                  type="number"
                  value={tss} onChange={(e) => setTss(e.target.value)}
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  label="Dissolved Oxygen (DO) (mg/L)"
                  type="number"
                  value={dissolvedOxygen} onChange={(e) => setDissolvedOxygen(e.target.value)}
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  label="Conductivity (μS/cm)"
                  type="number"
                  value={conductivity} onChange={(e) => setConductivity(e.target.value)}
                  fullWidth
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button type="button" variant="contained" onClick={calculateWaterQualityIndex} style={{ backgroundColor: '#050816', fontSize: '20px', border: '2px solid green', color: 'white' }}>
                Calculate
                </Button>
              </Grid>
              </Grid>
      {/* <Button variant="contained" onClick={calculateWaterQualityIndex}>Calculate</Button> */}
      {waterQualityIndex && (
        <Grid item xs={12} style={{ textAlign: 'center' }}>
        <h1 style={{ color:'white',fontSize:'30px'}}>Water Quality Index (ISQA): {waterQualityIndex} </h1>
      </Grid>
        // <div>
        //   <h2>Water Quality Index (ISQA): {waterQualityIndex}</h2>
        // </div>
      )}
    </div>
    </Container>
    </>
  );
};

export default WaterQualityIndexCalculator;