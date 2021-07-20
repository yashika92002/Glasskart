import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { TextField, Grid, Button, InputLabel, FormControl, Select, MenuItem, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData, ServerURL, postDataAndImage, postData } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import { isDigits, isEmail, isEmpty, isMobile } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Geocode from "react-geocode";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  subdiv: {
    width: 1000,
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
export default function DisplayAllCategory() {
  var classes = useStyles()
  const [categoryList, setCategoryList] = useState([])

  const [open, setOpen] = React.useState(false);
  const [categoryId, setCategoryId] = useState("")
  const [categoryName,setCategoryName] = useState("")
  const [picture, setPicture] = useState({ filename: '', bytes: '' })
  const [oldPicture, setOldPicture] = useState("")
  const [btnStatus, setBtnStatus] = useState(false)

  const handlePicture = (event) => {
    
    setOldPicture(picture.filename)
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
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
  const handleCancelPicture = async ()=>{
    
    setPicture({filename:oldPicture,bytes:""})
    setBtnStatus(false)
  }

  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append("categoryid", categoryId)
    formData.append("picture", picture.bytes)
    var config = { headers: { "Content-Type": "multipart/form-data" } }
    var result = await postDataAndImage('category/editcategorypicture', formData, config)

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
fetchAllCategories()
  }

  const handleSubmit = async () => {
    var err = false
    if (isEmpty(categoryName)) {
      err = true;
      toastMessage("Please Enter The Category Name!")
    }
    if (isEmpty(picture.filename)) {
      err = true;
      toastMessage("Please Upload an image!")
    }
    
    if (!err) {
      var body = { "categoryid": categoryId, "categoryname": categoryName }
      var result = await postData('category/updatecategorydata', body)

      if (result) {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Record Updated Successfully'
        })
      }
      else {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Fail to update record'
        })
      }
      setOpen(false)
    }
    fetchAllCategories()
  }
  const handleDeleteCategory=async(data)=>{
var body={categoryid:data.categoryid}
Swal.fire({
  imageWidth: 200,
  imageUrl: '/glasscart.png',
  title: 'GlassKart.com',
  text: 'Are you sure to delete selected category??',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then(async(result) => {
  if (result.isConfirmed) {
    var result=await postData("category/deletecategory",body)
    if(result)
    Swal.fire(
      'Deleted!',
      'Your category has been deleted.',
      'success'
    )
    else
      Swal.fire(
        'FAIL!!!!',
        'Server error fail to delete category',
        'error'
        )
    
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your category is safe :)',
      'error'
    )
  }
  fetchAllCategories()
})

  }

  const handleClickOpen = (data) => {
    setCategoryId(data.categoryid)
    setCategoryName(data.categoryname)
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const categoryDialog = () => {
    return (
      <div>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> <div style={{ width: 480 }}>
            <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, }}>
              <span><img src="/glasscart.png" width="40" /></span><span>Edit Category</span>
            </div>

          </div></DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>


                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" label="Category Name" fullWidth value={categoryName}
                      onChange={(event) => setCategoryName(event.target.value)}
                    />
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
                    <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Edit Category</Button>
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

  const fetchAllCategories = async () => {
    var list = await getData("category/fetchallcategories")
    setCategoryList(list.data)
  }

  useEffect(function () {
    fetchAllCategories()
  }, [])

  function SimpleAction() {
    return (

      <MaterialTable


        title="😎Our Category"
        columns={[
          { title: 'ID', field: 'categoryid' },
          {
            title: 'Category Name',
            render: rowData => <div><b>{rowData.categoryname}</b></div>
          },
          {
            title: 'Picture',
            render: rowData => <img style={{ width: 50, height: 50, borderRadius: 10 }} src={`${ServerURL}/images/${rowData.picture}`} />
          }
        ]}
        data={categoryList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Category',
            onClick: (event, rowData) => handleDeleteCategory(rowData)
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
      {categoryDialog()}
    </div>

  )
}