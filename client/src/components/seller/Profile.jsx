import React, { useEffect, useState } from 'react'
import Loading from '../Loading'

import profilePic from '../../assets/userProfileImg.jpg'
import profilePic2 from '../../assets/yogi.jpeg'

export default function Profile({sid}) {

  const [userData, setUserData] = useState({})


  useEffect(() => {
    let isMounted = true


    async function fetchData() {
      try {
        const res = await fetch("https://gcrneuratechserver.vercel.app/seller/sellerinfo", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sid
          })
        })

        if (res.ok) {
          const data = await res.json()
          if (isMounted) {
            console.log(data);
            setUserData(data.seller)
          }

        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
  }, [])



  useEffect(() => {
    console.log("My data: ", userData);

  }, [userData])


  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const [categoryBadges, setCategoryBadges] = useState([
    ["Electronics", "fas fa-plug"],
    ["Food", "fas fa-utensils"],
    ["Clothes", "fas fa-shirt"],
    ["Grocery", "fas fa-basket-shopping"],
    ["Books", "fas fa-book"],
    ["Kitchen", "fas fa-kitchen-set"],
    ["Stationery", "fas fa-store"],
    ["Health", "fas fa-heart-pulse"],
    ["Toys", "fas fa-car-side"],
    ["Sports", "fas fa-futbol"],
    ["Beauty", "fa-brands fa-gratipay"],
  ]);


  return (
    <>
      {
        Object.keys(userData).length === 0
          ? <Loading />
          : <div className="sProfileOutter">
            <div className="sProfileInner">
              <div className="sPI1">

                <div className="profileS psFlex">
                  <div className="piSec1">
                    <img className='bhaikaisa' src={"https://cdn-icons-png.flaticon.com/128/3135/3135715.png"} alt="" />
                  </div>
                  <div className="piSec2">
                    <h2>{userData.businessName}</h2>
                    
                    <p style={{marginBottom:'10px'}}> <span>Joined</span> <span>{formatDate(userData.createdAt)}</span></p>
                    
                    
                    <div className='infoBdg'>
                        <p>Male</p>
                        <p>45yr</p>
                        <p>Business</p>
                        <p>Buyer's Choice</p>
                    </div>
                    <p>
                      <span className='piBadge'>
                        <i className='fas fa-circle-check'></i>  Verified &nbsp;
                      </span>
                    </p>



                  </div>
                </div>


                <div className="profileS">
                  <h3><i className="fa-solid fa-bars"></i> Categories</h3>
                  <br />
                  <div className="lineUp">
                    {
                      categoryBadges.map((c, idx) => (
                        <span key={idx} className='piBadge2'><i className={c[1]}></i> &nbsp;{c[0]}&nbsp;</span>
                      ))
                    }
                  </div>
                </div>


                <div className="profileS">
                  <h3><i className='fa-regular fa-file-lines'></i> Credentials</h3>
                  <br />
                  <div className="lineUp">
                    {
                      <span className='piBadge3'> Tax Id &nbsp;<b>{userData.taxId} </b>&nbsp;<i className="fas fa-arrow-up-right-from-square"></i></span>
                    }
                    <span className='piBadge3'> Invoice &nbsp;<b>123XXX890 </b>&nbsp;<i className="fas fa-arrow-up-right-from-square"></i></span>
                  </div>

                </div>

                <div className="profileS">
                  <h3><i className='fa-regular fa-address-book'></i> Contacts</h3>
                  <br />
                  <div className='contactHolder'>
                    <div className='contactFlex'>
                      <p>E-maill <i className='fas fa-envelope'></i></p>
                      <p>
                        {userData.email}
                      </p>
                    </div>
                    <hr style={{ opacity: 0.2 }} />
                    <div className='contactFlex'>
                      <p>Contact No. <i className='fas fa-phone'></i></p>
                      <p>
                        +91 {userData.contactNumber} <br />
                        +91 {userData.businessAddress.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>



              </div>

              <div className="sPI2">
                <div className="profileS">
                  <h3><i className="fa-solid fa-map-location-dot"></i> Address</h3>
                  <br />
                  <div className="contactHolder">
                    <div className="contactFlex">
                      <p>Street  <i className="fa-solid fa-street-view"></i></p>
                      <p> {userData.businessAddress.street}</p>
                    </div>
                    <div className="contactFlex">
                      <p>City  <i className="fa-solid fa-location-dot"></i></p>
                      <p>{userData.businessAddress.city}</p>
                    </div>
                    <div className="contactFlex">
                      <p>State  <i className="fa-regular fa-map"></i></p>
                      <p>{userData.businessAddress.state}</p>
                    </div>
                    <div className="contactFlex">
                      <p>Zip Code  <i className="fa-solid fa-map-pin"></i></p>
                      <p>{userData.businessAddress.zipCode}</p>
                    </div>
                    <div className="contactFlex">
                      <p>Country  <i className="fa-solid fa-earth-asia"></i></p>
                      <p>{userData.businessAddress.country}</p>
                    </div>
                  </div>
                </div>

                <div className="profileS">
                  <h2><i className="fa-solid fa-fire"></i> Rating</h2>
                  <br />
                  <div className='ratingS'>
                    <p style={{ marginRight: '10px' }}>
                      <span style={{ fontSize: 100 }}>4.5</span>

                      <span style={{ fontSize: 40 }}>/5</span>

                    </p>

                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star"></i>
                    <i className="fa-solid fa-star-half-stroke"></i>
                  </div>
                </div>

                <div className="profileS">
                  <h3><i className="fa-solid fa-circle-info"></i> Details</h3>
                  <br />
                  <div className="detailHolder contactFlex">
                    <div className="dBoxes">
                      {/* <p>{userData.productCatalog.length}</p> */}
                      <p>5k</p>
                      <p>Total Products</p>
                    </div>
                    <div className="dBoxes">
                      <p>1.5K</p>
                      <p>Total Sales</p>
                    </div>
                    <div className="dBoxes upBadge">
                      <p>718K</p>
                      <p>Revenue Earned</p>
                      <span className='upBadgeContent'>
                        +3.2 &nbsp;<i className="fa-solid fa-arrow-trend-up"></i>
                      </span>
                    </div>
                  </div>
                </div>




              </div>



            </div>
          </div>
      }
    </>
  )
}
