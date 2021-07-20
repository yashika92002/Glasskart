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
               </Router>
          </div>
     );
}

export default App;
