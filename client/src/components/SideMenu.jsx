import React from 'react'
import {useNavigate} from 'react-router-dom'


export default function SideMenu({ setSellerState, sellerState }) {

    const navigate = useNavigate()
    
    return (
        <div className='sideMenu'>
            <div className='sideMenuContainer'>
                <div id={sellerState === "Profile" && "menuActive2"} onClick={() => setSellerState("Profile")}><i className='fas fa-user'></i> Profile <span className={sellerState === "Profile" && "menuActive"} ></span> </div>
                <div id={sellerState === "Home" && "menuActive2"} onClick={() => setSellerState("Home")} ><i className={`fas fa-upload `}></i> Upload <span className={sellerState === "Home" && "menuActive"} ></span></div>
                <div id={sellerState === "Insights" && "menuActive2"} onClick={() => setSellerState("Insights")} className='insights'><i className='fas fa-chart-simple'></i> Insights<span className={sellerState === "Insights" && "menuActive"} ></span></div>
                <div id={sellerState === "Products" && "menuActive2"} onClick={() => setSellerState("Products")} className=''> <i className='fas fa-shop'></i> Products<span className={sellerState === "Products" && "menuActive"} ></span></div>
               <br />
                <center> <hr style={{width:'80%', borderColor:'var(--lmaterial)',opacity:0.7,borderRadius:'10px'}} /></center>
                <br />
                <div id={sellerState === "Drafts" && "menuActive2"} onClick={() => setSellerState("Drafts")} className=''> <i className='fas fa-file'></i> Drafts<span className={sellerState === "Drafts" && "menuActive"} ></span></div>
                <div id={sellerState === "Notification" && "menuActive2"} onClick={() => setSellerState("Notification")} className=''> <i className='fas fa-bell'></i> Notifications<span className={sellerState === "Notification" && "menuActive"} ></span></div>
                <div id={sellerState === "Support" && "menuActive2"} onClick={() => setSellerState("Support")} className=''><i className='fas fa-headset'></i> Supports<span className={sellerState === "Support" && "menuActive"} ></span> </div>
                <div id={sellerState === "Settings" && "menuActive2"} onClick={() => setSellerState("Settings")} className=''> <i className='fas fa-gear'></i> Settings<span className={sellerState === "Settings" && "menuActive"} ></span></div>
                <br />
                <center> <hr style={{width:'80%',  borderColor:'var(--lmaterial)',opacity:0.7,borderRadius:'10px'}} /></center>
                <br />
                <div onClick={async()=>{
                    await localStorage.clear()
                    navigate('/')
                }}> <i class="fa-solid fa-right-from-bracket"></i> Sign Out</div>
            </div>
        </div>
    )
}
