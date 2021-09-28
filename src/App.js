import React from 'react'
import AddStoreCity from './Component/Administrator/AddStoreCity';
import DisplayAllStores from './Component/Administrator/DisplayAllStores';
import AddCategory from './Component/Administrator/AddCategory';
import DisplayAllCategory from './Component/Administrator/DisplayAllCategory';
import AddPrice from './Component/Administrator/AddPrice';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import DisplayCost from './Component/Administrator/DisplayCost';
import AddFrameType from './Component/Administrator/AddFrameType';
import DisplayFrameType from './Component/Administrator/DisplayFrameType';
import AddColor from './Component/Administrator/AddColor';
import DisplayColor from './Component/Administrator/DisplayColor';
import AddMaterial from './Component/Administrator/AddMaterial';
import DisplayMaterial from './Component/Administrator/DisplayMaterial';
import AddShape from './Component/Administrator/AddShape';
import DisplayShape from './Component/Administrator/DisplayShape';
import Dashboard from './Component/Administrator/Dashboard';
import AdminLogin from './Component/Administrator/AdminLogin';
import AddProduct from './Component/Administrator/AddProduct';
import AddFinalProduct from './Component/Administrator/AddFinalProduct';
import DisplayProduct from './Component/Administrator/DisplayProduct';
import DisplayFinalProduct from './Component/Administrator/DisplayFinalProduct';
import ProductPictures from './Component/Administrator/ProductPictures';
import DisplayProductPictures from './Component/Administrator/DispalyProductPicture';
import Header from './Component/UserInterface/Header';
import ProductList from './Component/UserInterface/ProductList';
import MainPage from './Component/UserInterface/MainPage';
import DisplayMainPage from './Component/UserInterface/DisplayMainPage';
import Test from './Component/UserInterface/Test';
import Home from './Component/UserInterface/Home';
import Footer from './Component/UserInterface/Footer';
import ProductView from './Component/UserInterface/ProductView';
import OurStory from './Component/UserInterface/OurStory';
import Blogs from './Component/UserInterface/Blogs';
import Signup from './Component/UserInterface/Signup';
import UserLogin from './Component/UserInterface/UserLogin';
import ShopCart from './Component/UserInterface/ShopCart';

function App(props) {
     return (
          <div>
               <Router>

                    <Route component={AddStoreCity}
                         path="/addstorecity"
                         props={props.history}
                    />

                    <Route component={DisplayAllStores}
                         path="/displayall"
                         props={props.history}
                    />

                    <Route component={AddCategory}
                         path="/addcategory"
                         props={props.history}
                    />

                    <Route component={DisplayAllCategory}
                         path="/displayallcategory"
                         props={props.history}
                    />
                    <Route component={AddPrice}
                         path="/addprice"
                         props={props.history}
                    />

                    <Route component={DisplayCost}
                         path="/displayprice"
                         props={props.history}
                    />
                   
                    <Route component={AddFrameType}
                         path="/addframetype"
                         props={props.history}
                    />
                    <Route component={DisplayFrameType}
                         path="/displayframetype"
                         props={props.history}
                    />
                    <Route component={AddColor}
                         path="/addcolor"
                         props={props.history}
                    />
                    <Route component={DisplayColor}
                         path="/displaycolor"
                         props={props.history}
                    />
                    <Route component={AddMaterial}
                         path="/addmaterial"
                         props={props.history}
                    />
                    <Route component={DisplayMaterial}
                         path="/displaymaterial"
                         props={props.history}
                    />
                     <Route component={AddShape}
                         path="/addshape"
                         props={props.history}
                    />
                    <Route component={DisplayShape}
                         path="/displayshape"
                         props={props.history}
                    />
                    <Route component={Dashboard}
                         path="/dashboard"
                         props={props.history}
                    />
                    <Route component={AdminLogin}
                         path="/adminlogin"
                         props={props.history}
                    />
                    <Route component={AddProduct}
                         path="/addproduct"
                         props={props.history}
                    />
                    <Route component={AddFinalProduct}
                         path="/addfinalproduct"
                         props={props.history}
                    />
                    <Route component={DisplayProduct}
                         path="/displayproduct"
                         props={props.history}
                    />
                    <Route component={DisplayFinalProduct}
                         path="/displayfinalproduct"
                         props={props.history}
                    />
       
               <Route component={ProductPictures}
                         path="/productpictures"
                         props={props.history}
                    />
               <Route component={DisplayProductPictures}
                         path="/displayproductpictures"
                         props={props.history}
                    />
               <Route component={Header}
                         path="/header"
                         props={props.history}
                    />     
               <Route component={ProductList}
                         path="/productlist"
                         props={props.history}
                    />      
               <Route component={MainPage}
                         path="/mainpage"
                         props={props.history}
                    />     
               <Route component={DisplayMainPage}
                         path="/displaymainpage"
                         props={props.history}
                    />   
               <Route component={Test}
                         path="/test"
                         props={props.history}
                    />    
                <Route component={Home}
                         path="/home"
                         props={props.history}
                    />  
               <Route component={Footer}
                         path="/footer"
                         props={props.history}
                    />
               <Route component={ProductView}
                         path="/productview"
                         props={props.history}
                    />     
               <Route component={OurStory}
                         path="/ourstory"
                         props={props.history}
                    />  
               <Route component={Blogs}
                         path="/blogs"
                         props={props.history}
                    />  
               <Route component={Signup}
                         path="/signup"
                         props={props.history}
                    />  
               <Route component={UserLogin}
                         path="/userlogin"
                         props={props.history}
                    />  
               <Route component={ShopCart}
                         path="/shopcart"
                         props={props.history}
                    />                                 
               </Router>
          </div>
     );
}

export default App;
