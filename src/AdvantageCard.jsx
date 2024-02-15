import React from 'react';


function AdvantageCard({advantage}) {
    return (

<div key={advantage.id} className='advantagecard'>
                    <div className='advantageimagediv'>
                    <img src={advantage.image} className='advantageimage' alt={advantage.title} />
                    </div>
                    <div className='advantagedata'>
                        <h2>{advantage.title}</h2>
                        <p>{advantage.description}</p>
                    </div>
                </div>
    )}

export default AdvantageCard;