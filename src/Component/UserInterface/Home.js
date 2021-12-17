import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from '@material-ui/core';
import { alpha, makeStyles } from "@material-ui/core/styles";
import { getData, ServerURL, postData } from "../FetchNodeServices";
import { Grid, Button } from "@material-ui/core";
import ProductComponent from "./ProductComponent";
export default function Home(props) {
  console.log("PROPS:", props)
  const [list, setList] = useState([]);
  const [recommendation, setRecommendation] = useState([]);

  const displayRecommendation = () => {
    return recommendation.map((item) => {
      return (
        <Grid item xs={4}>
          <ProductComponent product={item} history={props.history} />
        </Grid>
      )

    })

  }

  const fetchAllRecommendationNA = async () => {
    var body = { "status": "New Arrival" }
    var result = await postData("product/fetchourrecommendation", body);
    setRecommendation(result.data)
  }

  const fetchAllRecommendationBS = async () => {
    var body = { "status": "Best Sellers" }
    var result = await postData("product/fetchourrecommendation", body);
    setRecommendation(result.data)
  }

  const fetchAllMainPictures = async () => {
    var result = await getData("mainpage/fetchallmainpage");
    setList(result.data);
  };

  const DisplayMainPageImages = () => {
    return list.map((item) => {
      return (<div>
        {item.position == 1 ?

          <div ><img src={`${ServerURL}/images/${item.picture}`} width="100%" />
            <div style={{ position: 'absolute', top: '35%', left: '60%' }}>  <h1 style={{
              letterSpacing: 0.5,

              color: '#50526e',
              fontWeight: 400, fontFamily: 'ubuntu, sans-serif', textAlign: 'center'
            }}>Stylish Eyewear That<div> Is Premium, Not Expensive!</div></h1>
              <Button fullWidth style={{
                position: 'absolute',
                background: '#50526e',
                color: '#fff',
                padding: 10,
                textAlign: 'center',
                margin: '5px 0',
                fontFamily: 'Helvetica,sans-serif',
                fontSize: 18,
                letterSpacing: 1
              }}>Shop Eyeglasses</Button>
              <br /> <br /> <br />
              <Button fullWidth style={{
                position: 'absolute',
                background: '#50526e',
                color: '#fff',
                padding: 10,
                textAlign: 'center',
                margin: '5px 0',
                fontFamily: 'Helvetica,sans-serif',
                fontSize: 18,
                letterSpacing: 1
              }}>Shop Sunglasses</Button><br /> <br /><br />
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <a href='/' style={{
                  fontSize: 20,
                  display: 'block',
                  color: '#50526e',
                  fontWeight: 700, fontFamily: 'Helvetica, sans-serif', textDecoration: 'none'
                }}>Take our style quiz</a><span>
                  <img src='Arrow.png' /></span>
              </div>
            </div>
            <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif' }}>
              <h1>New This Week</h1>
              <p style={{
                color: '#9a9a9a', fontSize: 20,

                letterSpacing: 1, paddingLeft: 20, paddingRight: 20
              }}>
                This summer, we’re bringing back the cat-eye trend with a colourful twist! Transform your look with these trendy tinted tonics in fresh colour options!

              </p>
            </div>

          </div>
          : item.position == 3 ? <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 40 }}><img src={`${ServerURL}/images/${item.picture}`} width="100%" />
            <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif', lineHeight: 1.5, letterSpacing: 0.5 }}>
              <h1>Our Recommendations</h1>
            </div>
            <Grid container spacing={1} >

              <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }} item xs={6}>
                <Link style={{ fontSize: 25, cursor: 'pointer', color: '#50526e' }} onClick={() => fetchAllRecommendationNA()}>New Arrivals</Link>
              </Grid>
              <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }} item xs={6}>
                <Link style={{ fontSize: 25, cursor: 'pointer', color: '#50526e' }} onClick={() => fetchAllRecommendationBS()}>Best Sellers</Link>
              </Grid>


            </Grid>
            <Grid container spacing={1}>
              {displayRecommendation()}
            </Grid>
          </div>

            : item.position == 4 ? <div>


              <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 40 }}><img src={`${ServerURL}/images/${item.picture}`} width="100%" /></div>
              <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif', lineHeight: 1.5, letterSpacing: 0.5 }}>
                <h1>Your satisfaction is guaranteed with<br />
                  a 14 day return period</h1>
              </div>
              <Grid container spacing={1}>

                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} item xs={4}>
                  <img src={'IdealFit.png'} width='70%' />
                  <h2 style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif' }}>The Ideal Fit</h2>
                  <p style={{
                    color: '#9a9a9a', fontSize: 20,

                    letterSpacing: 1, paddingLeft: 20, paddingRight: 20, textAlign: 'center'
                  }}>
                    Our premium eyewear is aligned to suit your needs - be it bespoke no-slip nose pads, adjustable bridges, or sizes that are fine-tuned until they’re perfect for your face.
                  </p>

                </Grid>

                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} item xs={4}>
                  <img src={'MasterCraftsmanShip.png'} width='70%' />
                  <h2 style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif' }}>Master Craftsmanship</h2>
                  <p style={{
                    color: '#9a9a9a', fontSize: 20,

                    letterSpacing: 1, paddingLeft: 20, paddingRight: 20, textAlign: 'center'
                  }}>
                    Our frames are twice as durable thanks to handcrafted & skin-friendly materials. We constantly innovate with high-performance & eco-friendly materials, so that you wear the best!
                  </p>

                </Grid>

                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} item xs={4}>
                  <img src={'SuperiorLenscape.png'} width='70%' />
                  <h2 style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif' }}>Superior Lenscape</h2>
                  <p style={{
                    color: '#9a9a9a', fontSize: 20,

                    letterSpacing: 1, paddingLeft: 20, paddingRight: 20, textAlign: 'center'
                  }}>
                    We’ve got a lens for every need. Our range encompasses innovations like BLU digital, Anti-Fog, Progressive, Anti-Glare & many more!
                  </p>

                </Grid>

              </Grid>
              <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif', lineHeight: 1.5, letterSpacing: 0.5 }}>
                <h1>Popular Categories</h1>
              </div>
              <Grid container spacing={1} >

                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }} item xs={6}>
                  <a href='' style={{ fontSize: 25, textDecoration: 'underline', color: '#50526e' }}>Eyeglasses</a>
                </Grid>
                <Grid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'column' }} item xs={6}>
                  <a href='' style={{ fontSize: 25, textDecoration: 'underline', color: '#50526e' }}>Sunglasses</a>
                </Grid>


              </Grid>
              {/* <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif', lineHeight: 1.5, letterSpacing: 0.5 }}>
              <h1>Shop Our Collections</h1>
            </div> */}

              <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif' }}>
                <h1>Store Locator</h1>
              </div>

            </div> : item.position == 5 ?
              <div style={{
                paddingLeft: 40,
                paddingRight: 40,
              }}><img src={`${ServerURL}/images/${item.picture}`} width="100%" />
                <ul style={{
                  textAlign: 'left',
                  listStyle: 'disc',
                  color: '#9a9a9a',
                  fontSize: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}>
                  <li>
                    A superlative buying experience
                  </li>
                  <li>
                    Expert guidance of stylists to help you make the right choice
                  </li>
                </ul>
                <ul style={{
                  textAlign: 'left',
                  listStyle: 'disc',
                  color: '#9a9a9a',
                  fontSize: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}>
                  <li>
                    Free eye test and prescripton
                  </li>
                  <li style={{
                    textAlign: 'start !important',
                    textAlignLast: 'start !important'
                  }}>
                    Fully sanitized and safe shopping
                  </li>
                </ul>


                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 10 }}>
                  <Button style={{
                    background: '#50526e', color: ' #fff',
                    textAlign: 'center',
                    paddingLeft: 50,
                    paddingRight: 50,
                    paddingTop: 10,
                    paddingBottom: 10,
                    fontFamily: 'Helvetica,sans-serif',
                    fontSize: '25', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    letterSpacing: 1, borderRadius: 0
                  }}>Find us in stores</Button>
                </div>
                <h1 style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif' }}>What Makes Us Stand Apart?</h1>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src='Video.png' />
                </div>
                <h1 style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif' }}>Customers Speak</h1>
              </div>
              : <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 0, paddingBottom: 40 }}><img src={`${ServerURL}/images/${item.picture}`} width="100%" />
              </div>
        }

      </div >

      )
    })
  }





  useEffect(function () {
    fetchAllMainPictures();
    fetchAllRecommendationNA()
  }, []);

  return (
    <div>
      <Header history={props.history} />
      {DisplayMainPageImages()}
      <Footer />
    </div>
  )

}