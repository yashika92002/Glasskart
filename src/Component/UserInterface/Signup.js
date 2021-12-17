import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import "./styles.css";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "./Footer";
import Header from "./Header";
import { postData } from '../FetchNodeServices'
import OtpInput from 'react-otp-input';
// import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@material-ui/core";
import { Send, ShoppingCart } from '@material-ui/icons'
import { useDispatch } from "react-redux";


const useStyles = makeStyles((theme) => ({
    root: {

        color: 'red',
        height: '20'
    }

}))



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
}));



export default function Signup(props) {
    const classes = useStyles();
    const [otp, setOtp] = useState("")
    const [mobileno, setMobileNo] = useState('')
    const [gotp, setGotp] = useState("")
    const [showOtp, setShowOtp] = useState(false)
    var dispatch = useDispatch()

    const handleShowCart = () => {
        if (otp == gotp) {
            props.history.push({ pathname: "/showcart" })

        }
        else {
            alert("invalid otp")

        }

    }
    const handleSend = async () => {
        var body = { mobileno: mobileno }
        var result = await postData("userdetails/checkusermobilenumber", body)
        if (result.result) {
            setShowOtp(true)
            var otpval = parseInt(8999 * Math.random() + 1000)
            setGotp(otpval)
            dispatch({ type: 'ADD_USER', payload: [result.data[0].mobileno, result.data[0]] })
            alert(otpval)
        }
        else {
            var otpval = parseInt(8999 * Math.random() + 1000)
            alert(otpval)
            props.history.push({ pathname: "/signup" }, { mobileno: mobileno, otp: otpval })

        }



    }
    const handleChangeOtp = (value) => {

        setOtp(value)

    }
    return (
        <div>
            <Header history={props.history} />

            <Box sx={{ flexGrow: 1 }}>
                <Grid cotainer spacing={2} >
                    <Item style={{ display: 'flex', margin: 30 }}>
                        <Grid item xs={8}>
                            <img src='boygirl.jpg' width='100%' style={{ borderRadius: 10 }} />
                        </Grid>
                        <Grid item xs={4} style={{ border: '1px solid grey', marginLeft: 10, marginRight: 10, borderRadius: 5 }} >
                            <div>
                                <div style={{ textAlign: 'center' }}>
                                    <svg class="MuiSvgIcon-root jss5" focusable="false" viewBox="0 0 24 24" aria-hidden="true" variant="filled" aria-label="menu" style={{ fontSize: 60, border: '2px solid black', color: 'black', borderRadius: '50%', textAlign: 'center', marginTop: 10 }}><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path></svg>
                                </div>
                                <div style={{ lineHeight: 1, margin: 20 }}>
                                    <h1>Sign in</h1>
                                    <p style={{ color: 'grey' }}>Sign in to access your Orders, Offers and Wishlist.</p>

                                    <TextField
                                        style={{ marginTop: 15 }}
                                        id="input-with-icon-textfield"
                                        label="Enter Your mobile no."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +91 |
                                                </InputAdornment>
                                            ),
                                        }} onChange={(event) => setMobileNo(event.target.value)}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <Button onClick={() => handleSend()} variant="contained" endIcon={<SendIcon />} fullWidth style={{ color: '#fff', background: '#50526e', marginTop: 20 }}>
                                        Send
                                    </Button>

                                    <Grid item sm={12}>
                                        <br />
                                        {showOtp ? <> <OtpInput
                                            value={otp}
                                            onChange={(value) => handleChangeOtp(value)}
                                            numInputs={4}
                                            inputStyle="inputStyle"
                                            separator={<span>-</span>}
                                        />
                                            <Button onClick={() => handleShowCart()}
                                                fullWidth style={{ background: "#50526e", color: '#fff', marginTop: 10 }} variant="contained" color="primary" endIcon={<ShoppingCart />}>Proceed to Cart</Button>
                                        </>
                                            : <></>}
                                    </Grid>
                                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 25 }}>
                                        By continuing you agree to our &nbsp; <span style={{ color: 'red' }}> Terms of Service</span>  </p>

                                    <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        and &nbsp; <span style={{ color: 'red' }}> Privacy & Legal Policy. </span> </p>

                                </div>
                            </div>
                        </Grid>
                    </Item>
                </Grid>
            </Box>


            <Footer />
        </div>
    )
}