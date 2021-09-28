import React, { useState, useEffect } from "react"
import { TextField, Grid, Button, InputLabel, FormControl, Select, MenuItem, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData, postData, postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import {  isEmpty,isDigits } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20
    },
    subdiv: {
      width: 600,
      background: '#f1f2f6',
      marginTop: 5,
      padding: 15, height: "auto", borderRadius: 5
    },
    input: {
      display: 'none',
    }
  
  }))

  export default function AddFinalProduct(props){

    AddFinalProduct.modules = {
      toolbar: [
        [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{'list': 'ordered'}, {'list': 'bullet'}, 
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        ['clean']
      ],
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    }
    /* 
     * Quill editor formats
     * See https://quilljs.com/docs/formats/
     */
    AddFinalProduct.formats = [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
  
      // const [productId, setProductId]= useState("");
      const [listProduct, setListProduct]= useState([]);
      const [listColor, setListColor]= useState([]);
      const [finalProductName, setFinalProductName]= useState("");
      const [size, setSize]= useState("");
      const [color, setColor]= useState("");
      const [price, setPrice]= useState("");
      const [offerType, setOfferType]= useState("");
      const [offerPrice, setOfferPrice]= useState("");
      const [description, setDescription]= useState("");
      const [stock, setStock]= useState("");
      const [productId, setProductId]= useState("");
      const [colorId, setColorId]= useState("");
      const [picture, setPicture] = useState({ filename: '', bytes: '' })

      const handlePicture = (event) => {
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      }

      const fetchAllProduct = async () => {
        var list = await getData('product/fetchallproducts')
        
        setListProduct(list.data)
      }

      const fetchAllColor = async () => {
        var list = await getData('color/fetchallcolor')
        setListColor(list.data)
      }

      

      

      useEffect(function () {
        fetchAllProduct()
        fetchAllColor()
      }, [])
    
      const fillProduct = () => {
        return listProduct.map((item) => {
          // alert(item.productid)
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
      }

      const fillColor = () => {
        return listColor.map((item) => {
          // alert(item.colorid)
          return <MenuItem value={item.colorid}>{item.colorname}</MenuItem>
        })
      }

    
      const toastMessage = (message) => {
        toast.info(`👻 ${message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
        });
      }
      
      const handleSubmit = async () => {
var body= {productid:productId, colorid:colorId, size:size}
var status = await postData('finalproduct/checkfinalproduct',body)
if(status)
{
        var err = false
        if (isEmpty(finalProductName)) {
          err = true;
          toastMessage("Please Enter The Product Name!")
        }
        if (isEmpty(size)) {
          err = true;
          toastMessage("Please select the size! ")
        }
        if (isEmpty(color)) {
          err = true;
            toastMessage("Please select the Color!")
        }
        if (isEmpty(price)) {
            err = true;
            toastMessage("Price should not be blank!")
          } else {
            if (!isDigits(price)) {
              err = true;
              toastMessage("Price must be a numeric value!")
            }
          }
          if (isEmpty(offerPrice)) {
            err = true;
            toastMessage("Offer Price should not be blank!")
          } else {
            if (!isDigits(offerPrice)) {
              err = true;
              toastMessage("Offer Price must be a numeric value!")
            }
          }
          if (isEmpty(stock)) {
            err = true;
            toastMessage("Stock should not be blank!")
          } else {
            if (!isDigits(stock)) {
              err = true;
              toastMessage("Stock must be a numeric value!")
            }
          }
        if (isEmpty(offerType)) {
          err = true;
          toastMessage("Please select the Offer-Type!")
        }
        if (isEmpty(picture.filename)) {
          err = true;
          toastMessage("Please Upload an image!")
        }
        if (!err) {
          var formData = new FormData()
          formData.append("finalproductname", finalProductName)
          formData.append("size", size)
          formData.append("color", color)
          formData.append("price", price)
          formData.append("offertype", offerType)
          formData.append("offerprice", offerPrice)
          formData.append("description", description)
          formData.append("stock", stock)
          formData.append("picture", picture.bytes)
          var config = { headers: { "Content-Type": "multipart/form-data" } }
          var result = await postDataAndImage('finalproduct/insertfinalproduct', formData, config)
    
          if (result) {
            Swal.fire({
              imageWidth: 200,
              imageUrl: '/glasscart.png',
              title: 'GlassKart.com',
              text: 'Final Product Submitted Successfully'
            })
            setFinalProductName('');
            setSize('');
            setColor('');
            setPrice('');
            setOfferType('');
            setOfferPrice('');
            setStock('');
            setDescription('');
            setPicture({filename:'' ,bytes:''})
          }
          else {
            Swal.fire({
              imageWidth: 200,
              imageUrl: '/glasscart.png',
              title: 'GlassKart.com',
              text: 'Fail to submit final product'
            })
          }
        }
      }
      else{
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Product Already Exists...'
        })
      }
    }

    const classes = useStyles();
    return (

        <div className={classes.root}>
      <div className={classes.subdiv}>
        <div style={{ width: 480 }}>
          <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
            <span><img src="/glasscart.png" width="40" /></span><span>Add Final Products</span>
          </div>

        </div>
        <br></br>

        <Grid container spacing={1}>

        

          <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo1-simple-select-outlined-label">Final Product Name</InputLabel>
        <Select
          labelId="demo1-simple-select-outlined-label"
          id="demo1-simple-select-outlined"
          value={finalProductName}
          onChange={(event) => setFinalProductName(event.target.value)}
          label="Final Product Name"
        >
          {fillProduct()}
        </Select>
      </FormControl>
          </Grid>

          <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo2-simple-select-outlined-label">Select Size</InputLabel>
        <Select
          labelId="demo2-simple-select-outlined-label"
          id="demo2-simple-select-outlined"
         value={size}
         onChange={(event) => setSize(event.target.value)}
          label="Select Size"
        >
          <MenuItem value='Small'>Small</MenuItem>
          <MenuItem value='Medium'>Medium</MenuItem>
          <MenuItem value='Large'>Large</MenuItem>
        </Select>
      </FormControl>
          </Grid>

          
          <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo3-simple-select-outlined-label">Select Color</InputLabel>
        <Select
          labelId="demo3-simple-select-outlined-label"
          id="demo3-simple-select-outlined"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          label="Select Color"
        >
          {fillColor()}
        </Select>
      </FormControl>
          </Grid>

          
          <Grid item xs={6}>
            <TextField variant="outlined" label="Price" fullWidth 
            value={price}
          
              onChange={(event) => setPrice(event.target.value)} 
            />
          </Grid>

          <Grid item xs={6}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo4-simple-select-outlined-label">Select Offer Type</InputLabel>
        <Select
          labelId="demo4-simple-select-outlined-label"
          id="demo4-simple-select-outlined"
         value={offerType}
         onChange={(event) => setOfferType(event.target.value)}
          label="Select Offer Type"
        >
          <MenuItem value='Festive Dhamaka'>Festive Dhamaka</MenuItem>
          <MenuItem value='Weekly Sale'>Weekly Sale</MenuItem>
          <MenuItem value='New Year Scheme'>New Year Scheme</MenuItem>
          <MenuItem value='Summer Bumper'>Summer Bumper</MenuItem>
          <MenuItem value='Winter Season'>Winter Season</MenuItem>
          <MenuItem value='None of These'>None of These</MenuItem>
        </Select>
      </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField variant="outlined" label="Offer Price" fullWidth 
            value={offerPrice}
          
              onChange={(event) => setOfferPrice(event.target.value)} 
            />
          </Grid>


         

          <Grid item xs={12}>
          <ReactQuill value={description} 
            modules={AddFinalProduct.modules}
            formats={AddFinalProduct.formats}
          onChange={(txt) => setDescription(txt)}/>
          </Grid>
          
          <Grid item xs={12}>
            <TextField variant="outlined" label="Stock" fullWidth  
            value={stock}
          
              onChange={(event) => setStock(event.target.value)} 
            />
          </Grid>

          <Grid item xs={6} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={(event) => handlePicture(event)}
            />
            <label htmlFor="contained-button-file">
              <Button style={{ background: "#22a6b3" }} variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </Grid>
          <Grid item xs={6} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
            <Avatar alt="Remy Sharp" src={picture.filename}  variant="rounded" style={{ width: 50, height: 50 }} />
          </Grid>

          <Grid item sm={12}>
            <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Submit Final Product</Button>
          </Grid>



            </Grid>

        </div>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
        </div>
    
    )
  }