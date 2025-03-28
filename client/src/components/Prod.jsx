import React, { useState } from 'react'

export default function Prod({ prods }) {
    const [singlePgDisplay, setSinglePgDisplay] = useState(false)
    return (
        <div className='prodCard'>
            <img className='pcImg' width={'300px'} height={'200px'} src={prods.img} alt={prods.productName} onClick={() => setSinglePgDisplay(!singlePgDisplay)} />
            <h3 className='pcH3'>{prods.productName}</h3>
            <div className="desc">
                <p>{prods.dynamicFields.price} Rs.</p>
                <div className="opts">
                    <button className="btn">Buy</button>
                    <i className='fas fa-cart-shopping'></i>
                    <i className='fa-regular fa-heart'></i>
                </div>
            </div>

            {singlePgDisplay &&
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
                                <button className="spOptsBtn">Buy Now</button>
                                <button className="spOptsBtn spOptsBtn2">Add to Cart</button>
                                {/* <i className='fas fa-cart-shopping'></i>
                                <i className='fa-regular fa-heart'></i> */}
                            </div>

                            <div className="spRating">
                                {[...Array(4)].map((a,k)=>(
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


                        <i onClick={() => setSinglePgDisplay(!singlePgDisplay)} className='fas fa-close spClose'></i>
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
            }
        </div>
    )
}
