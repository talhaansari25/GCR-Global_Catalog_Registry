import React from "react";
import SellerForm from "./SellerForm";
import Sproducts from "./seller/Sproducts";
import Profile from "./seller/Profile";
import Insights from "./seller/Insights";
import Drafts from "./seller/Drafts";
import Notification from "./seller/Notification";
import Support from "./seller/Support";
import Settings from "./seller/Settings";
// import Products from "./Products";

export default function SellerMain({sid,sellerState,bottomMarkerRef, activeSingle, setActiveSingle,searchQuery,searchRes}) {
  
  return (
    <>
      <div className='sellerMain'>
        
        {sellerState=="Home" && <SellerForm activeSingle={activeSingle} setActiveSingle={setActiveSingle} sid={sid}/>}
        {sellerState=="Profile" && <Profile sid={sid}/>}
        {sellerState=="Insights" && <Insights sid={sid}/>}
        {sellerState=="Products" && <Sproducts searchQuery={searchQuery} searchRes={searchRes} sid={sid}/>}
        {/* {sellerState=="Products" && <Products searchQuery={""} searchRes={[]}/>} */}
        {sellerState=="Drafts" && <Drafts/>}
        {sellerState=="Notification" && <Notification/>}
        {sellerState=="Support" && <Support/>}
        {sellerState=="Settings" && <Settings/>}

        <div ref={bottomMarkerRef} style={{ margin: "5px", height: "1px", background: "transparent" }}></div>

        
      </div>
    </>
  )
}
