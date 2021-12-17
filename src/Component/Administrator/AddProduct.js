import React, { useState, useEffect } from "react"
import { TextField, Grid, Button, InputLabel, FormControl, Select, MenuItem, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData, postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import { isEmpty } from "../Checks";
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

export default function AddProduct(props) {

  AddProduct.modules = {
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
  AddProduct.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]





  const [listCategory, setListCategory] = useState([]);
  const [listFrame, setListFrame] = useState([]);
  const [listMaterial, setListMaterial] = useState([]);
  const [listShape, setListShape] = useState([]);
  const [productName, setProductName] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [frame, setFrame] = useState("");
  const [material, setMaterial] = useState("");
  const [shape, setShape] = useState("");
  const [status, setStatus] = useState("");
  const [addStatus, setAddStatus] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState({ filename: '', bytes: '' })

  const handlePicture = (event) => {
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
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
      var formData = new FormData()
      formData.append("productname", productName)
      formData.append("type", type)
      formData.append("category", category)
      formData.append("frame", frame)
      formData.append("material", material)
      formData.append("shape", shape)
      formData.append("description", description)
      formData.append("picture", picture.bytes)
      formData.append("status", status);
      formData.append("addstatus", setAddStatus);
      var config = { headers: { "Content-Type": "multipart/form-data" } }
      var result = await postDataAndImage('product/insertproduct', formData, config)

      if (result) {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Product Submitted Successfully'
        })
        setProductName('');
        setType('');
        setCategory('');
        setFrame('');
        setMaterial('');
        setShape('');
        setDescription('');
        setStatus('');
        setAddStatus('');
        setPicture({ filename: '', bytes: '' })
      }
      else {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Fail to submit product'
        })
      }
    }
  }

  const classes = useStyles();
  return (

    <div className={classes.root}>
      <div className={classes.subdiv}>
        <div style={{ width: 480 }}>
          <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
            <span><img src="/glasscart.png" width="40" /></span><span>Add Products</span>
          </div>

        </div>
        <br></br>

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
              modules={AddProduct.modules}
              formats={AddProduct.formats}
              onChange={(txt) => setDescription(txt)} />    </Grid>

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
            <Avatar alt="Remy Sharp" src={picture.filename} variant="rounded" style={{ width: 50, height: 50 }} />
          </Grid>

          <Grid item sm={12}>
            <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Submit Product</Button>
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