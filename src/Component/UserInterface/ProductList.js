import React, { useState, useEffect } from 'react';
import Header from './Header';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { getData, postData, postDataAndImage, ServerURL } from "../FetchNodeServices";
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Height } from '@material-ui/icons';
import ProductComponent from './ProductComponent';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({

}))
const listAttributes = [{ Key: 1, Attr: 'Shape' }, { Key: 2, Attr: 'FrameType' }, { Key: 3, Attr: 'Size' }, { Key: 4, Attr: 'Color' }, { Key: 5, Attr: 'Material' }, { Key: 6, Attr: 'Gender' }, { Key: 7, Attr: 'Price' }, { Key: 8, Attr: 'Sorting' }, { Key: 9, Attr: 'Reset' }]


export default function ProductList(props) {
  const [myAnchorEl, setMyAnchorEl] = React.useState(null);
  const [keyAttr, setKeyAttr] = useState("");
  const [listShape, setListShape] = useState([]);
  const [frameList, setFrameList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [materialList, setMaterialList] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [size, setSize] = useState([]);
  const [gender, setGender] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [products, setProducts] = useState([]);


  const displayProducts = () => {
    return products.map((item) => {
      return (

        <ProductComponent product={item} history={props.history} />
      )

    })

  }

  const fetchAllProducts = async () => {
    var body = { gender: props.location.state.gender, categoryid: props.location.state.categoryid }
    var result = await postData("product/fetchallproductsbygender", body);
    setProducts(result.data)
  }

  const fetchAllShapes = async () => {

    var result = await getData("shape/fetchallshape");
    var shapesdata = {}
    result.data.map((item) => {
      shapesdata[item.shapeid] = { ...item, chkstatus: false }

    })

    console.log(shapesdata)
    setListShape(shapesdata)
  }

  const fetchAllFrames = async () => {
    var result = await getData('frame/fetchallframe')
    var framesdata = {}
    result.data.map((item) => {
      framesdata[item.frameid] = { ...item, chkstatus: false }

    })


    console.log(framesdata)
    setFrameList(framesdata)
  }

  const fetchAllSize = () => {
    var list = [{ 'sizeid': 's', 'size': "Small" }, { 'sizeid': 'm', 'size': "Medium" }, { 'sizeid': 'l', 'size': "Large" }]
    var sizedata = {}
    list.map((item) => {
      sizedata[item.sizeid] = { ...item, chkstatus: false }
    })
    setSize(sizedata)
  }

  const fetchAllGender = () => {
    var list = [{ 'genderid': 'm', 'gender': "Male" }, { 'genderid': 'f', 'gender': "Female" }]
    var genderdata = {}
    list.map((item) => {
      genderdata[item.genderid] = { ...item, chkstatus: false }
    })
    setGender(genderdata)
  }


  const fetchAllColor = async () => {
    var result = await getData('color/fetchallcolor')
    var colordata = {}
    result.data.map((item) => {
      colordata[item.colorid] = { ...item, chkstatus: false }

    })

    console.log(colordata)
    setColorList(colordata)
  }

  const fetchAllMaterial = async () => {
    var result = await getData('material/fetchallmaterial')
    var materialdata = {}
    result.data.map((item) => {
      materialdata[item.materialid] = { ...item, chkstatus: false }

    })

    console.log(materialdata)
    setMaterialList(materialdata)
  }

  const fetchAllPrice = async () => {
    var result = await getData('price/fetchallprice')
    var pricedata = {}
    result.data.map((item) => {
      pricedata[item.priceid] = { ...item, chkstatus: false }

    })

    console.log(pricedata)
    setPriceList(pricedata)
  }

  const subMenu = (key) => {
    switch (key) {
      case '1':

        return Object.values(listShape).map((item) => {
          return (
            <FormGroup>
              <MenuItem style={{ display: 'flex', flexDirection: "row" }}
                value={item.shapeid} >


                <FormControlLabel
                  control={<Checkbox checked={item.chkstatus} onChange={(event) => handleShapeChange(event, item)} />}
                  label={item.shapename}
                />
              </MenuItem>
            </FormGroup>
          )
        })

      case '2':

        return Object.values(frameList).map((item) => {
          return (
            <FormGroup>
              <MenuItem style={{ display: 'flex', flexDirection: "row" }}
                value={item.frameid}>
                <FormControlLabel
                  control={<Checkbox checked={item.chkstatus} onChange={(event) => handleFrameChange(event, item)} />}
                  label={item.framename}
                />

              </MenuItem>
            </FormGroup>
          )
        })

      case '3':

        return Object.values(size).map((item) => {
          return (
            <FormGroup>
              <MenuItem style={{ display: 'flex', flexDirection: "row" }}
                value={item.sizeid}>
                <FormControlLabel
                  control={<Checkbox checked={item.chkstatus} onChange={(event) => handleSizeChange(event, item)} />}
                  label={item.size}
                />

              </MenuItem>
            </FormGroup>
          )
        })

      case '4':

        return Object.values(colorList).map((item) => {
          return (
            <FormGroup>
              <MenuItem style={{ display: 'flex', flexDirection: "row" }}
                value={item.colorid}>
                <FormControlLabel
                  control={<Checkbox checked={item.chkstatus} onChange={(event) => handleColorChange(event, item)} />}
                  label={item.colorname}
                />
              </MenuItem>
            </FormGroup>
          )
        })

      case '5':

        return Object.values(materialList).map((item) => {
          return (
            <FormGroup>
              <MenuItem style={{ display: 'flex', flexDirection: "row" }}
                value={item.materialid}>
                <FormControlLabel
                  control={<Checkbox checked={item.chkstatus} onChange={(event) => handleMaterialChange(event, item)} />}
                  label={item.materialname}
                />
              </MenuItem>
            </FormGroup>
          )
        })

      case '6':
        return Object.values(gender).map((item) => {
          return (
            <FormGroup>
              <MenuItem style={{ display: 'flex', flexDirection: "row" }}
                value={item.genderid}>
                <FormControlLabel
                  control={<Checkbox checked={item.chkstatus} onChange={(event) => handleGenderChange(event, item)} />}
                  label={item.gender}
                />

              </MenuItem>
            </FormGroup>
          )
        })

      case '7':

        return Object.values(priceList).map((item) => {
          return (
            <FormGroup>
              <MenuItem style={{ display: 'flex', flexDirection: "row" }}
                value={item.priceid}>

                <FormControlLabel
                  control={<Checkbox checked={item.chkstatus} onChange={(event) => handlePriceChange(event, item)} />}
                  label={item.minprice + ' to ' + item.maxprice}
                />
              </MenuItem>
            </FormGroup>
          )
        })
    }


  }

  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setKeyAttr(event.currentTarget.value);

  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const handleShapeChange = (event, item) => {
    var obj = listShape
    obj[item.shapeid]['chkstatus'] = event.currentTarget.checked
    setListShape(obj)
    setRefresh(!refresh)
  };

  const handleFrameChange = (event, item) => {
    var obj = frameList
    obj[item.frameid]['chkstatus'] = event.currentTarget.checked
    setFrameList(obj)
    setRefresh(!refresh)
  };
  const handleColorChange = (event, item) => {
    var obj = colorList
    obj[item.colorid]['chkstatus'] = event.currentTarget.checked
    setColorList(obj)
    setRefresh(!refresh)
  };

  const handleSizeChange = (event, item) => {
    var obj = size
    obj[item.sizeid]['chkstatus'] = event.currentTarget.checked
    setSize(obj)
    setRefresh(!refresh)
  };

  const handleGenderChange = (event, item) => {
    var obj = gender
    obj[item.genderid]['chkstatus'] = event.currentTarget.checked
    setGender(obj)
    setRefresh(!refresh)
  };

  const handleMaterialChange = (event, item) => {
    var obj = materialList
    obj[item.materialid]['chkstatus'] = event.currentTarget.checked
    setMaterialList(obj)
    setRefresh(!refresh)
  };

  const handlePriceChange = (event, item) => {
    var obj = priceList
    obj[item.priceid]['chkstatus'] = event.currentTarget.checked
    setPriceList(obj)
    setRefresh(!refresh)
  };



  const attrMenu = () => {
    return listAttributes.map((item) => {
      return (<Button
        onClick={(event) => handleMyMenuClick(event)}

        value={item.Key} endIcon={<ArrowDropDownIcon />} aria-controls="simple-menu" aria-haspopup="true">
        {item.Attr}
      </Button>)
    })
  }
  useEffect(function () {
    fetchAllColor()
    fetchAllFrames()
    fetchAllMaterial()
    fetchAllPrice()
    fetchAllShapes()
    fetchAllSize()
    fetchAllGender()

    displayProducts()
  }, []);
  useEffect(function () {
    fetchAllProducts();
  }, [props.location.state.gender, props.location.state.categoryid]);
  return (
    <div>
      <Header history={props.history} />
      <div style={{ marginTop: 30, display: 'flex', justifyContent: "space-evenly", alignItems: "center" }}>
        {attrMenu()}
        <Menu
          id="simple-menu"
          anchorEl={myAnchorEl}
          keepMounted
          open={Boolean(myAnchorEl)}
          onClose={handleMyMenuClose}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>

          {subMenu(keyAttr)}

        </Menu>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: "wrap", padding: 20, justifyContent: 'space-evenly' }}>
        {displayProducts()}
      </div>
      <Footer />
    </div>
  )
}