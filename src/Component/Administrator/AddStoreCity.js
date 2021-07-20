import React, { useState, useEffect } from "react"
import { TextField, Grid, Button, InputLabel, FormControl, Select, MenuItem, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData, postDataAndImage } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import { isDigits, isEmail, isEmpty, isMobile, pictureCheck } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Geocode from "react-geocode";



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

export default function AddStoreCity(props) {
  const [listStates, setListStates] = useState([])
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
  // const [error,setError]=useState("")

  const handlePicture = (event) => {
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
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
      var formData = new FormData()
      formData.append("state", state)
      formData.append("city", city)
      formData.append("storename", storeName)
      formData.append("addressone", addressOne)
      formData.append("addresstwo", addressTwo)
      formData.append("landmark", landmark)
      formData.append("latitude", latitude)
      formData.append("longitude", longitude)
      formData.append("emailaddress", emailAddress)
      formData.append("contactno", contactNumber)
      formData.append("picture", picture.bytes)
      var config = { headers: { "Content-Type": "multipart/form-data" } }
      var result = await postDataAndImage('stores/insertstore', formData, config)

      if (result) {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Record Submitted Successfully'
        })
      }
      else {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Fail to submit record'
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
            <span><img src="/glasscart.png" width="40" /></span><span>Add Stores</span>
          </div>

        </div>
        <br></br>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="state-id">Select State</InputLabel>
              <Select
                labelId="state-id"
                id="stateid"
                // value={age}
                onChange={(event) => setState(event.target.value)}
                label="Select State"
              >
                {fillState()}
              </Select>
            </FormControl>


          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" label="City" fullWidth
              onChange={(event) => setCity(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Store Name" fullWidth
              // error={error}
              onChange={(event) => setStoreName(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Address Line 1" fullWidth
              onChange={(event) => setAddressOne(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Address Line 2" fullWidth
              onChange={(event) => setAddressTwo(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" label="Landmark" fullWidth
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
            <TextField variant="outlined" label="Contact Number" fullWidth
              onChange={(event) => setContactNumber(event.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" label="Email Address" fullWidth
              onChange={(event) => setEmailAddress(event.target.value)}
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
            <Avatar alt="Remy Sharp" src={picture.filename} variant="rounded" style={{ width: 50, height: 50 }} />
          </Grid>

          <Grid item sm={12}>
            <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Submit Store</Button>
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