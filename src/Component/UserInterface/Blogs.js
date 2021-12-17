import React, { useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import Footer from "./Footer";
import Header from "./Header";
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { Link } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Blogs(props) {

        return (
                <div>
                        <Header history={props.history} />

                        <div style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'ubuntu, sans-serif', fontSize: 35,
                                overflowWrap: 'break-word',
                                wordWrap: 'break-word', marginTop: 40,
                                color: '#333'
                        }}>
                                GlassKart Blog - Eyewear Trends <RssFeedIcon fontSize='large' />
                        </div>
                        <Grid cotainer spacing={1} style={{ display: 'flex', flexDirection: 'row', paddingRight: 100, paddingLeft: 100, paddingTop: 20 }}>
                                <Grid item xs={4} style={{ margin: 40 }}>
                                        <div>
                                                <img style={{ marginTop: 10 }} src='pro_titanium-03_480x.png' width='100%' />
                                        </div>
                                        <p style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 25 }}>
                                                Everything You Need To Know<br />About Titanium Frames Is Here
                                        </p>
                                        <p>
                                                May 07, 2021
                                        </p>
                                        <Link href='/' style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 15, color: '#000' }}>Read More <ChevronRightIcon style={{ fontSize: 'small' }} /></Link>
                                </Grid>
                                <Grid item xs={4} style={{ margin: 40 }}>
                                        <div>
                                                <img style={{ marginTop: 10 }} src='TR_blog-03_480x.png' width='100%' />
                                        </div>
                                        <p style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 25 }}>
                                                3 Things About TR-90 Frames<br />That Will Change The Way You<br />See Eyeglasses.
                                        </p><p>
                                                April 30, 2021
                                        </p><Link href='/' style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 15, color: '#000' }}>Read More <ChevronRightIcon style={{ fontSize: 'small' }} /></Link>
                                </Grid>
                                <Grid item xs={4} style={{ margin: 40 }}>
                                        <div>
                                                <img style={{ marginTop: 10 }} src='steel_2_blog-03_480x.png' width='100%' />
                                        </div>
                                        <p style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 25 }}>
                                                Everything You Need To Know<br />About Stainless Steel Frames.
                                        </p><p>
                                                April 23, 2021
                                        </p><Link href='/' style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 15, color: '#000' }}>Read More <ChevronRightIcon style={{ fontSize: 'small' }} /></Link>
                                </Grid>
                        </Grid>
                        <Grid cotainer spacing={1} style={{ display: 'flex', flexDirection: 'row', paddingRight: 100, paddingLeft: 100, paddingTop: 0 }}>
                                <Grid item xs={4} style={{ margin: 40 }}>
                                        <div>
                                                <img style={{ marginTop: 10 }} src='acetate_blog-03_0bdd851b-2241-4aa3-af26-f9654a970f86_480x.png' width='100%' />
                                        </div>
                                        <p style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 25 }}>
                                                3 Reasons Why Acetate Frames<br />Are The Perfect Pick For You!
                                        </p><p>
                                                April 16, 2021
                                        </p><Link href='/' style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 15, color: '#000' }}>Read More <ChevronRightIcon style={{ fontSize: 'small' }} /></Link>
                                </Grid>
                                <Grid item xs={4} style={{ margin: 40 }}>
                                        <div>
                                                <img style={{ marginTop: 10 }} src='3_reasons_v1-03_480x.png' width='100%' />
                                        </div>
                                        <p style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 25 }}>
                                                3 Reasons Why Prescription<br />Sunnies Are Absolutely Worth It.
                                        </p><p>
                                                April 09, 2021
                                        </p><Link href='/' style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 15, color: '#000' }}>Read More <ChevronRightIcon style={{ fontSize: 'small' }} /></Link>
                                </Grid>
                                <Grid item xs={4} style={{ margin: 40 }}>
                                        <div>
                                                <img style={{ marginTop: 10 }} src='eyecatching_eyewear1_blog-03_480x.png' width='100%' />
                                        </div>
                                        <p style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 25 }}>
                                                Put A Spring In Your Step With<br />These Eye-Catching Eyewear<br />Trends.
                                        </p><p>
                                                April 03, 2021
                                        </p><Link href='/' style={{ fontFamily: 'ubuntu, sans-serif', fontSize: 15, color: '#000' }}>Read More <ChevronRightIcon style={{ fontSize: 'small' }} /></Link>
                                </Grid>

                        </Grid>



                        <Footer />
                </div>
        )
}