import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { TextField, Grid, Button, InputLabel, FormControl, Select, MenuItem, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData, ServerURL, postDataAndImage, postData } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import { isEmpty } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddProduct from "./AddProduct";
import { AddRounded, AddCircleOutlineRounded } from "@material-ui/icons";
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
    width: 1200,
    background: '#f1f2f6',
    marginTop: 5,
    padding: 15, height: "auto", borderRadius: 5
  },
  droot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 20
  },
  dsubdiv: {
    width: 800,
    background: '#f1f2f6',
    marginTop: 5,
    padding: 15, height: "auto", borderRadius: 5
  },
  input: {
    display: 'none',
  }

}))



export default function DisplayProduct(props) {

  DisplayProduct.modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
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
  DisplayProduct.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]


  var classes = useStyles()
  var [productList, setProductList] = useState([])
  const [open, setOpen] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [listFrame, setListFrame] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listShape, setListShape] = useState([]);
  const [productId, setProductId] = useState("")
  const [productName, setProductName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [frame, setFrame] = useState("");
  const [material, setMaterial] = useState("");
  const [shape, setShape] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState({ filename: '', bytes: '' })
  const [oldPicture, setOldPicture] = useState("")
  const [btnStatus, setBtnStatus] = useState(false)
  const [status, setStatus] = useState("");
  const [addStatus, setAddStatus] = useState("");

  const handlePicture = (event) => {

    setOldPicture(picture.filename)
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
  }


  const fetchAllCategory = async () => {
    var list = await getData('category/fetchallcategories')
    setListCategory(list.data)
  }

  const fetchAllFrame = async () => {
    var list = await getData('frame/fetchallframe')
    setListFrame(list.data)
  }

  const fetchAllMaterial = async () => {
    var list = await getData('material/fetchallmaterial')
    setListMaterial(list.data)
  }

  const fetchAllShape = async () => {
    var list = await getData('shape/fetchallshape')
    setListShape(list.data)
  }

  useEffect(function () {
    fetchAllCategory()
    fetchAllFrame()
    fetchAllMaterial()
    fetchAllShape()
  }, [])

  const fillCategory = () => {
    return listCategory.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }

  const fillFrame = () => {
    return listFrame.map((item) => {
      return <MenuItem value={item.frameid}>{item.framename}</MenuItem>
    })
  }

  const fillMaterial = () => {
    return listMaterial.map((item) => {
      return <MenuItem value={item.materialid}>{item.materialname}</MenuItem>
    })
  }

  const fillShape = () => {
    return listShape.map((item) => {
      return <MenuItem value={item.shapeid}>{item.shapename}</MenuItem>
    })
  }
  const handleCancelPicture = async () => {

    setPicture({ filename: oldPicture, bytes: "" })
    setBtnStatus(false)
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

  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append("productid", productId)
    formData.append("picture", picture.bytes)
    var config = { headers: { "Content-Type": "multipart/form-data" } }
    var result = await postDataAndImage('product/editproductpicture', formData, config)

    if (result) {
      Swal.fire({
        imageWidth: 200,
        imageUrl: '/glasscart.png',
        title: 'GlassKart.com',
        text: 'Picture Updated Successfully'
      })
    }
    else {
      Swal.fire({
        imageWidth: 200,
        imageUrl: '/glasscart.png',
        title: 'GlassKart.com',
        text: 'Fail to edit picture..'
      })
    }
    setOpen(false)
    setBtnStatus(false)
    fetchAllProducts()
  }

  const handleSubmit = async () => {
    var err = false
    if (isEmpty(productName)) {
      err = true;
      toastMessage("Please Enter The Product Name!")
    }
    if (isEmpty(type)) {
      err = true;
      toastMessage("Please select the type! ")
    }
    if (isEmpty(category)) {
      err = true;
      toastMessage("Please select the Category!")
    }
    if (isEmpty(frame)) {
      err = true;
      toastMessage("Please select the Frame-Type!")
    }
    if (isEmpty(material)) {
      err = true;
      toastMessage("Please select the Material!")
    }
    if (isEmpty(shape)) {
      err = true;
      toastMessage("Please select the Shape!")
    }
    if (isEmpty(picture.filename)) {
      err = true;
      toastMessage("Please Upload an image!")
    }
    if (!err) {
      var body = { "productid": productId, "productname": productName, "type": type, "category": category, "frame": frame, "material": material, "shape": shape, "description": description, "status": status, "addstatus": addStatus }
      var result = await postData('product/updateproductdata', body)

      if (result) {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Product Updated Successfully'
        })
      }
      else {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Fail to update Product'
        })
      }
      setOpen(false)
    }
    fetchAllProducts()



  }

  const handleDeleteProduct = async (data) => {
    var body = { productid: data.productid }
    Swal.fire({
      imageWidth: 200,
      imageUrl: '/glasscart.png',
      title: 'GlassKart.com',
      text: 'Are you sure to delete selected product??',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        var result = await postData("product/deleteproduct", body)
        if (result)
          Swal.fire(
            'Deleted!',
            'Your product has been deleted.',
            'success'
          )
        else
          Swal.fire(
            'FAIL!!!!',
            'Server error fail to delete product',
            'error'
          )

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Product is safe :)',
          'error'
        )
      }
      fetchAllProducts()
    })

  }

  const handleClickOpen = (data) => {
    setProductId(data.productid)
    setProductName(data.productname)
    setType(data.type)
    setCategory(data.categoryid)
    setFrame(data.frameid)
    setMaterial(data.materialid)
    setShape(data.shapeid)
    setDescription(data.description)
    setStatus(data.status)
    setAddStatus(data.addstatus)
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const productDialog = () => {
    return (
      <div>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> <div style={{ width: 480 }}>
            <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, }}>
              <span><img src="/glasscart.png" width="40" /></span><span>Edit Products</span>
            </div>

          </div></DialogTitle>
          <DialogContent>


            <div className={classes.root}>
              <div className={classes.subdiv}>
                <div style={{ width: 480 }}>
                  {/* <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
            <span><img src="/glasscart.png" width="40" /></span><span>Add Products</span>
          </div> */}

                </div>


                <Grid container spacing={1}>

                  <Grid item xs={6}>
                    <TextField variant="outlined" label="Product Name" fullWidth value={productName}

                      onChange={(event) => setProductName(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Select Type</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={type}
                        onChange={(event) => setType(event.target.value)}
                        label="Select Type"
                      >
                        <MenuItem value='Men'>Men</MenuItem>
                        <MenuItem value='Women'>Women</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>


                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Select Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        label="Select Type"
                      >
                        {fillCategory()}
                      </Select>
                    </FormControl>
                  </Grid>


                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Select Frame</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={frame}
                        onChange={(event) => setFrame(event.target.value)}
                        label="Select Frame"
                      >
                        {fillFrame()}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Select Material</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={material}
                        onChange={(event) => setMaterial(event.target.value)}
                        label="Select Material"
                      >
                        {fillMaterial()}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl variant="outlined" className={classes.formControl} fullWidth>
                      <InputLabel id="demo-simple-select-outlined-label">Select Shape</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={shape}
                        onChange={(event) => setShape(event.target.value)}
                        label="Select Shape"
                      >
                        {fillShape()}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <ReactQuill value={description}
                      modules={DisplayProduct.modules}
                      formats={DisplayProduct.formats}
                      onChange={(txt) => setDescription(txt)} />
                  </Grid>


                  <Grid item xs={6}>
                    <TextField variant="outlined" label="Status" fullWidth value={status}

                      onChange={(event) => setStatus(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel htmlFor="outlined-age-native-simple">Add Status</InputLabel>
                      <Select
                        onChange={(event) => setAddStatus(event.target.value)}
                        native
                        label="Select Status"
                        value={addStatus}
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option >Activate</option>
                        <option >Deactivate</option>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} style={{ alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
                    {!btnStatus ? <>
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
                          Edit Picture
                        </Button>
                      </label></> : <></>}
                    {btnStatus ? <div style={{ display: "flex", flexDirection: "row" }}>
                      <Button onClick={() => handleSavePicture()}>Save</Button>
                      <Button onClick={() => handleCancelPicture()}>Cancel</Button></div> : <></>}
                  </Grid>
                  <Grid item xs={6} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                    <Avatar alt="Remy Sharp" src={picture.filename} variant="rounded" style={{ width: 50, height: 50 }} />
                  </Grid>

                  <Grid item sm={12}>
                    <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Edit Product</Button>
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

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const fetchAllProducts = async () => {
    var list = await getData("product/fetchallproducts")
    setProductList(list.data)
  }

  useEffect(function () {
    fetchAllProducts()
  }, [])

  function SimpleAction() {
    return (

      <MaterialTable


        title={
          <div>

            <Button variant="contained" color="primary" onClick={() => props.setComponent(<AddProduct />)} startIcon={<AddCircleOutlineRounded />}>Add More Products</Button>
          </div>
        }
        columns={[
          { title: 'ID', field: 'productid' },
          {
            title: 'Product Name', field: 'productname'
          },
          {
            title: 'Product Type', field: 'type'
          },
          {
            title: 'Product Category',
            field: 'categoryname'
          },
          {
            title: 'Product Material', field: 'materialname'
          },
          {
            title: 'Product Shape', field: 'shapename'
          },
          {
            title: 'Product Frame', field: 'framename'
          },
          {
            title: 'Product Status', field: 'status'
          },
          {
            title: 'Product AddStatus', field: 'addstatus'
          },
          {
            title: 'Picture',
            render: rowData => <img style={{ width: 50, height: 50, borderRadius: 10 }} src={`${ServerURL}/images/${rowData.picture}`} />
          }
        ]}
        data={productList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Product',
            onClick: (event, rowData) => handleDeleteProduct(rowData)
          }
        ]}
      />

    )
  }
  return (

    <div className={classes.root}>
      <div className={classes.subdiv}>
        {SimpleAction()}
      </div>
      {productDialog()}
    </div>

  )


}