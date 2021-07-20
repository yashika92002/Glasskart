import React, { useState, useEffect } from "react"
import { TextField, Grid, Button, InputLabel, Avatar ,FormControl,Select} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import {  isEmpty } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  postDataAndImage ,postData,getData,ServerURL} from "../FetchNodeServices";


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

export default function AddFrameType(props) {

const [frameName,setFrameName] = useState("")
const [status,setStatus] = useState("")
const [picture, setPicture] = useState({ filename: '', bytes: '' })

const handlePicture = (event) => {
    setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
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
    if (isEmpty(frameName)) {
      err = true;
      toastMessage("Please Enter The frame Name!")
    }
   
    if (isEmpty(picture.filename)) {
      err = true;
      toastMessage("Please Upload an image!")
    }
   
    if (!err) {
      var formData = new FormData()
      formData.append("framename", frameName)
      formData.append("status", status)
      formData.append("picture", picture.bytes)
      var config = { headers: { "Content-Type": "multipart/form-data" } }
      var result = await postDataAndImage('frame/insertframe', formData, config)

      if (result) {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Frames Submitted Successfully'
        })
      }
      else {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Fail to submit frame'
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
                        <span><img src="/glasscart.png" width="40" /></span><span style={{ fontSize: 30 }}>Add Frame</span>
                    </div>
                </div>
                <br></br>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField variant="outlined" label="Frame Name" fullWidth
                        onChange={(event) => setFrameName(event.target.value)}
                        />
                    </Grid>

                   
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
              <Select
                onChange={(event) => setStatus(event.target.value)}
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
                                Upload Frame
                            </Button>
                        </label>
                    </Grid>
                    <Grid item xs={6} style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
                        <Avatar alt="Remy Sharp"  src={picture.filename}  variant="rounded" style={{ width: 50, height: 50 }} />
                    </Grid>

                    <Grid item sm={12}>
                        <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Submit Frame</Button>
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