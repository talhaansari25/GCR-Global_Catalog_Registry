import React, { useState } from 'react'

export default function Navbar({ setSearchQuery, setSearchRes, sid,setSellerState }) {

  const [query, setQuery] = useState('')

  const [wMsg, setWmsg] = useState(() => {
    const flag = localStorage.getItem('visited');
    if (flag) {
      return false; // If flag exists, set wMsg to false
    } else {
      localStorage.setItem('visited', 'true'); // Create the flag if it doesn't exist
      return true; // Set wMsg to true
    }
  })


  setTimeout(() => {
    setWmsg(false)
  }, 3000);

  function handleChange(e) {
    setQuery(e.target.value)
  }

  function handleSubmit() {
    // ....fetch search 
    // setResProd = api data
    if (!query) return

    const anchorElement = document.getElementById("myAnchor");
    if (anchorElement) {
      anchorElement.scrollIntoView({ behavior: "smooth" });
    }
    setSearchQuery(query)
    fetchSearchData()
    
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSubmit();
    }
  }

  function changeTab(){
    if(sid!==''){
      setSellerState("Products")
    }
  }


  const fetchSearchData = async () => {
    try {
      const res = await fetch(" https://gcrneuratechserver.vercel.app/buyer/searchp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: query,
          sid:sid
        }),
      });
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        
        setSearchRes(data.products)
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };


  return (
    <div className='navbar'>

      <div className='logo'>
        <h1>Global.Catalog.Registry</h1>
        <p><i class="fa-solid fa-bag-shopping ic"></i></p>  
        {/* <img height={50} width={50} src='https://cdn-icons-png.flaticon.com/128/4290/4290854.png' alt='logo' /> */}
      </div>

      <div className="searchBar">
        <input type="text" placeholder="Search" onClick={changeTab} onChange={(e) => handleChange(e)} onKeyDown={(e) => handleKeyDown(e)} />
        <i className='fas fa-search' onClick={handleSubmit}></i>
      </div>

      <div className='links'>
        <a href='#'><i className='fas fa-cart-shopping'></i> Cart</a>
        <a href='#'><i className='fas fa-heart'></i> Favourite</a>
        <a href='#'><i className='fas fa-user'></i> Profile</a>
      </div>


      {sid!=='' && wMsg && <div className="welcomeMsg">
        Login Successful ! Welcome to GCR...
      </div>}
    </div>
  )
}
