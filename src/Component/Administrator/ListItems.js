import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddStoreCity from './AddStoreCity';
import DisplayAllStores from './DisplayAllStores';
import AddCategory from './AddCategory';
import DisplayAllCategory from './DisplayAllCategory';
import AddPrice from './AddPrice';
import DisplayCost from './DisplayCost';
import AddFrameType from './AddFrameType';
import DisplayFrameType from './DisplayFrameType';
import AddColor from './AddColor';
import DisplayColor from './DisplayColor';
import AddMaterial from './AddMaterial';
import DisplayMaterial from './DisplayMaterial';
import AddShape from './AddShape';
import DisplayShape from './DisplayShape';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import AddProduct from './AddProduct';
import AddFinalProduct from './AddFinalProduct';
import DisplayProduct from './DisplayProduct';
import DisplayMainPage from '../UserInterface/DisplayMainPage';
import DisplayFinalProduct from './DisplayFinalProduct';
import DispalyProductPicture from './DispalyProductPicture';
import CategoryIcon from '@material-ui/icons/Category'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import StoreIcon from '@material-ui/icons/Store'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
export default function ListItems(props) {
  const classes = useStyles();

  const handleClick=(v)=>{
   props.setComponent(v)
  }

  return (
    <div>
      <div>
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {/* <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem> */}
        <Accordion>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Stores</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>


            

              <ListItem button  onClick={()=>handleClick(<DisplayAllStores setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Stores" />
              </ListItem>

            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel2a-header"
          >
            <Typography className={classes.heading}>Attributes</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>


              <ListItem button  onClick={()=>handleClick(<DisplayAllCategory setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DisplayFrameType setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Frame Type" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DisplayColor setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <ColorLensIcon />
                </ListItemIcon>
                <ListItemText primary="Color" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DisplayShape setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Shapes" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DisplayMaterial setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Material Type" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DisplayCost setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Price" />
              </ListItem>

            </Typography>
          </AccordionDetails>
        </Accordion>


        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography className={classes.heading}>Products</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>


              <ListItem button onClick={()=>handleClick(<DisplayProduct setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DisplayFinalProduct setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Final Products" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DispalyProductPicture setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="Product Pictures" />
              </ListItem>

              <ListItem button  onClick={()=>handleClick(<DisplayMainPage setComponent={props.setComponent}/>)}>
                <ListItemIcon>
                  <StoreIcon />
                </ListItemIcon>
                <ListItemText primary="MainPage Pictures" />
              </ListItem>

            </Typography>
          </AccordionDetails>
        </Accordion>


      </div>


    </div>
  )
}