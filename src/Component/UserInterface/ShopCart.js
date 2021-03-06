import React, { useState, useEffect } from "react";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { Button } from "@material-ui/core";
export default function ShopCart(props) {
  const [value, setValue] = useState("0")

  useEffect(function () {
    setValue(props.value)
  }, [props.value])
  const handleMinus = () => {
    var v = parseInt(value)
    v--

    setValue(v)

    props.onChange(v)

  }

  const handlePlus = () => {
    var v = parseInt(value)
    v++
    setValue(v)
    props.onChange(v)

  }


  return (<div>
    {value == 0 ? <div>  <Button style={{

      background: '#50526e',
      color: '#fff',
      padding: 12,
      textAlign: 'center',
      fontFamily: 'Helvetica,sans-serif',
      fontSize: 18,
      letterSpacing: 1,
      borderRadius: 0,
      width: 300
    }}
      onClick={() => handlePlus()}
    >Add to Cart</Button></div> :
      <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 80 }}>
        <Fab onClick={() => handlePlus()} size="small" color="secondary" aria-label="add" style={{ background: "#50526e", }}>
          <AddIcon />
        </Fab>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginInline: 15, fontSize: 22, fontWeight: 'bold' }}>
          {value}
        </div>
        <Fab onClick={() => handleMinus()} size="small" color="secondary" aria-label="add" style={{ background: "#50526e", }}>
          <Remove />
        </Fab>

      </div>}

  </div>)

}
