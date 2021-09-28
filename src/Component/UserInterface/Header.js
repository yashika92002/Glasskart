import React, { useState, useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { getData, postDataAndImage } from "../FetchNodeServices";
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    // color: 'inherit',
    border: ' solid 1px #dfe6e9 '
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function Header(props) {

  

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  /////////////////////////// My Work ///////////////////////////////////////////////////
  const [listCategory, setListCategory] = useState([]);
  const [myAnchorEl, setMyAnchorEl] = React.useState(null);
  const [menuName, setMenuName] = useState("");

  const handleMyMenuClick = (event) => {
    setMyAnchorEl(event.currentTarget);
    setMenuName(event.currentTarget.value);

  };

  const handleMyMenuClose = () => {
    setMyAnchorEl(null);
  };

  const subMenu = () => {
    if (menuName == 'Eye Glasses') {
      return (<MenuItem style={{ display: 'flex', flexDirection: "row", width: 1500 }} onMouseLeave={() => setMyAnchorEl(null)}>
        <div onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Men',categoryid:1})}>
          <img src='/MenEye.jpg' width="750" />
        </div>
        <div onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Women',categoryid:1})}>
          <img src='/WomenEye.jpg' width="750" />
        </div>
      </MenuItem>)
    }
    else if (menuName == 'Sun Glasses') {
      return (<MenuItem style={{ display: 'flex', flexDirection: "row", width: 1500 }} onMouseLeave={() => setMyAnchorEl(null)}>
        <div  onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Men',categoryid:3})}>
          <img src='/MenSun.jpg' width="750" />
        </div>
        <div onClick={()=>props.history.push({pathname:'/productlist'},{gender:'Women',categoryid:3})}>
          <img src='/WomenSun.jpg' width="750" />
        </div>
      </MenuItem>)
    }
  }

  const fetchAllCategory = async () => {
    var list = await getData('category/fetchallcategories')
    setListCategory(list.data)
  }
  useEffect(function () {
    fetchAllCategory()
  }, [])

  const sirseAcchaFunctioin=(event)=>{
    if(event.currentTarget.value=="Our Story")
    {
        props.history.push({pathname:'/ourstory'})
    }
    else if(event.currentTarget.value=="Blogs")
    {
        props.history.push({pathname:'/blogs'})
    }
    else if(event.currentTarget.value=="Store Locator")
    {
        props.history.push({pathname:'/storelocator'})
    }
  }

  const mainMenu = () => {
    return listCategory.map((item) => {
      return (
      
      item.categoryname=="Sun Glasses" || item.categoryname=="Eye Glasses" ? <Button
        // onClick={(event)=>handleMyMenuClick(event)} 
        onMouseEnter={(event) => handleMyMenuClick(event)}

        value={item.categoryname} endIcon={<ArrowDropDownIcon />} aria-controls="simple-menu" aria-haspopup="true">
        {item.categoryname}
      </Button>:<Button value={item.categoryname} onClick={(event)=>sirseAcchaFunctioin(event)} >{item.categoryname}</Button>)
    })
  }


  /////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={classes.grow}>
      <AppBar position="static" color="FFF">
        <Toolbar>
          <div  style={{ padding: 5,cursor:"pointer"  }} onClick={()=>props.history.push({pathname:'/home'})}>
            <img  src='glasskart9.png' width='190' />
          </div>
          {mainMenu()}

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

            {myAnchorEl ? subMenu() : <></>}

          </Menu>

          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
         
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
