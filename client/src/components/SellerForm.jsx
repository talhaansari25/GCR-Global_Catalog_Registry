import React, { useState } from 'react'
import SingleUpload from './SingleUpload'
import BulkUpload from './BulkUpload'
import AddTemplate from './seller/AddTemplate'

export default function SellerForm({ activeSingle, setActiveSingle, sid }) {

  const [regular, setRegular] = useState(true)
  // let sid = localStorage.getItem('sid') || "677bdf07dd9457b5d727c6cf";


  return (
    <div className='sellerForm'>
      <div className="s-tabs">
        <li className={!activeSingle ? 's-t-active' : ''} onClick={() => {setActiveSingle(true), setRegular(true)}}> <i className='fas fa-upload'></i> Single Product Upload</li>
        <li className={activeSingle ? 's-t-active' : ''} onClick={() => {
          setActiveSingle(false), console.log("activeSingle is setted to false");
        }}> <i className='fas fa-file'></i> Multiple Product Upload</li>
      </div>
      {
        activeSingle
          ? (
            regular ? (<SingleUpload sid={sid} setRegular={setRegular} />) : <AddTemplate sid={sid} setRegular={setRegular}/>
          ) : (<BulkUpload sid={sid} />)
      }
    </div>
  )
}
