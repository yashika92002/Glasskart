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
export default function DisplayAllStores() {
  var classes = useStyles()
  var [storeList, setStoreList] = useState([])

  const [open, setOpen] = React.useState(false);
  const [listStates, setListStates] = useState([])
  const [storeId, setStoreId] = useState("")
  const [state, setState] = useState("")
  const [city, setCity] = useState("")
  const [storeName, setStoreName] = useState("")
  const [addressOne, setAddressOne] = useState("")
  const [addressTwo, setAddressTwo] = useState("")
  const [landmark, setLandmark] = useState("")
  const [latitude, setLatitutde] = useState("")
  const [longitude, setLongitude] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [picture, setPicture] = useState({ filename: '', bytes: '' })
  const [oldPicture, setOldPicture] = useState("")
  const [btnStatus, setBtnStatus] = useState(false)

  const handlePicture = (event) => {
    
    setOldPicture(picture.filename)
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setBtnStatus(true)
  }

  const fetchAllStates = async () => {
    var list = await getData('stores/fetchallstates')
    setListStates(list.data)
  }

  // const getLatLng=(address)=>{
  //var address=storeName+","+addressOne+","+city+","+state
  //   Geocode.setApiKey("AIzaSyCTKHr30JSUEhrP3w8WtCJTEXSk134rfuc");
  //   Geocode.setLanguage("en");
  //   Geocode.fromAddress(address).then(
  //     (response) => {
  //       const { lat, lng } = response.results[0].geometry.location;
  //       console.log(lat, lng);
  //       alert(lat+","+lng)
  //     },
  //     (error) => {
  //       console.error(error);
  //       alert(error)
  //     }
  //   );
  // }

  useEffect(function () {
    fetchAllStates()
  }, [])

  const fillState = () => {
    return listStates.map((item) => {
      return <MenuItem value={item.statename}>{item.statename}</MenuItem>
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
  const handleCancelPicture = async ()=>{
    
    setPicture({filename:oldPicture,bytes:""})
    setBtnStatus(false)
  }

  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append("storeid", storeId)
    formData.append("picture", picture.bytes)
    var config = { headers: { "Content-Type": "multipart/form-data" } }
    var result = await postDataAndImage('stores/editstorepicture', formData, config)

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
fetchAllStores()
  }

  const handleSubmit = async () => {
    // getLatLng("Singhal Bhawan Jayendraganj Lashkar")
    var err = false
    if (isEmpty(state)) {
      err = true;
      toastMessage("Please Select The State!")
    }
    if (isEmpty(city)) {
      err = true;
      toastMessage("City should not be blank! ")
    }
    if (isEmpty(storeName)) {
      err = true;
      // setError(true)
      toastMessage("Please enter The Store Name!")
    }
    if (isEmpty(addressOne)) {
      err = true;
      toastMessage("Please fill The Address!")
    }
    if (isEmpty(landmark)) {
      err = true;
      toastMessage("Landmark should not be blank!")
    }
    if (isEmpty(latitude)) {
      err = true;
      toastMessage("Latitude should not be blank!")
    } else {
      if (!isDigits(latitude)) {
        err = true;
        toastMessage("Latitude must be a decimal value!")
      }
    }
    if (isEmpty(longitude)) {
      err = true;
      toastMessage("Longitude should not be blank!")
    } else {
      if (!isDigits(longitude)) {
        err = true;
        toastMessage("Longitude must be a decimal value!")
      }
    }
    if (isEmpty(contactNumber)) {
      err = true;
      toastMessage("Please enter the contact number!")
    } else {
      if (!isMobile(contactNumber)) {
        err = true;
        toastMessage("Please Enter valid Contact Number!")
      }
    }
    if (isEmpty(picture.filename)) {
      err = true;
      toastMessage("Please Upload an image!")
    }
    if (isEmpty(emailAddress)) {
      err = true;
      toastMessage("Please Enter The Email Address!")
    } else {
      if (!isEmail(emailAddress)) {
        err = true;
        toastMessage("Please Enter Correct Email Address!")
      }
    }
    if (!err) {
      var body = { "storeid": storeId, "state": state, "city": city, "storename": storeName, "addressone": addressOne, "addresstwo": addressTwo, "landmark": landmark, "latitude": latitude, "longitude": longitude, "emailaddress": emailAddress, "contactno": contactNumber }
      var result = await postData('stores/updatestoredata', body)

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
    fetchAllStores()
  }
  const handleDeleteStore=async(data)=>{
var body={storeid:data.storeid}
Swal.fire({
  imageWidth: 200,
  imageUrl: '/glasscart.png',
  title: 'GlassKart.com',
  text: 'Are you sure to delete selected record??',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then(async(result) => {
  if (result.isConfirmed) {
    var result=await postData("stores/deletestore",body)
    if(result)
    Swal.fire(
      'Deleted!',
      'Your record has been deleted.',
      'success'
    )
    else
      Swal.fire(
        'FAIL!!!!',
        'Server error fail to delete record',
        'error'
        )
    
  // For more information about handling dismissals please visit
  // https://sweetalert2.github.io/#handling-dismissals
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your Record is safe :)',
      'error'
    )
  }
  fetchAllStores()
})

  }

  const handleClickOpen = (data) => {
    setStoreId(data.storeid)
    setState(data.storestate)
    setCity(data.storecity)
    setStoreName(data.storename)
    setAddressOne(data.addressone)
    setAddressTwo(data.addresstwo)
    setLandmark(data.landmark)
    setLatitutde(data.lat)
    setLongitude(data.lng)
    setContactNumber(data.contactnumber)
    setEmailAddress(data.emailaddress)
    setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" })
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const storeDialog = () => {
    return (
      <div>
      
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title"> <div style={{ width: 480 }}>
            <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, }}>
              <span><img src="/glasscart.png" width="40" /></span><span>Edit Stores</span>
            </div>

          </div></DialogTitle>
          <DialogContent>
            <div className={classes.droot}>
              <div className={classes.dsubdiv}>


                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel id="state-id">Select State</InputLabel>
                      <Select
                        labelId="state-id"
                        id="stateid"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                        label="Select State"
                      >
                        {fillState()}
                      </Select>
                    </FormControl>


                  </Grid>
                  <Grid item xs={6}>
                    <TextField variant="outlined" label="City" fullWidth value={city}
                      onChange={(event) => setCity(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField variant="outlined" label="Store Name" fullWidth
                      // error={error}
                      value={storeName}
                      onChange={(event) => setStoreName(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField variant="outlined" label="Address Line 1" fullWidth
                      value={addressOne}
                      onChange={(event) => setAddressOne(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField variant="outlined" label="Address Line 2" fullWidth
                      value={addressTwo}
                      onChange={(event) => setAddressTwo(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField variant="outlined" label="Landmark" fullWidth
                      value={landmark}
                      onChange={(event) => setLandmark(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField variant="outlined" label="Latitude" fullWidth value={latitude}
                      onChange={(event) => setLatitutde(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField variant="outlined" label="Longitude" fullWidth value={longitude}
                      onChange={(event) => setLongitude(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" fullWidth
                      style={{ background: "#10ac84", color: "#FFF", fontSize: 16, padding: 12 }}
                    //  onClick={()=>getLatLng()}
                    >Get Location</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField variant="outlined" label="Contact Number" fullWidth value={contactNumber}
                      onChange={(event) => setContactNumber(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField variant="outlined" label="Email Address" fullWidth value={emailAddress}
                      onChange={(event) => setEmailAddress(event.target.value)}
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
                    <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Edit Store</Button>
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

  const fetchAllStores = async () => {
    var list = await getData("stores/fetchallstores")
    setStoreList(list.data)
  }

  useEffect(function () {
    fetchAllStores()
  }, [])

  function SimpleAction() {
    return (

      <MaterialTable


        title="😎Our Stores"
        columns={[
          { title: 'ID', field: 'storeid' },
          {
            title: 'Store Name',
            render: rowData => <div><b>{rowData.storename}</b><br />{rowData.addressone}<br />{rowData.addresstwo}</div>
          },
          {
            title: 'City',
            render: rowData => <div>{rowData.storecity},{rowData.storestate}</div>
          },
          {
            title: 'Contact',
            render: rowData => <div>{rowData.emailaddress}<br />{rowData.contactnumber}</div>
          },
          {
            title: 'Location',
            render: rowData => <div><a href={`http://maps.google.com/maps?q=${rowData.lat},${rowData.lng}`}>Show</a></div>
          },
          {
            title: 'Picture',
            render: rowData => <img style={{ width: 50, height: 50, borderRadius: 10 }} src={`${ServerURL}/images/${rowData.picture}`} />
          }
        ]}
        data={storeList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Store',
            onClick: (event, rowData) => handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Store',
            onClick: (event, rowData) => handleDeleteStore(rowData)
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
      {storeDialog()}
    </div>

  )
}