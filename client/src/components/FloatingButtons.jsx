import React from 'react'

export default function FloatingButtons({isAbsolute,setSellerState,activeSingle, setActiveSingle}) {
  return (
    <div className={`floatButtons ${isAbsolute ? "absolute" : ""}`} >
        <div className='singleUpload' 
          onClick={()=>{
            setSellerState("Home");
            setActiveSingle(true);
          }}
        ><i className='fas fa-upload'></i></div>
        <div className='bulkUpload' 
          onClick={()=>{
            setSellerState("Home");
            setActiveSingle(false);
          }}
        ><i className='fas fa-file-csv'></i></div>
        <div className='updateProd' 
        onClick={()=>{
          setSellerState("Products");
        }}><i className='fas fa-pen'></i></div>
        <div className='insights' 
        onClick={()=>{
          setSellerState("Insights");
        }}><i className='fas fa-chart-simple'></i></div>
    </div>
  )
}
