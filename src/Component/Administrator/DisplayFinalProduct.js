import React, { useEffect, useState } from "react"
import MaterialTable from "material-table"
import { TextField, Grid, Button, InputLabel, FormControl, Select, MenuItem, Avatar } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData, ServerURL, postDataAndImage, postData } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import { isDigits, isEmpty } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddFinalProduct from "./AddFinalProduct";
import { AddRounded,AddCircleOutlineRounded } from "@material-ui/icons";
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

export default function DisplayFinalProduct(props) {

    DisplayFinalProduct.modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
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
      DisplayFinalProduct.formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]
    

    var classes = useStyles()
    var [finalProductList, setFinalProductList] = useState([])
    const [open, setOpen] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [listColor, setListColor] = useState([]);
    const [finalProductId, setFinalProductId] = useState("")
    const [finalProductName, setFinalProductName] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState("");
    const [offerType, setOfferType] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [picture, setPicture] = useState({ filename: '', bytes: '' })
    const [oldPicture, setOldPicture] = useState("")
    const [btnStatus, setBtnStatus] = useState(false)

    const handlePicture = (event) => {

        setOldPicture(picture.filename)
        setPicture({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setBtnStatus(true)
    }

      const fetchAllProducts = async () => {
        var list = await getData('product/fetchallproducts')

        setListProduct(list.data)
      }

    const fetchAllColor = async () => {
        var list = await getData('color/fetchallcolor')
        setListColor(list.data)
    }

    const handleCancelPicture = async () => {

        setPicture({ filename: oldPicture, bytes: "" })
        setBtnStatus(false)
    }

    const fetchAllFinalProducts = async () => {
        var list = await getData("finalproduct/fetchallfinalproducts")
        setFinalProductList(list.data)
    }



    useEffect(function () {
        fetchAllFinalProducts()
        fetchAllProducts()
        // fetchAllFinalProducts()
        fetchAllColor()
    }, [])

    const fillProduct = () => {
        return listProduct.map((item) => {
            // alert(item.productid)
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    const fillColor = () => {
        return listColor.map((item) => {
            // alert(item.colorid)
            return <MenuItem value={item.colorid}>{item.colorname}</MenuItem>
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
    const handleSavePicture = async () => {
        var formData = new FormData()
        formData.append("finalproductid", finalProductId)
        formData.append("picture", picture.bytes)
        var config = { headers: { "Content-Type": "multipart/form-data" } }
        var result = await postDataAndImage('finalproduct/editfinalproductpicture', formData, config)

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
        fetchAllFinalProducts()
    }

    const handleSubmit = async () => {
        var err = false
        if (isEmpty(finalProductName)) {
            err = true;
            toastMessage("Please Enter The Product Name!")
        }
        if (isEmpty(size)) {
            err = true;
            toastMessage("Please select the size! ")
        }
        if (isEmpty(color)) {
            err = true;
            toastMessage("Please select the Color!")
        }
        if (isEmpty(price)) {
            err = true;
            toastMessage("Price should not be blank!")
        } else {
            if (!isDigits(price)) {
                err = true;
                toastMessage("Price must be a numeric value!")
            }
        }
        if (isEmpty(offerPrice)) {
            err = true;
            toastMessage("Offer Price should not be blank!")
        } else {
            if (!isDigits(offerPrice)) {
                err = true;
                toastMessage("Offer Price must be a numeric value!")
            }
        }
        if (isEmpty(stock)) {
            err = true;
            toastMessage("Stock should not be blank!")
        } else {
            if (!isDigits(stock)) {
                err = true;
                toastMessage("Stock must be a numeric value!")
            }
        }
        if (isEmpty(offerType)) {
            err = true;
            toastMessage("Please select the Offer-Type!")
        }
        if (isEmpty(picture.filename)) {
            err = true;
            toastMessage("Please Upload an image!")
        }
        if (!err) {
            var body = { "finalproductid": finalProductId, "finalproductname": finalProductName, "size": size, "color": color, "price": price, "offertype": offerType, "offerprice": offerPrice, "description": description, "stock": stock }
            var result = await postData('finalproduct/updatefinalproductdata', body)

            if (result) {
                Swal.fire({
                    imageWidth: 200,
                    imageUrl: '/glasscart.png',
                    title: 'GlassKart.com',
                    text: 'Final Product Updated Successfully'
                })
            }
            else {
                Swal.fire({
                    imageWidth: 200,
                    imageUrl: '/glasscart.png',
                    title: 'GlassKart.com',
                    text: 'Fail to update Final Product'
                })
            }
            setOpen(false)
        }
        fetchAllFinalProducts()



    }

    const handleDeleteFinalProduct = async (data) => {
        var body = { finalproductid: data.finalproductid }
        Swal.fire({
            imageWidth: 200,
            imageUrl: '/glasscart.png',
            title: 'GlassKart.com',
            text: 'Are you sure to delete selected final product??',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var result = await postData("finalproduct/deletefinalproduct", body)
                if (result)
                    Swal.fire(
                        'Deleted!',
                        'Your final product has been deleted.',
                        'success'
                    )
                else
                    Swal.fire(
                        'FAIL!!!!',
                        'Server error fail to delete final product',
                        'error'
                    )

                // For more information about handling dismissals please visit
                // https://sweetalert2.github.io/#handling-dismissals
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelled',
                    'Your Final Product is safe :)',
                    'error'
                )
            }
            fetchAllFinalProducts()
        })

    }

    const handleClickOpen = (data) => {
        setFinalProductId(data.finalproductid)
        setFinalProductName(data.productid)
        setSize(data.size)
        setColor(data.colorid)
        setPrice(data.price)
        setOfferType(data.offertype)
        setOfferPrice(data.offerprice)
        setDescription(data.description)
        setStock(data.stock)
        setPicture({ filename: `${ServerURL}/images/${data.picture}`, bytes: "" })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const finalProductDialog = () => {
        return (
            <div>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title"> <div style={{ width: 480 }}>
                        <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, }}>
                            <span><img src="/glasscart.png" width="40" /></span><span>Edit Final Products</span>
                        </div>

                    </div></DialogTitle>
                    <DialogContent>


                        <div className={classes.root}>
                            <div className={classes.subdiv}>
                                <div style={{ width: 480 }}>
                                    {/* <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, alignItems: "center", justifyContent: "center", display: "flex" }}>
                                        <span><img src="/glasscart.png" width="40" /></span><span>Add Final Products</span>
                                    </div> */}

                                </div>
                                <br></br>
                                <Grid container spacing={1}>



                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                            <InputLabel id="demo1-simple-select-outlined-label">Final Product Name</InputLabel>
                                            <Select
                                                labelId="demo1-simple-select-outlined-label"
                                                id="demo1-simple-select-outlined"
                                                value={finalProductName}
                                                onChange={(event) => setFinalProductName(event.target.value)}
                                                label="Select Final Product Name"
                                            >
                                                {fillProduct()}
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                            <InputLabel id="demo2-simple-select-outlined-label">Select Size</InputLabel>
                                            <Select
                                                labelId="demo2-simple-select-outlined-label"
                                                id="demo2-simple-select-outlined"
                                                value={size}
                                                onChange={(event) => setSize(event.target.value)}
                                                label="Select Size"
                                            >
                                                <MenuItem value='Small'>Small</MenuItem>
                                                <MenuItem value='Medium'>Medium</MenuItem>
                                                <MenuItem value='Large'>Large</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                            <InputLabel id="demo3-simple-select-outlined-label">Select Color</InputLabel>
                                            <Select
                                                labelId="demo3-simple-select-outlined-label"
                                                id="demo3-simple-select-outlined"
                                                value={color}
                                                onChange={(event) => setColor(event.target.value)}
                                                label="Select Color"
                                            >
                                                {fillColor()}
                                            </Select>
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={6}>
                                        <TextField variant="outlined" label="Price" fullWidth
                                            value={price}

                                            onChange={(event) => setPrice(event.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                            <InputLabel id="demo4-simple-select-outlined-label">Select Offer Type</InputLabel>
                                            <Select
                                                labelId="demo4-simple-select-outlined-label"
                                                id="demo4-simple-select-outlined"
                                                value={offerType}
                                                onChange={(event) => setOfferType(event.target.value)}
                                                label="Select Offer Type"
                                            >
                                                <MenuItem value='Festive Dhamaka'>Festive Dhamaka</MenuItem>
                                                <MenuItem value='Weekly Sale'>Weekly Sale</MenuItem>
                                                <MenuItem value='New Year Scheme'>New Year Scheme</MenuItem>
                                                <MenuItem value='Summer Bumper'>Summer Bumper</MenuItem>
                                                <MenuItem value='Winter Season'>Winter Season</MenuItem>
                                                <MenuItem value='None of These'>None of These</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField variant="outlined" label="Offer Price" fullWidth
                                            value={offerPrice}

                                            onChange={(event) => setOfferPrice(event.target.value)}
                                        />
                                    </Grid>




                                    <Grid item xs={12}>
                                    <ReactQuill value={description} 
            modules={DisplayFinalProduct.modules}
            formats={DisplayFinalProduct.formats}
          onChange={(txt) => setDescription(txt)}/>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField variant="outlined" label="Stock" fullWidth
                                            value={stock}

                                            onChange={(event) => setStock(event.target.value)}
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
                                        <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Edit Final Product</Button>
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

    

    function SimpleAction() {
        return (

            <MaterialTable


            title={
                <div>
                  
                  <Button variant="contained" color="primary" onClick={()=>props.setComponent(<AddFinalProduct/>)} startIcon={<AddCircleOutlineRounded/>}>Add More Final Products</Button>
                </div>
              }
                columns={[
                    { title: 'ID', field: 'finalproductid' },
                    {
                        title: 'Final Product Name', field: 'productname'
                    },
                    {
                        title: 'Final Product Color', field: 'colorname'
                    },
                    {
                        title: 'Final Product Size', field: 'size'
                    },
                    {
                        title: 'Final Product Price', field: 'price'
                    },
                    {
                        title: 'Product Offer Type', field: 'offertype'
                    },
                    {
                        title: 'Product Offer Price', field: 'offerprice'
                    },
                    // {
                    //     title: 'Final Product Description', field: 'description'
                    // },
                    {
                        title: 'Final Product Stock', field: 'stock'
                    },
                    {
                        title: 'Final Product Picture',
                        render: rowData => <img style={{ width: 50, height: 50, borderRadius: 10 }} src={`${ServerURL}/images/${rowData.picture}`} />
                    }
                ]}
                data={finalProductList}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Final Product',
                        onClick: (event, rowData) => handleClickOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product',
                        onClick: (event, rowData) => handleDeleteFinalProduct(rowData)
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
            {finalProductDialog()}
        </div>

    )




}