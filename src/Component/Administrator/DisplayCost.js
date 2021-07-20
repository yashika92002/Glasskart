import React, { useState, useEffect } from "react"
import { TextField, Grid, Button} from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';
import { getData, postDataAndImage,postData,ServerURL } from "../FetchNodeServices";
import Swal from 'sweetalert2';
import { isDigits, isNumber, isEmpty } from "../Checks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MaterialTable from "material-table"
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

  export default function DisplayCost() {
    var classes = useStyles()
    const [priceList, setPriceList] = useState([])
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [open, setOpen] = React.useState(false);
    const [priceId , setPriceId] = useState('')

    const fetchAllPrice = async () => {
      var list = await getData("price/fetchallprice")
      setPriceList(list.data)
    }
  
    useEffect(function () {
      fetchAllPrice()
    }, [])

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
            toastMessage("Please enter the Price!")
          } else {
            if (!isNumber(minPrice)) {
              err = true ;
              toastMessage("Please Enter Numbers only!")
            }
          }
          if (isEmpty(maxPrice)) {
            err = true;
            toastMessage("Please enter the Price!")
          } else {
            if (!isNumber(maxPrice)) {
              err = true;
              toastMessage("Please Enter Numbers only!")
            }
          }
       
        
        if (!err) {
          var body = { "priceid": priceId, "minprice": minPrice, "maxprice": maxPrice }
          var result = await postData('price/updatepricedata', body)
    
          if (result) {
            Swal.fire({
              imageWidth: 200,
              imageUrl: '/glasscart.png',
              title: 'GlassKart.com',
              text: 'Price Updated Successfully'
            })
          }
          else {
            Swal.fire({
              imageWidth: 200,
              imageUrl: '/glasscart.png',
              title: 'GlassKart.com',
              text: 'Fail to update price'
            })
          }
          setOpen(false)
        }
        fetchAllPrice()
      }
      const handleDeletePrice=async(data)=>{
    var body={priceid:data.priceid}
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
        var result=await postData("price/deleteprice",body)
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
          'Your record is safe :)',
          'error'
        )
      }
      fetchAllPrice()
    })
    
      }
    
      const handleClickOpen = (data) => {
        setPriceId(data.priceid)
        setMinPrice(data.minprice)
        setMaxPrice(data.maxprice)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const priceDialog = () => {
        return (
          <div>
          
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title"> <div style={{ width: 480 }}>
                <div style={{ fontSize: 20, fontWeight: "bold", letterSpacing: 1, }}>
                  <span><img src="/glasscart.png" width="40" /></span><span>Edit Price</span>
                </div>
    
              </div></DialogTitle>
              <DialogContent>
                <div className={classes.droot}>
                  <div className={classes.dsubdiv}>
    
    
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField variant="outlined" label="Minimum Price" fullWidth value={minPrice}
                          onChange={(event) => setMinPrice(event.target.value)}
                        />
                      </Grid>

                      <Grid item xs={6}>
                        <TextField variant="outlined" label="Maximum Price" fullWidth value={maxPrice}
                          onChange={(event) => setMaxPrice(event.target.value)}
                        />
                      </Grid>
                      
    
                      
                      <Grid item sm={12}>
                        <Button style={{ background: "#22a6b3" }} fullWidth variant="contained" color="primary" onClick={() => handleSubmit()}>Edit Price</Button>
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
    
    
            title="😎Our Prices"
            columns={[
              { title: 'ID', field: 'priceid' },
              {
                title: 'Minimum Price',
                render: rowData => <div><b>{rowData.minprice}</b></div>
              },
              {
                title: 'Maximum Price',
                render: rowData => <div><b>{rowData.maxprice}</b></div>
              }
            ]}
            data={priceList}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Price',
                onClick: (event, rowData) => handleClickOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Price',
                onClick: (event, rowData) => handleDeletePrice(rowData)
              }
            ]}
          />
    
        )
      }
      return (
    
        <div className={classes.root}>
          <div className={classes.subdiv}>
            {SimpleAction()}
          {priceDialog()}
          </div>
        </div>
    
      )
    }