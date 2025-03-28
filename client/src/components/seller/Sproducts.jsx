


import React, { useState, useEffect, useRef } from 'react';
import Loading from '../Loading';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";




function Fullpage({ prods, setSinglePgDisplay }) {
  return (
    <>


      <div className='prodSingPg'>
        <div className='spF1'>
          <div className='spImg'>
            <img src={prods.img} alt="" />
          </div>
          <div className="spInfo">
            <div className='spInfoHeader'>
              <h3 style={{ paddingLeft: '0px!important' }}>
                {prods.productName}
              </h3>
              <span className='pcBadge'>

                {prods.category}
              </span>

            </div>
            <div className='spInfoDesc'>
              {<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quaerat ducimus fuga beatae, explicabo quidem quae nam corrupti repellat et.</p>}
            </div>
            <div className="spInfoVals">
              <h1>
                ₹{prods.dynamicFields.price}
              </h1>
              <p className='pcBadge2'>
                &nbsp;
                <i className="fa-regular fa-square-check"></i>
                &nbsp;
                <b>
                  {prods.dynamicFields.availability}
                </b>
                &nbsp;Units Left...&nbsp;
              </p>
              <p className='pcBadge2'><i className='fas fa-tags'></i>&nbsp;Offers&nbsp;</p>
            </div>
            {/* {prods.ageGroup}
                            {prods.pages}
                            {prods.publisher} */}
            {prods.applicationMethod && <div className="spInfoUsage">
              {prods.applicationMethod}
            </div>}

            <div className="spInfoDetails">
              {prods.brand && <span className='spOtBadge'>
                {prods.brand}
              </span>}
              {prods.warranty && <span className='spOtBadge'>
                {prods.warranty}
              </span>}
              {prods.model && <span className='spOtBadge'>
                {prods.model}
              </span>}
              {prods.color && <span className='spOtBadge'>
                {prods.color}
              </span>}
            </div>
            <div className="spOpts">
              <button className="spOptsBtn">Edit</button>
              <button className="spOptsBtn spOptsBtn2">Delete</button>
              {/* <i className='fas fa-cart-shopping'></i>
                                <i className='fa-regular fa-heart'></i> */}
            </div>

            <div className="spRating">
              {[...Array(4)].map((a, k) => (
                <i key={k} className='fas fa-star'></i>)
              )}
              <i className='fa-regular fa-star'></i>
              <span> &nbsp; 4.5 &nbsp;</span>
              <span className='pcBadge2'> &nbsp; Best Selling &nbsp;</span>
            </div>

            <div className="spFooter">
              <span className=''>
                &nbsp;In Stock&nbsp;<i className='fas fa-boxes-packing'></i>
              </span>
            </div>


          </div>


          <i onClick={() => setSinglePgDisplay((prev) => !prev)} className='fas fa-close spClose'></i>
        </div>

        {/* <div className='spF1'>
                        <div className="spImg">
                          
                                                   </div>
                        <div className="spInfo">
                           
                            <div className="spOpts">
                                <button className="spOptsBtn">Buy Now</button>
                                <i className='fas fa-cart-shopping'></i>
                                <i className='fa-regular fa-heart'></i>
                            </div>
                        </div>
                    </div> */}

      </div>

    </>
  )
}

