import React from 'react';
import StarRatings from 'react-star-ratings';


function HotelCard({hotel}) {
    return (

<div key={hotel.id} className='hotelcard'>
                    <div className='hoteldata'>
                        <h2>{hotel.name}</h2>
                        <StarRatings
                            rating={hotel.rating}
                            starRatedColor="rgb(219, 176, 4)"
                            starEmptyColor='rgba(0,31,51,0.6)'
                            numberOfStars={5}
                            name='rating'
                            starDimension='40px'
                            starSpacing='5px'
                        />
                        <br></br><br></br>
                        <p>${hotel.price}</p>
                    </div>
                    <div>
                    <img src={hotel.image} className='hotelimage' alt={hotel.name} />
                    </div>
                </div>
    )
}

export default HotelCard;