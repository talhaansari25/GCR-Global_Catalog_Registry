







import React, { useState, useEffect, useRef } from 'react';
import Prod from './Prod';
import Loading from './Loading';
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function Products({ searchQuery, searchRes }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [pgNos, setPgNos] = useState(20);
  const [currentPg, setCurrentPg] = useState(1);
  const paginationRef = useRef(null);

  const [sortedOrder, setSortedOrder] = useState(false)
  const [recentOrder, setRecentOrder] = useState(false)
  const [showSortOpts, setShowSortOpts] = useState(false)
  const [showCatOpts, setShowCatOpts] = useState(false)
  const [showAvailabilitySlider, setShowAvailabilitySlider] = useState(false)
  const [showPriceSlider, setShowPriceSlider] = useState(false)


  const [choosenCategory, setChoosenCategory] = useState("all")
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(10000)
  const [minAvailable, setMinAvailable] = useState(0)
  const [maxAvailable, setMaxAvailable] = useState(1000)

    const [priceRange, setPriceRange] = useState([0, 1000]); // Price range [min, max]
    const [availabilityRange, setAvailabilityRange] = useState([0, 100]); // Availability range [min, max]
  
    const handlePriceChange = (newRange) => {
      setPriceRange(newRange); // Update price range
    };
  
    const handleAvailabilityChange = (newRange) => {
      setAvailabilityRange(newRange); // Update availability range
    };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://gcrneuratechserver.vercel.app/buyer/filteredproducts?category=${choosenCategory}&priceMin=${priceMin}&priceMax=${priceMax}&minAvailable=${minAvailable}&maxAvailable=${maxAvailable}&page=${currentPg}&limit=10&recent=${recentOrder?1:0}&sortAtoZ=${sortedOrder?1:0}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setProducts(result.products);
        setPgNos(result.totalPages);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchData();
  }, [currentPg, sortedOrder, recentOrder, priceMin, priceMax, minAvailable, maxAvailable, choosenCategory]);

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

  const handlePageClick = (page) => {
    if (page >= 1 && page <= pgNos && page !== currentPg) {
      setCurrentPg(page);
    }
  };


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

  return (
    <div className="prodScreen">
      <div className="prodContainer">
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
                          const categories = prev.split(",").filter(Boolean); // Split by commas and remove empty strings
                          if (categories.includes(c[0])) {
                            // Remove the category if it's already in the list
                            return categories.filter(category => category !== c[0]).join(",");
                          } else {
                            // Add the category if it's not in the list
                            return [...categories, c[0]].join(",");
                          }
                        });


                      }
                      } >  <i className={`${c[1]} ${choosenCategory.includes(c[0]) ? 'activeIt' : ''}`}></i> {c[0]}</li>
                    ))}
                  </div>
                  <div>
                    {cats.slice(6).map((c, idx) => (

                      <li key={idx} onClick={() => {
                        setChoosenCategory((prev) => {
                          const categories = prev.split(",").filter(Boolean); // Split by commas and remove empty strings
                          if (categories.includes(c[0])) {
                            // Remove the category if it's already in the list
                            return categories.filter(category => category !== c[0]).join(",");
                          } else {
                            // Add the category if it's not in the list
                            return [...categories, c[0]].join(",");
                          }
                        });


                      }
                      } >  <i className={`${c[1]} ${choosenCategory.includes(c[0]) ? 'activeIt' : ''}`}></i> {c[0]}</li>
                    ))}
                  </div>
                </div>}
            </a>
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

        <div className="prodList">
          <h2>{searchQuery && searchRes
            ? <>
              <i
                className='fas fa-arrow-left'
                style={{ cursor: 'pointer' }}
                onClick={() => window.location.reload()}
              ></i> Search Results for "{searchQuery}"
            </>
            : 'Recommended Products'}
          </h2>
          {searchQuery && searchRes ? (
            <div className="prodRow">
              {searchRes.map((prod, idx) => <Prod key={idx} prods={prod} />)}
            </div>
          ) : (
            <div className="prodRow">
              {isLoading ? <Loading /> : products.map((prod, idx) => <Prod key={idx} prods={prod} />)}
            </div>
          )}

          <div className="pagination" ref={paginationRef}>
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
      </div>
    </div>
  );
}
