import React, { useState, useEffect } from "react";
import { getData } from "../FetchNodeServices";

export default function ProductList(props) {
  const [listShape, setListShape] = useState([]);


  const fetchAllShapes = async () => {
    var result = await getData("shape/fetchallshape");
    var shapesdata = {}
    var updatedata = result.data.map((item) => {
      shapesdata[item.shapeid] = { ...item, chkstatus: false }

    })

    console.log(shapesdata)
    setListShape(shapesdata)




    /*  var result = await getData("shape/fetchallshape");
      var updatedata=result.data.map((item)=>({...item,status:false}))

      console.log(updatedata)
      setListShape(updatedata)
      */
    /*         var data={}
             data['9301123085']={shapeid: 1, shapename: "Circle", status: false, adpicture: "7620o8iskrm0u72u.jpg"}
             data['9300003085']={shapeid: 2, shapename: "Sqaure", status: false, adpicture: "7620o8iskrm0xt41.jpg"}
    
             //var obj=data['9301123085']
             //obj.status=true
             //data['9301123085']=obj
             //or
             //data['9301123085']['status']=true
    
             console.log(data)
             var keys=Object.keys(data)
             console.log("Keys",keys)
             var values=Object.values(data)
             console.log("Values",values)
             delete data['9301123085']
             console.log(data)
    
            var obj={}
            obj['CS100']={Roll:CS100,Math:25,Eng:67,SCI:89}
            obj['CS200']={Roll:CS200,Math:44,Eng:77,SCI:99}
          */

  };
  useEffect(function () {
    fetchAllShapes()

  }, [])
  return (<div>
    this is test

  </div>)


}