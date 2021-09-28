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
import MainPage from "./MainPage";
import  { AddRounded,AddCircleOutlineRounded } from "@material-ui/icons";
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
export default function DisplayMainPage(props) {
  var classes = useStyles()
  const [mainPageList, setMainPageList] = useState([])

  const [open, setOpen] = React.useState(false);
  const [mainPageId, setMainPageId] = useState("")
  const [position,setPosition] = useState("")
  const [status,setStatus] = useState("")
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
    formData.append("mainpageid", mainPageId)
    formData.append("picture", picture.bytes)
    var config = { headers: { "Content-Type": "multipart/form-data" } }
    var result = await postDataAndImage('mainpage/editmainpagepicture', formData, config)

    if (result) {
      Swal.fire({
        imageWidth: 200,
        imageUrl: '/glasskart9.png',
        title: 'GlassKart.com',
        text: 'MainPage Picture Updated Successfully'
      })
    }
    else {
      Swal.fire({
        imageWidth: 200,
        imageUrl: '/glasskart9.png',
        title: 'GlassKart.com',
        text: 'Fail to edit mainpage picture..'
      })
    }
    setOpen(false)
setBtnStatus(false)
fetchAllMainPage()
  }

  const handleSubmit = async () => {
    var err = false
    if (isEmpty(position)) {
      err = true;
      toastMessage("Please Enter The Position!")
    }
    if (isEmpty(status)) {
      err = true;
      toastMessage("Please Select The Status!")
    }
    if (isEmpty(picture.filename)) {
      err = true;
      toastMessage("Please Upload an image!")
    }
    
    if (!err) {
      // alert(mainPageId)
      var body = { "mainpageid": mainPageId, "position": position , "status": status}
      var result = await postData('mainpage/updatemainpagedata', body)

      if (result) {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasskart9.png',
          title: 'GlassKart.com',
          text: 'MainPage Updated Successfully'
        })
      }
      else {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasskart9.png',
          title: 'GlassKart.com',
          text: 'Fail to update mainpage'
        })
      }
      setOpen(false)
    }
    fetchAllMainPage()
  }
  const handleDeleteMainPage=async(data)=>{
var body={mainpageid:data.mainpageid}
Swal.fire({
  imageWidth: 200,
  imageUrl: '/glasskart9.png',
  title: 'GlassKart.com',
  text: 'Are you sure to delete selected MainPage??',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then(async(result) => {
  if (result.isConfirmed) {
    var result=await postData("mainpage/deletemainpage",body)
    if(result)
    Swal.fire(
      'Deleted!',
      'Your MainPage has been deleted.',
      'success'
    )
    else
      Swal.fire(
        'FAIL!!!!',
        'Server error fail to delete mainpage',
        'error'
        )
    
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your mainpage is safe :)',
      'error'
    )
  }
  fetchAllMainPage()
})

  }

  const handleClickOpen = (data) => {
    setMainPageId(data.mainpageid)
    setPosition(data.position)
    setStatus(data.status)
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const mainPageDialog = () => {
    return (
      <div>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> <div style={{ width: 480 }}>
            <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, }}>
              <span><img src="/glasskart9.png" width="40" /></span><span>Edit MainPage</span>
            </div>

          </div></DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>


                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <TextField variant="outlined" label="Position" fullWidth value={position}
                      onChange={(event) => setPosition(event.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple" >Status</InputLabel>
              <Select
                onChange={(event) => setStatus(event.target.value)}
                native
                value={status}
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
                    <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Edit MainPage</Button>
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

  const fetchAllMainPage = async () => {
    var list = await getData("mainpage/fetchallmainpage")
    setMainPageList(list.data)
  }

  useEffect(function () {
    fetchAllMainPage()
  }, [])

  function SimpleAction() {
    return (

      <MaterialTable


      title={
        <div>
          
          <Button variant="contained" color="primary" onClick={()=>props.setComponent(<MainPage/>)} startIcon={<AddCircleOutlineRounded/>}>Add MainPage Pictures</Button>
        </div>
      }
        columns={[
          { title: 'ID', field: 'mainpageid' },
          {
            title: 'Position',
            render: rowData => <div><b>{rowData.position}</b></div>
          },
          {
            title: 'Status',
            render: rowData => <div><b>{rowData.status}</b></div>
          },
          {
            title: 'Picture',
            render: rowData => <img style={{ width: 50, height: 50, borderRadius: 10 }} src={`${ServerURL}/images/${rowData.picture}`} />
          }
        ]}
        data={mainPageList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit MainPage',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete MainPage',
            onClick: (event, rowData) => handleDeleteMainPage(rowData)
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
      {mainPageDialog()}
    </div>

  )
}