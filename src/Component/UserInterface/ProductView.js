import React, { useState, useEffect, createRef } from "react";
import { Button, Grid } from "@material-ui/core";
import Footer from "./Footer";
import Header from "./Header";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Radio } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core";
import StarIcon from '@material-ui/icons/Star';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { postData, ServerURL } from "../FetchNodeServices";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import ShopCart from "./ShopCart";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "100%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));



export default function ProductView(props) {
  var cart = useSelector(state => state.cart)
  var product = props.location.state.itemProps
  var item = props.location.state.item
  var picSlider = createRef()
  var picBigSlider = createRef()
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  var bigSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };
  var dispatch = useDispatch()
  const classes = useStyles();
  const [productPicture, setProductPicture] = useState([])
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);
  const [expanded3, setExpanded3] = React.useState(false);
  const [selected, setSelected] = useState(props.location.state.selected)
  const [refresh, setRefresh] = useState(false)

  const [picSelected, setPicSelected] = useState("");

  const showProductPicture = () => {

    return productPicture.map((picture, index) => {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <div
            onClick={() => clickThumbNails(picture, index)}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              border:
                picture.pictureid == picSelected
                  ? "1px solid #000"
                  : "1px solid #dcdde1",
              width: 65,
              height: 65,
              cursor: 'pointer',
              borderRadius: 5,


            }}>

            <img
              src={`${ServerURL}/images/${picture.image}`}
              width={55}

            />

          </div>


        </div>

      )
    }
    )

  }


  const showBigProductPicture = () => {

    return productPicture.map((picture) => {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

        }}>
          <div

            style={{
              display: 'flex',


              margin: 1,

            }}>

            <img
              src={`${ServerURL}/images/${picture.image}`}
              width="100%"
              height="90%"

            />

          </div>


        </div>

      )
    }
    )

  }

  const clickThumbNails = (item, index) => {
    setPicSelected(item.pictureid);
    picSlider.current.slickNext()
    picBigSlider.current.slickGoTo(index)
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    setExpanded2(false);
    setExpanded3(false);
  };
  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
    setExpanded(false);
    setExpanded3(false);
  };
  const handleChange3 = (panel) => (event, isExpanded) => {
    setExpanded3(isExpanded ? panel : false);
    setExpanded(false);
    setExpanded2(false);
  };

  const handleQtyClick = (value) => {
    var data = { ...product, ...selected, qty: value }
    //alert(JSON.stringify(data)) 
    if (value == 0) { dispatch({ type: "REMOVE_CART", payload: [selected.finalproductid] }) }
    else {
      dispatch({ type: "ADD_CART", payload: [selected.finalproductid, data] })
    }
    setRefresh(!refresh)




  }

  const fetchAllProductPictures = async () => {
    var body = { "finalproductid": selected.finalproductid }
    var result = await postData("finalproduct/getallproductpicture", body)
    setProductPicture(result.data)
  }

  useEffect(function () {
    fetchAllProductPictures()
  }, [selected.finalproductid])

  const ourLenses = () => {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}> Our Lenses</h1>
        <div style={{ paddingLeft: 100, paddingRight: 100, margin: 10 }}>
          <Accordion
            style={
              expanded
                ? {
                  border: "2px solid #404040",
                  borderRadius: 10,
                  backgroundColor: "#50526e",
                  color: "#FFF",
                }
                : {
                  border: "2px solid #404040",
                  borderRadius: 10,
                  backgroundColor: "#FFF",
                }
            }
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={expanded ? { color: "#fff" } : {}} />
              }
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>
                <span style={{ fontSize: 20 }}> Single Vision</span>
                <p>
                  These lenses correct a single field of vision - near,
                  intermediate, or distance
                </p>
              </Typography>
            </AccordionSummary>

            {/* <AccordionDetails></AccordionDetails> */}
          </Accordion>
          {expanded ? (
            <Grid
              container
              spacing={1}
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Premium Anti-Glare Glasses</h2>
                <p>Anti-Glare Coating On Both Sides</p>
                <p>Lightweight & Durable</p>
                <p>6 Months Warranty</p>
                <p>Crack Resistant</p>
                {/* <p style={{marginTop:220}}>&#8377; 0</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 0
                </p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                  // position:'fixe'
                }}
              >
                <h2>BLU Essential Lenses</h2>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Crack Resistant</p>
                <p>Anti-Glare Coating On Both Sides</p>
                <p>100% UV Protection</p>
                <p>12 Months Warranty</p>
                {/* <p style={{marginTop:170}}>&#8377; 1000</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0 }}>&#8377; 1000</p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>BLU Thin Lenses</h2>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Thinner, Ultra-Lightweight Lenses</p>
                <p>Double Side Anti-Glare</p>
                <p>Crack Resistant & Durable</p>
                <p>Dust & Water Repellent</p>
                <p>100% UV Protection</p>
                <p>Index Varies From 1.6 - 1.74</p>
                <p>12 Months Warranty</p>
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 2000
                </p>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </div>
        <div style={{ paddingLeft: 100, paddingRight: 100, margin: 10 }}>
          <Accordion
            style={
              expanded2
                ? {
                  border: "2px solid #404040",
                  backgroundColor: "#50526e",
                  color: "#FFF",
                  borderRadius: 10,
                }
                : {
                  border: "2px solid #404040",
                  borderRadius: 10,
                  backgroundColor: "#FFF",
                }
            }
            expanded={expanded2 === "panel2"}
            onChange={handleChange2("panel2")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={expanded2 ? { color: "#fff" } : {}} />
              }
              aria-controls="panel1bh-content2"
              id="panel1bh-header2"
            >
              <Typography className={classes.heading}>
                <span style={{ fontSize: 20 }}> Multifocal</span>
                <p>
                  These lenses correct near, intermediate and distant fields of
                  vision, eliminating the need to switch eyeglasses
                </p>
              </Typography>
            </AccordionSummary>
            {/* <AccordionDetails></AccordionDetails> */}
          </Accordion>
          {expanded2 ? (
            <Grid
              container
              spacing={1}
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Bifocal Lenses</h2>
                <p>Circular Reading Area In Lower Part</p>
                <p>Anti-Glare Lens</p>
                <p>Crack Resistant</p>
                <p>Water And Dust Repellent</p>
                <p>UV 400 Protection</p>
                {/* <p style={{marginTop:220}}>&#8377; 0</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 2500
                </p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                  // position:'fixe'
                }}
              >
                <h2>Normal Corridor Progressive Lenses</h2>
                <p>Near To Far Progression</p>
                <p>Crack Resistant</p>
                <p>Anti-Glare Lens</p>
                {/* <p style={{marginTop:170}}>&#8377; 1000</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0 }}>&#8377;3500</p>
              </Grid>
              <Grid
                item
                xs={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Wide Corridor Progressive Lenses</h2>
                <p>Near To Far Progression</p>
                <p>Anti-Glare Lens</p>
                <p>Double Side Anti-Glare</p>
                <p>Thinnest Lens As Per Your Power</p>
                <p>Crack Resistant</p>
                <p>Water And Dust Repellent</p>
                <p>UV 400 Protection</p>
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 8000
                </p>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </div>
        <div style={{ paddingLeft: 100, paddingRight: 100, margin: 10 }}>
          <Accordion
            style={
              expanded3
                ? {
                  border: "2px solid #404040",
                  backgroundColor: "#50526e",
                  borderRadius: 10,
                  color: "#FFF",
                }
                : {
                  border: "2px solid #404040",
                  borderRadius: 10,
                  backgroundColor: "#FFF",
                }
            }
            expanded={expanded3 === "panel3"}
            onChange={handleChange3("panel3")}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon style={expanded3 ? { color: "#fff" } : {}} />
              }
              aria-controls="panel1bh-content3"
              id="panel1bh-header3"
            >
              <Typography className={classes.heading}>
                <span style={{ fontSize: 20 }}> Zero Power</span>
                <p>
                  These protect your eyes from harmful blue light emitted by
                  digital screens and keep the glare off in style
                </p>
              </Typography>
            </AccordionSummary>
            {/* <AccordionDetails></AccordionDetails> */}
          </Accordion>
          {expanded3 ? (
            <Grid
              container
              spacing={1}
              style={{
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                }}
              >
                <h2>Zero Power BLU Anti-Fog Lenses</h2>
                <p>Anti-fog Coating On Both Sides</p>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Mist & Moisture Repellant</p>
                <p>Crack Resistant</p>
                <p>Zero-Power Lenses</p>
                {/* <p style={{marginTop:220}}>&#8377; 0</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0, top: 0 }}>
                  &#8377; 500
                </p>
              </Grid>
              <Grid
                item
                xs={6}
                style={{
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: "center",
                  lineHeight: 0.5,
                  border: "1px solid black",
                  borderRadius: 10,
                  flexDirection: "column",
                  // position:'fixe'
                }}
              >
                <h2>Zero Power BLU Anti-Glare Lenses</h2>
                <p>Block Harmful Blue Light From Digital Screens</p>
                <p>Crack Resistant</p>
                <p>Lightweight & Durable</p>
                <p>Anti-Glare Coating On Both Sides</p>
                <p>Zero-Power Lenses</p>
                {/* <p style={{marginTop:170}}>&#8377; 1000</p> */}
                <hr width="20%"></hr>
                <p style={{ position: "relative", bottom: 0 }}>&#8377; 0</p>
              </Grid>
            </Grid>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  };

  const myhandleChange = (item) => {
    var { finalproductid, colorid, colorname, price, offerprice, picture, stock } = item
    setSelected({ finalproductid, colorid, colorname, price, offerprice, picture, stock })
  }


  return (
    <div>
      <Header history={props.history} />
      <div style={{ paddingTop: 40, paddingLeft: 40 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" >
            HOME
          </Link>
          <Link color="inherit" href="/" >
            GLASSKART
          </Link>
          <Typography color="textPrimary">{product.productname}</Typography>
        </Breadcrumbs></div>
      <div>
        <Grid container spacing={1} style={{ padding: 20 }}>
          {/* <p style={{ textAlign: "center" }}>Product View</p> */}
          <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ArrowBackIos onClick={() => picBigSlider.current.slickPrev()} />
            <Slider {...bigSettings} ref={picBigSlider} style={{ width: "95%" }}>
              {showBigProductPicture()}
            </Slider>
            <ArrowForwardIos onClick={() => picBigSlider.current.slickNext()} />
          </Grid>
          <Grid item xs={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div>
              <p style={{ fontSize: 20, color: '#404040', }}>{product.productname}</p>
              <Grid container spacing={1}>
                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row' }}>


                  <div style={{ display: 'flex', justifyContent: 'center', fontSize: 20, flexDirection: 'column' }}>
                    {selected.colorname}
                    <div >

                      {item.details.map((finalitem) => {
                        return (
                          <Radio
                            key={finalitem.finalproductid}
                            checked={selected.finalproductid === finalitem.finalproductid}
                            onChange={() => myhandleChange(finalitem)}
                            //value="a"
                            name="radio-button-demo"
                            style={{ color: finalitem.colorname }}
                          //inputProps={{ 'aria-label': 'A' }}
                          />

                        )

                      })}

                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div >
                    <div style={{ fontSize: 20, color: '#404040' }}>{selected.offerprice > 0 ? <span><s>&#8377; {selected.price}</s> <span style={{ color: '#0984e3' }}> {selected.offerprice}</span></span> : <span>&#8377; {selected.price}</span>}</div>

                    <div style={{ fontSize: 18, color: '#404040' }}> including premium  </div>
                    <div style={{ fontSize: 18, color: '#404040' }}> anti-glare lenses </div>
                  </div>
                </Grid>
              </Grid>
              <br />

              <div
                style={{
                  paddingTop: 30,
                  paddingBottom: 50,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ width: 350 }}>
                  <Slider {...settings} ref={picSlider}>

                    {showProductPicture()}

                  </Slider>
                </div>
              </div>
              <div style={{ listStyle: "none", flexDirection: 'column', display: 'flex', justifyContent: 'center' }}>
                <div style={{ padding: 10, letterSpacing: 1, fontSize: 14, fontWeight: 700 }}>{selected.stock == 0 ? <span style={{ color: 'red' }}>Out of Stock</span> : selected.stock >= 1 && selected.stock <= 3 ? <span style={{ color: 'red' }}>Hurry Only {selected.stock} item(s) is left</span > : <span style={{ color: 'green' }}>Available</span>}</div>

                <ShopCart value={cart.hasOwnProperty(selected.finalproductid) ? cart[selected.finalproductid].qty : 0} onChange={(value) => handleQtyClick(value)} />

              </div>
              <br />
              <Button style={{
                padding: 12,
                border: '1px solid #50526e',
                background: '#fff',
                textAlign: 'center',
                fontSize: 18, letterSpacing: 1,
                borderRadius: 0, fontFamily: 'Helvetica,sans-serif',
                width: 300
              }}><img src='whatsapp.png' width='25' />Let's Chat</Button>
            </div>
          </Grid>
        </Grid>
      </div>
      <div style={{ paddingLeft: 40 }}>
        <div style={{
          border: '1px solid #000',
          display: 'flex',
          padding: '6px 10px',
          borderRadius: 40,
          pointerEvents: 'none',
          width: '5%',
          left: 10
        }}>
          <li style={{ listStyle: 'none' }}>
            4.5
          </li>
          <li style={{ listStyle: 'none' }} >
            <StarIcon />
          </li>
          <li style={{ listStyle: 'none' }}>
            | 95
          </li>
        </div></div>
      <span style={{
        width: '25px',
        height: '25px',
        backgroundSize: '100%'
      }}>
        <FavoriteBorderIcon />
      </span>
      <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 0, paddingBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={'Delivery.jpg'} width='100%' /><br />

      </div>

      <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <img src={'FaceAnalysis.jpg'} width='100%' />
      </div>

      <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif', lineHeight: 1.5, letterSpacing: 0.5 }}>
        <h1>Key Features</h1>
      </div>

      <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <img src={'Key-Features_Titanium_Flex1.jpg'} width='100%' />
        <img src={'Key-Features_Titanium_Flex2.jpg'} width='100%' />
      </div>
      <div style={{ paddingLeft: 40, paddingRight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <img src={'Key-Features_Titanium_Flex3.jpg'} width='100%' />
        <img src={'Key-Features_Titanium_Flex4.jpg'} width='100%' />
      </div>
      <div style={{ paddingLeft: 40, paddingRight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <img src={'Key-Features_Titanium_Flex5.jpg'} width='100%' />
        <img src={'titanium_flex_thum_v2.jpg'} width='50%' />
      </div>

      {ourLenses()}


      <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <img src={'whydesktop.jpg'} width='100%' />
      </div>
      <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif', lineHeight: 1.5, letterSpacing: 0.5 }}>
        <h1>Frame Size</h1>
      </div>
      <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <img src={'KeyFeatures1.png'} width='100%' />
      </div>
      <div style={{ paddingLeft: 40, paddingRight: 40, paddingTop: 40, paddingBottom: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        <img src={'KeyFeatures2.png'} width='100%' />
      </div>

      <div style={{ textAlign: 'center', fontFamily: 'ubuntu, sans-serif', lineHeight: 1.5, letterSpacing: 0.5 }}>
        <h1>Similar Styles</h1>
      </div>

      <Footer />
    </div >
  )
}