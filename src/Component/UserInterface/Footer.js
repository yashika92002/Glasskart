import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { Link } from '@material-ui/core';
import { Divider } from '@material-ui/core';

export default function Footer() {
    return <footer style={{ paddingLeft: 40, paddingRight: 40 }}>
        <Divider />
        <div style={{ margin: 20 }}>
            <Box>
                <Container maxWidth='lg'>
                    <h4 style={{
                        display: 'block',
                        fontSize: 20,
                        color: '#4d4d4d',
                        fontFamily: 'ubuntu, sans-serif',
                        letterSpacing: 0.5,
                        margin: '0 0 17px'
                    }}>CONNECT WITH US
                    </h4>
                    <img src='Google Play.png' width='180' height='65' /> &nbsp;
                    <img src='App Store.png' width='180' height='65' />
                    <br />
                    <Grid container spacing={1} style={{ marginTop: 20 }}>
                        <Grid item xs={3} >

                            <h4 style={{
                                display: 'block'
                                , fontSize: 20,
                                color: '#4d4d4d',
                                fontFamily: 'ubuntu, sans-serif',
                                margin: '0 0 12px 0',
                                fontWeight: 400
                            }} >CONTACT</h4>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>support@glass-kart.com</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>+91 94257 98482</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>

                            <h4 style={{
                                display: 'block'
                                , fontSize: 20,
                                color: '#4d4d4d',
                                fontFamily: 'ubuntu, sans-serif',
                                margin: '0 0 12px 0',
                                fontWeight: 400
                            }} >  SHOP</h4>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Eyeglasses</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Sunglasses</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Collection</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>

                            <h4 style={{
                                display: 'block'
                                , fontSize: 20,
                                color: '#4d4d4d',
                                fontFamily: 'ubuntu, sans-serif',
                                margin: '0 0 12px 0',
                                fontWeight: 400
                            }} >  ABOUT</h4>

                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Our Story</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Careers</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Press</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Blog</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Store Locator</Link>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>

                            <h4 style={{
                                display: 'block'
                                , fontSize: 20,
                                color: '#4d4d4d',
                                fontFamily: 'ubuntu, sans-serif',
                                margin: '0 0 12px 0',
                                fontWeight: 400
                            }} >   INFORMATION</h4>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Help</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Shipping Handling</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Exchanges & Returns</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Terms & Conditions</Link>
                            </Box>
                            <Box><Link href='/' style={{ fontSize: 18, color: '#9a9a9a' }}>Privacy Policy</Link>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    </footer>
}