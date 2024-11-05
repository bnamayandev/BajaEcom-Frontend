import React, {useState, useEffect} from 'react'
import './InventoryViewer.css'

var text = "Hello there"

// switch branches to dev.
// Feature-NameOfFeature

// [{"item_id":2,"clothing_type":"T-shirt","size":"S","quantity_available":50,"price":"0.00"},{"item_id":3,"clothing_type":"T-shirt","size":"M","quantity_available":50,"price":"0.00"},{"item_id":4,"clothing_type":"T-shirt","size":"L","quantity_available":50,"price":"0.00"}]

const InventoryViewer = () => {

  
  const redirect = (id) => (
    alert("This doesn't work yet. Go to ID #" + id)
  )

  // Main

  // Test JSON
  const json = [
    {"item_id":1,"clothing_type":"T-shirt","size":"S","quantity_available":10,"price":"3.00"},
    {"item_id":2,"clothing_type":"T-shirt","size":"M","quantity_available":20,"price":"4.00"},
    {"item_id":3,"clothing_type":"T-shirt","size":"L","quantity_available":30,"price":"5.00"},
    {"item_id":4,"clothing_type":"Pants","size":"S","quantity_available":40,"price":"2.00"},
    {"item_id":5,"clothing_type":"Pants","size":"M","quantity_available":50,"price":"3.00"},
    {"item_id":6,"clothing_type":"Pants","size":"L","quantity_available":60,"price":"4.00"},
    {"item_id":7,"clothing_type":"Pants","size":"XL","quantity_available":15,"price":"7.00"},
    {"item_id":8,"clothing_type":"Hoodie","size":"S","quantity_available":15,"price":"9.00"},
    {"item_id":9,"clothing_type":"Hoodie","size":"M","quantity_available":25,"price":"10.00"},
    {"item_id":10,"clothing_type":"Hoodie","size":"L","quantity_available":35,"price":"11.00"},
    {"item_id":11,"clothing_type":"T-shirt 2","size":"S","quantity_available":10,"price":"3.00"},
    {"item_id":12,"clothing_type":"T-shirt 2","size":"M","quantity_available":20,"price":"4.00"},
    {"item_id":13,"clothing_type":"T-shirt 2","size":"L","quantity_available":30,"price":"5.00"},
    {"item_id":14,"clothing_type":"Pants 2","size":"S","quantity_available":40,"price":"2.00"},
    {"item_id":15,"clothing_type":"Pants 2","size":"M","quantity_available":50,"price":"3.00"},
    {"item_id":16,"clothing_type":"Pants 2","size":"L","quantity_available":60,"price":"4.00"},
    {"item_id":17,"clothing_type":"Pants 2","size":"XL","quantity_available":15,"price":"7.00"},
    {"item_id":18,"clothing_type":"Hoodie 2","size":"S","quantity_available":15,"price":"9.00"},
    {"item_id":19,"clothing_type":"Hoodie 2","size":"M","quantity_available":25,"price":"10.00"},
    {"item_id":20,"clothing_type":"Hoodie 2","size":"L","quantity_available":35,"price":"11.00"},
  ]

  // Split JSON into rows
  const split_json = (json) => {
    const split = []
    var COLUMNS = 5

    for(var i = 0; i < json.length; i += COLUMNS) {
      split.push(json.slice(i,i+COLUMNS)) // JS automatically throws OOB on slice
    }
    return split;
  }

  
  const rows = split_json(json)
  
  // Filler image for now
  const img_url = "data:image/webp;base64,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"

// Main Return

// Divide into rows
return (
  <div>
    <h1 className="title" style={{paddingLeft: '20px', paddingTop: '20px'}}>Title of Page</h1>
    <br/>
    {rows.map((row, row_index) => (
      
        <div key={row_index} style={{display: 'flex', gap: '30px', marginBottom: '30px' }}>
          
          {/* Create each item */}
          {row.map(item => (
          <ul key={item.item_id} className="item-container">
          <p>Item ID: {item.item_id}</p> 
          <img src={img_url} alt="Duck." width={100}/>
          <p>Type: {item.clothing_type}</p>
          <p>Size: {item.size}</p>
          <p>Quantity Left: {item.quantity_available}</p>
          <p>Price: {item.price}</p>
          <button onClick = {() => redirect(item.item_id)}>Buy now!</button>
          <br/>
          </ul>
          
          ))}
        </div>
    ))}
  </div>
  

)

}

export default InventoryViewer