import React, { useState, useEffect } from "react"
import { TextField, Grid, Button, InputLabel, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import {  isEmpty, isNumber } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  postDataAndImage,postData,getData } from "../FetchNodeServices";


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

export default function AddPrice(props) {

const [minPrice,setMinPrice] = useState("")
const [maxPrice, setMaxPrice] = useState("")



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
    if (isEmpty(minPrice)) {
        err = true;
        toastMessage("Please enter the Minimum Price!")
      } else {
        if (!isNumber(minPrice)) {
          err = true;
          toastMessage("Please Enter Numbers only!")
        }
      }

      if (isEmpty(maxPrice)) {
        err = true;
        toastMessage("Please enter the Maximum Price!")
      } else {
        if (!isNumber(maxPrice)) {
          err = true;
          toastMessage("Please Enter Numbers only!")
        }
      }
   
   
   
    if (!err) {
        var body = { "minprice": minPrice,"maxprice": maxPrice}
        var result = await postData('price/insertprice', body)

      if (result) {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Prices are Submitted Successfully'
        })
      }
      else {
        Swal.fire({
          imageWidth: 200,
          imageUrl: '/glasscart.png',
          title: 'GlassKart.com',
          text: 'Fail to submit Prices'
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
                        <span><img src="/glasscart.png" width="40" /></span><span style={{ fontSize: 30 }}>Add Price</span>
                    </div>
                </div>
                <br></br>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField variant="outlined" label="Minimum Price" fullWidth
                        onChange={(event) => setMinPrice(event.target.value)}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField variant="outlined" label="Maximum Price" fullWidth
                        onChange={(event) => setMaxPrice(event.target.value)}
                        />
                    </Grid>

                    

                    <Grid item sm={12}>
                        <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Submit Prices</Button>
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