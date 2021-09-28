import React, { useState, useEffect } from "react"
import { Grid, Button, InputLabel, FormControl, Select, MenuItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData,postData, postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import {DropzoneArea} from 'material-ui-dropzone'

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

  export default function ProductPictures(props){

    
    const classes = useStyles() ;

    const [listProduct, setListProduct] = useState([])
    const [listProductSize, setListProductSize] = useState([])
    const [productName, setProductName] = useState("")
    const [listColor, setListColor] = useState([])
    const [colorName, setColorName] = useState("")
    const [size, setSize] = useState("")
    const [finalProductId, setFinalProductId] = useState("")
    const [listFiles, setListFiles] = useState([])

   

    const handleFiles=(files)=>{
setListFiles(files)

    }
    const handleUploadFiles = async()=>{
      // alert(colorName)
      var formData=new FormData()
      formData.append("finalproductid",colorName)
      listFiles.map((item,index)=>{
        formData.append("picture"+index,item)
      })
      /*
      for(i =0 ; i<listFiles.length ; i++)
      {
        formdata.append("picture"+i , listFiles[i]) ;
      }
      var i =0 ;
      while(i<=listfiles.length)
      {
        formdata.append("picture"+i , listFiles[i]) ;
        i++ ;
      }
      */
      var config={header:{"content-type":"multipart/form-data"}}
      var result = await postDataAndImage("finalproduct/addproductpictures",formData,config)
      // alert(result)
      if(result)
      {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Product Pictures Submitted Successfully'
        })
        setProductName("");
        setSize("");
        setColorName("");
      }
      else{
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Fail to submit Product Pictures.'
        })
      }
          }

    const fetchAllProducts = async () => {
      var list = await getData('product/fetchallproducts')
      setListProduct(list.data)
    }

    const fetchAllSize=async(pid)=>{
      setProductName(pid)
      var body ={"productid" : pid} ;
      var list = await postData('finalproduct/fetchAllSize',body) ;
      setListProductSize(list.data)
    }

    const fetchAllColor=async(sze)=>{
      setSize(sze) ;
      var body ={"productid" : productName,"size":sze} ;
      var list = await postData('finalproduct/fetchAllColor',body) ;
      setListColor(list.data)
    }

    useEffect(function () {
      fetchAllProducts()
    }, [])

    const fillProduct = () => {
      return listProduct.map((item) => {
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
      })
    }

    const fillSize = () => {
      return listProductSize.map((item) => {
        return <MenuItem value={item.size}>{item.size}</MenuItem>
      })
    }

    const fillColor = () => {
      return listColor.map((item) => {
        return <MenuItem value={item.finalproductid}>{item.colorname}</MenuItem>
      })
    }

    const handlefillSize=(productid)=>{
      setColorName("")
      
      fetchAllSize(productid) ;
    }

    const handlefillcolor=(finalproductid)=>{
      fetchAllColor(finalproductid) ;
    }
  
  
      return (

        <div className={classes.root}>
      <div className={classes.subdiv}>
        <div style={{ width: 480 }}>
          <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
            <span><img src="/glasscart.png" width="40" /></span><span>Add Product Pictures</span>
          </div>

        </div>
        <br></br>

        <Grid container spacing={1}>

        

          <Grid item xs={4}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo1-simple-select-outlined-label">Select Product </InputLabel>
        <Select
          labelId="demo1-simple-select-outlined-label"
          id="demo1-simple-select-outlined"
          value={productName}
          onChange={(event) =>  handlefillSize(event.target.value)}
          label="Select Product"
         
        >
           {fillProduct()}
        </Select>
      </FormControl>
          </Grid>

       

        

<Grid item xs={4}>
<FormControl variant="outlined" className={classes.formControl} fullWidth>
<InputLabel id="demo2-simple-select-outlined-label">Select Size </InputLabel>
<Select
labelId="demo1-simple-select-outlined-label"
id="demo1-simple-select-outlined"
// value={finalProductName}
onChange={(event) => handlefillcolor(event.target.value)}
label="Select Size"
>
<MenuItem value='Select Color'>Select Size</MenuItem>
{fillSize()}
</Select>
</FormControl>
</Grid>

<Grid item xs={4}>
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo2-simple-select-outlined-label">Select Color</InputLabel>
        <Select
          labelId="demo2-simple-select-outlined-label"
          id="demo2-simple-select-outlined"
         value={colorName}
        onChange={(event)=>setColorName(event.target.value)}
          label="Select Color"
        >
          <MenuItem value='Select Color'>Select Color</MenuItem>
          {fillColor()}
        </Select>
      </FormControl>
          </Grid>
          <Grid item xs={12}>
          <DropzoneArea
           acceptedFiles={["image/jpeg","image/png","image/bmp"]}
           maxFileSize={5000000}
           filesLimit={10}
        onChange={(files)=>handleFiles(files)}
       
        />
          </Grid>
          <Grid item xs={12}>
<Button onClick={()=>handleUploadFiles()}
color="primary" variant="contained" fullWidth>Upload Files</Button>
          </Grid>
          
          

          </Grid>
          </div>
          </div>
          
      )




}
