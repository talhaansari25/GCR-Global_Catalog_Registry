import { useState, useEffect, useRef } from 'react'
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import './App.css'
import Navbar from './components/Navbar'
import Crousal from './components/Crousal'
import Products from './components/Products'
import Footer from './components/Footer'
import Loading from './components/Loading'
import SideMenu from './components/SideMenu';
import SellerMain from './components/SellerMain';
import FloatingButtons from './components/FloatingButtons';
import Login from './components/Login'
import Register from './components/Register'

function App() {

  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState()
  const [searchRes, setSearchRes] = useState()

  //--------handling sid--------
  // const [sid, setSid] = useState('')


  // useEffect(() => {
  //   setSid('67790b6a10ef041401a0ec6a')
  //   console.log("sid setted for seller");
  // }, [])
  let sid = localStorage.getItem('sid') || "677bdf07dd9457b5d727c6cf";



  // for seller floating buttons
  const containerARef = useRef(null);
  const bottomMarkerRef = useRef(null);
  const [isAbsolute, setIsAbsolute] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setIsAbsolute(false); // Keep fixed
        } else {
          setIsAbsolute(true); // Switch to absolute when Container A's bottom edge reaches
        }
      },
      {
        root: null, // Observe within the viewport
        threshold: 0.1, // Trigger when a small part of the marker is visible
      }
    );

    if (bottomMarkerRef.current) {
      observer.observe(bottomMarkerRef.current);
    }

    return () => {
      if (bottomMarkerRef.current) {
        observer.unobserve(bottomMarkerRef.current);
      }
    };
  }, []);







  //====== Handling Seller State ========
  const [sellerState, setSellerState] = useState("Profile")
  const [activeSingle, setActiveSingle] = useState(true)

  useEffect(() => {
    if (searchRes && searchRes.length != 0) {

      setSellerState("Products")
    }
  }, [searchQuery])

  useEffect(() => {
    if (location.pathname === '/shop') {
      if (!localStorage.getItem('sid')) {
        navigate('/');
      }
    }
  }, []);


  return (

    <Routes>
      <Route path="/home" element={
        <>
          <Navbar setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} sid={''} />
          <div className='scrollbro'>
            <Crousal />

            {loading ? <Loading /> : <Products searchQuery={searchQuery} searchRes={searchRes} />}

            <Footer />
          </div>
        </>
      } />

      <Route path="/shop" element={
        <>
          
          <Navbar setSearchQuery={setSearchQuery} setSearchRes={setSearchRes} sid={sid} setSellerState={setSellerState}/>

          <div className='scrollbro'>
            <div className="mainContent" ref={containerARef}>
              <SideMenu setSellerState={setSellerState} sellerState={sellerState} />
              <SellerMain sid={sid} sellerState={sellerState} bottomMarkerRef={bottomMarkerRef} activeSingle={activeSingle} setActiveSingle={setActiveSingle} searchQuery={searchQuery} searchRes={searchRes} />

              <FloatingButtons isAbsolute={isAbsolute} setSellerState={setSellerState} activeSingle={activeSingle} setActiveSingle={setActiveSingle} />

            </div>
            <Footer />
          </div>
        </>
      } />

      <Route
        path="/"
        element={
          <div className="login-wrapper">
            <Login />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="register-wrapper">
            <Register />
          </div>
        }
      />



    </Routes>



  )
}

export default App
