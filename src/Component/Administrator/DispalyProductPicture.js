import React, { useState, useEffect } from "react"
import { Grid, Button, InputLabel, FormControl, Select, MenuItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData,postData, ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import 'react-quill/dist/quill.snow.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import { AddRounded,AddCircleOutlineRounded } from "@material-ui/icons";
import ProductPictures from "./ProductPictures";
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
    },
    root2: {
        maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      avatar: {
        backgroundColor: red[500],
      }
  
  }))

  export default function DisplayProductPictures(props){

    
    const classes = useStyles() ;

    const [listProduct, setListProduct] = useState([])
    const [listProductSize, setListProductSize] = useState([])
    const [productName, setProductName] = useState("")
    const [listColor, setListColor] = useState([])
    const [colorName, setColorName] = useState("")
    const [size, setSize] = useState("")
    const [listFiles, setListFiles] = useState([])

   
const handleDel = async(t) => {
  var body = { pictureid: t }
  Swal.fire({
      imageWidth: 200,
      imageUrl: '/glasscart.png',
      title: 'GlassKart.com',
      text: 'Are you sure to delete selected Product Image??',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
  }).then(async (result) => {
      if (result.isConfirmed) {
          var result = await postData("finalproduct/deletespeceficpicture", body)
          if (result)
              Swal.fire(
                  'Deleted!',
                  'Your product image has been deleted.',
                  'success'
              )
          else
              Swal.fire(
                  'FAIL!!!!',
                  'Server error fail to delete product image.',
                  'error'
              )

          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
              'Cancelled',
              'Your Product Image is safe :)',
              'error'
          )
      }
      setSpecificPicture()
  })

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

    const setSpecificPicture=async(t)=>{
        setColorName(t) ;
        var body ={"finalproductid" : t} ;
        var list = await postData('finalproduct/fetchAllSpecificPicture',body) ;
        setListFiles(list.data)
        
    }
    const handleEdit = async(event , pictureid)=>{
      var formdata = new FormData() ;
      formdata.append("picture" , event.target.files[0])
      formdata.append("pictureid" , pictureid) ;
      var config = { headers: { "Content-Type": "multipart/form-data" } }
          
          Swal.fire({
            imageWidth: 200,
            imageUrl: '/glasscart.png',
            title: 'GlassKart.com',
            text: 'Are you sure to update selected Product Image??',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'No, leave it'
        }).then(async (result) => {
            if (result.isConfirmed) {
              var result = await postDataAndImage('finalproduct/editproductpicture', formdata, config)
                if (result)
                    Swal.fire(
                        'Updated!',
                        'Your product image has been Updated.',
                        'success'
                    )
                else
                    Swal.fire(
                        'FAIL!!!!',
                        'Server error fail to update product image.',
                        'error'
                    )
      
                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Product Image is safe :)',
                    'error'
                )
            }
            setSpecificPicture()

    })
  }

    const fillPicture=()=>{
        return listFiles.map((item)=>{
            return(
                <Grid xs={6}>
                <Card className={classes.root2}>
                <CardHeader
                 
                 
                  title="Product Picture"
                 
                />
                <CardMedia
                  className={classes.media}
                  image={`${ServerURL}/images/${item.image}`}
                  title="Paella dish"
                />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
        <input
        accept="image/*"
        className={classes.input}
        id={`contained-button-file${item.pictureid}`}
        multiple
        type="file"
        onChange={(event)=>handleEdit(event,item.pictureid)}
      />
      <label htmlFor={`contained-button-file${item.pictureid}`}>
        <Button fullWidth variant="contained" color="primary" component="span">
          Edit
        </Button>
      </label>
                 </Grid>
                 <Grid item xs={6}>
                 <Button variant="contained" fullWidth color="primary" onClick={(event)=>handleDel(item.pictureid)}>Delete</Button>
                 </Grid>
                 </Grid>
                </CardContent>
                <CardActions disableSpacing>
                  
                  
                </CardActions>
                
              </Card>
              </Grid>
            )
        })
    }
  
  
      return (

        <div className={classes.root}>
      <div className={classes.subdiv}>
        <div style={{ width: 480 }}>
          {/* <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
            <span><img src="/glasscart.png" width="40" /></span><span>Product Pictures</span>
          </div> */}
          <div>
    
      <Button variant="contained" color="primary" onClick={()=>props.setComponent(<ProductPictures/>)} startIcon={<AddCircleOutlineRounded/>}>Add More Product Pictures</Button>  </div>

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
        onChange={(event)=>setSpecificPicture(event.target.value)}
          label="Select Color"
        >
          <MenuItem value='Select Color'>Select Color</MenuItem>
          {fillColor()}
        </Select>
      </FormControl>
          </Grid>
         
         
            {fillPicture()}
         
          
          

          </Grid>
          </div>
          </div>
          
      )




}
// title={
//   <div>
    
//     <Button variant="contained" color="primary" onClick={()=>props.setComponent(<AddFinalProduct/>)} startIcon={<AddCircleOutlineRounded/>}>Add More Final Products</Button>
//   </div>
// }