export default function Sproducts({ searchQuery, searchRes, sid }) {
  const [products, setProducts] = useState([]);
  const [sortedOrder, setSortedOrder] = useState(false)
  const [recentOrder, setRecentOrder] = useState(false)
  const [showSortOpts, setShowSortOpts] = useState(false)
  const [showCatOpts, setShowCatOpts] = useState(false)
  const [showAvailabilitySlider, setShowAvailabilitySlider] = useState(false)
  const [showPriceSlider, setShowPriceSlider] = useState(false)

  const [editingIndex, setEditingIndex] = useState(null);
  const [editableFields, setEditableFields] = useState({
    price: null,
    availability: null,
  });


  const [pgNos, setPgNos] = useState(20);
  const [currentPg, setCurrentPg] = useState(1);
  const paginationRef = useRef(null);

  const [choosenCategory, setChoosenCategory] = useState([])
  const [priceMin, setPriceMin] = useState()
  const [priceMax, setPriceMax] = useState()
  const [minAvailable, setMinAvailable] = useState()
  const [maxAvailable, setMaxAvailable] = useState()



  const [singlePgDisplay, setSinglePgDisplay] = useState(false)
  const [spProd, setSpProd] = useState({})

  useEffect(() => {
    let isMounted = true; // Track if the component is mounted
    const fetchData = async () => {
      try {
        // await new Promise((_) => setTimeout(_, 0));
        const res = await fetch("https://gcrneuratechserver.vercel.app/seller/viewsproducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sid,
            page: currentPg,
            limit: 9,
            sortAtoZ: sortedOrder,
            recent: recentOrder,
            category: choosenCategory,
            priceMin,
            priceMax,
            minAvailable,
            maxAvailable,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            console.log(data);
            // console.log(data.products[0]._id);
            setProducts(data.products);
            setPgNos(data.pagination.totalPages);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [currentPg, sortedOrder, recentOrder, priceMin, priceMax, minAvailable, maxAvailable, choosenCategory]);


  useEffect(() => {
    if (searchRes && searchRes.length != 0) {
      console.log("workeddddd....");

      setProducts(searchRes)
      setPgNos(1)
    }
  }, [searchRes])



  const handleEditClick = (index, product) => {
    setEditingIndex(index);
    setEditableFields({
      price: product.dynamicFields.price,
      availability: product.dynamicFields.availability,
    });
  };

  const handleCancelClick = () => {
    setEditingIndex(null);
    setEditableFields({
      price: null,
      availability: null,
    });
  };

  const handleSaveClick = async (id) => {
    try {
      const res = await fetch("https://gcrneuratechserver.vercel.app/seller/updateproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          dynamicFields: {
            price: editableFields.price,
            availability: editableFields.availability,
          }
        }),
      });
      if (res.ok) {
        const updatedProducts = products.map((product) =>
          product._id === id
            ? {
              ...product,
              dynamicFields: {
                ...product.dynamicFields,
                price: editableFields.price,
                availability: editableFields.availability,
              },
            }
            : product
        );
        setProducts(updatedProducts);
        setEditingIndex(null);
        setEditableFields({ price: null, availability: null });
        console.log('Product updated successfully');
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      const userConfirmed = confirm("Do you want to Delete item?");
      if (!userConfirmed) return
      const res = await fetch("https://gcrneuratechserver.vercel.app/seller/removeproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sid,
          id,
        }),
      });
      if (res.ok) {
        const filteredProducts = products.filter(
          (product) => product._id !== id
        );
        setProducts(filteredProducts);
        console.log('Product deleted successfully');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePageClick = (page) => {
    if (page >= 1 && page <= pgNos && page !== currentPg) {
      setCurrentPg(page);
    }
  };

  useEffect(() => {
    if (paginationRef.current) {
      const currentButton = paginationRef.current.querySelector(
        `.pg-button[data-index='${currentPg}']`
      );
      if (currentButton) {
        currentButton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentPg]);


  const cats = [
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
  ]




  const [priceRange, setPriceRange] = useState([0, 1000]); // Price range [min, max]
  const [availabilityRange, setAvailabilityRange] = useState([0, 100]); // Availability range [min, max]

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange); // Update price range
  };

  const handleAvailabilityChange = (newRange) => {
    setAvailabilityRange(newRange); // Update availability range
  };

  // console.log(searchQuery);


  return (
    <div className='s-products'>

      <div id="myAnchor" className="tabs">
        <div className="gp1 " >
          <a href="#" onClick={() => {
            setSortedOrder((prev) => !prev)
            setRecentOrder(false)
          }}><i className={`fas fa-arrow-down-a-z ${sortedOrder ? 'activeIt' : ''}`}></i> A to Z</a>
          <a href="#" onClick={() => {
            setRecentOrder((prev) => !prev)
            setSortedOrder(false)
          }}><i className={`fas fa-clock ${recentOrder ? 'activeIt' : ''}`}></i> Recent</a>

          <a href="#" style={{ position: 'relative' }}  >
            <span onClick={() => setShowCatOpts(!showCatOpts)}>
              <i className='fas fa-list'></i>
              &nbsp; Category
            </span>
            {showCatOpts &&
              <div className="dropDown2">
                <div>

                  {cats.slice(0, 6).map((c, idx) => (
                    <li key={idx} onClick={() => {
                      setChoosenCategory((prev) => {
                        if (prev.includes(c[0])) {
                          // Remove the category if it's already in the list
                          return prev.filter(category => category !== c[0]);
                        } else {
                          // Add the category if it's not in the list
                          return [...prev, c[0]];
                        }
                      });

                    }
                    } >  <i className={`${c[1]} ${choosenCategory.includes(c[0]) ? 'activeIt' : ''}`}></i> {c[0]}</li>
                  ))}
                </div>
                <hr style={{ opacity: 0.2, marginTop: '10px', marginBottom: '10px' }} />
                <div>
                  {cats.slice(6).map((c, idx) => (

                    <li key={idx} onClick={() => {
                      setChoosenCategory((prev) => {
                        if (prev.includes(c[0])) {
                          // Remove the category if it's already in the list
                          return prev.filter(category => category !== c[0]);
                        } else {
                          // Add the category if it's not in the list
                          return [...prev, c[0]];
                        }
                      });

                    }
                    } >  <i className={`${c[1]} ${choosenCategory.includes(c[0]) ? 'activeIt' : ''}`}></i> {c[0]}</li>
                  ))}
                </div>
              </div>}
          </a>

          {searchQuery ?
            <span className='searchBannerSP'>
              <i>Search Results for &nbsp;</i>  <strong>"{searchQuery}" &nbsp;</strong> <i className='fas fa-close cBadge' onClick={() => window.location.reload()}></i>
            </span>
            : ''}
        </div>
        <div className="gp2" >
          <a onClick={() => setShowSortOpts(!showSortOpts)} href="#"><i className='fas fa-sort'></i> Sort</a>
          {showSortOpts &&
            <div className="dropDown">
              <li className={showPriceSlider ? 'inFocus' : ''}
                onClick={() => setShowPriceSlider(!showPriceSlider)}>
                <span className='opner'><i className={`fas fa-${showPriceSlider ? 'chevron-down' : 'chevron-right'}`}></i></span>
                Price</li>
              {showPriceSlider &&
                <div style={{ width: '60%' }} >
                  <center>
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </center>
                  <Slider
                    range
                    min={0}
                    max={1000}
                    defaultValue={priceRange}
                    value={priceRange}
                    onChange={handlePriceChange}
                    allowCross={false}
                    onChangeComplete={() => {
                      // console.log('worked....');
                      setPriceMin(priceRange[0])
                      setPriceMax(priceRange[1])


                    }}
                  />

                </div>
              }
              <hr style={{ width: '80%', opacity: '0.2' }} />
              <li className={showAvailabilitySlider ? 'inFocus' : ''}
                onClick={() => setShowAvailabilitySlider(!showAvailabilitySlider)}>
                <span className='opner'><i className={`fas fa-${showAvailabilitySlider ? 'chevron-down' : 'chevron-right'}`}></i></span>
                Availability</li>
              {
                showAvailabilitySlider &&

                <div style={{ width: '60%' }}

                >
                  {availabilityRange[0]} - {availabilityRange[1]}
                  <Slider
                    range
                    min={0}
                    max={100}
                    defaultValue={availabilityRange}
                    value={availabilityRange} // Controlled by state
                    onChange={handleAvailabilityChange} // Updates state on interaction
                    allowCross={false}
                    onChangeComplete={() => {
                      setMinAvailable(availabilityRange[0])
                      setMaxAvailable(availabilityRange[1])
                    }}
                  />
                </div>

              }
            </div>}
        </div>
      </div>

      <div className="s-p-prodList">

        {products.length == 0 ? <Loading /> : <>
          <div className="s-p-myList s-p-myList-head">
            <div className="s-p-prodHeading"><h3>Prod. Name</h3></div>
            <div className=""><h3>Brands</h3></div>
            <div className="s-p-prodCat"><h3>Category</h3></div>
            <div className="s-p-prodAvalability"><h3>Availability</h3></div>
            <div className="s-p-prodDynamicFields"><h3>Price</h3></div>

            <div style={{ textAlign: 'center' }} className="s-p-prodBtns"><h3>Actions</h3></div>
          </div>
          {products?.map((prods, index) => (
            <div key={index} className="s-p-myList" >
              <div className="s-p-prodHeading  broh" onClick={() => {
                setSinglePgDisplay(!singlePgDisplay)
                setSpProd(prods)
              }} >{prods.productName}</div>
              <div className="s-p-prodHeading">{prods.brand}</div>
              <div className="s-p-prodCat">{prods.category}</div>
              <div className="s-p-prodPublisher">
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={editableFields.availability}
                    onChange={(e) =>
                      setEditableFields({ ...editableFields, availability: e.target.value })
                    }
                  />
                ) : (
                  prods.dynamicFields.availability
                )}
              </div>
              <div className="s-p-prodDynamicFields">
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={editableFields.price}
                    onChange={(e) =>
                      setEditableFields({ ...editableFields, price: e.target.value })
                    }
                  />
                ) : (
                  `₹  ${prods.dynamicFields.price}`
                )}
              </div>
              <div className="s-p-prodBtns">
                <span style={{ width: "100%", display: "flex", justifyContent: 'space-evenly' }}>
                  {editingIndex === index ? (
                    <>
                      <i
                        className='fas fa-save myPointer'
                        onClick={() => handleSaveClick(prods._id)}
                      ></i>
                      <i
                        className='fas fa-times myPointer'
                        onClick={handleCancelClick}
                      ></i>
                    </>
                  ) : (
                    <>
                      <i
                        className='fas fa-edit myPointer'
                        onClick={() => handleEditClick(index, prods)}
                      ></i>
                      <i
                        className='fas fa-trash-can myPointer'
                        onClick={() => handleDeleteClick(prods._id)}
                      ></i>
                    </>
                  )}
                </span>
              </div>

            </div>
          ))}
        </>}
        <div className="pagination"
        // ref={paginationRef}
        >
          <button
            className="prev"
            onClick={() => handlePageClick(currentPg - 1)}
          >
            <i className='fa-solid fa-chevron-left'></i> Prev
          </button>

          <div className="pgs">
            {Array.from({ length: pgNos }, (_, index) => (
              <button
                key={index + 1}
                data-index={index + 1}
                className={`pg-button ${currentPg === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageClick(index + 1)}
                style={currentPg === index + 1 ? { backgroundColor: '#007BFF', color: '#fff' } : {}}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="next"
            onClick={() => handlePageClick(currentPg + 1)}
          >
            Next <i className='fa-solid fa-chevron-right'></i>
          </button>
        </div>
      </div>


      {
        singlePgDisplay && <Fullpage prods={spProd} setSinglePgDisplay={setSinglePgDisplay} />
      }
    </div>
  );
}
