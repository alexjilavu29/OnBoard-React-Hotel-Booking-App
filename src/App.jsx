import React, { useState, useEffect } from 'react';
import './resources/css/App.css';
import './resources/css/header.css';
import './resources/css/introduction.css';
import './resources/css/ourhotels.css';
import './resources/css/description.css';
import './resources/css/whybookwithus.css';
import './resources/css/booknow.css';
import './resources/css/footer.css';
import plane_logo from './resources/images/avionwhite.png';
import beach from './resources/images/beach.jpg';
import hotel from './resources/images/hotel.jpg';
import room from './resources/images/room.jpg';
import sun from './resources/images/sun.png';
import beachsunset from './resources/images/beachsunset.jpg';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import hotels from './data/hotels.json';
import advantages from './data/advantages.json';
import HotelCard from './HotelCard';
import AdvantageCard from './AdvantageCard';


function App() {

    const[guestName,setGuestName] = useState();

    const[selectedHotel,setSelectedHotel]= useState("");

    const [date, setDate] = useState(() => {
        const current = new Date();
        const year = current.getFullYear();
        const month = (current.getMonth() + 1).toString().padStart(2, '0');
        const day = current.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    });

    const[numberOfNights,setNumberOfNights]=useState(10);

    const [numberOfGuests, setNumberOfGuests] = useState(2);

    const[breakfast,setBreakfast] = useState(false);

    const [totalPrice, setTotalPrice] = useState(hotels.price);

    useEffect(() => {

        let totalPriceCalc = 0;

        if(selectedHotel){
        totalPriceCalc = selectedHotel.price * numberOfNights * numberOfGuests;

        if (breakfast) {
            totalPriceCalc = totalPriceCalc + selectedHotel.breakfast * numberOfNights * numberOfGuests;
        }
    }
        setTotalPrice(totalPriceCalc);
    }, [numberOfNights, numberOfGuests, selectedHotel, breakfast]);


    const dateObject = new Date(date);

    const arrivalDate = new Date(dateObject.getTime());
        arrivalDate.setDate(arrivalDate.getDate() + parseInt(numberOfNights));



    const [error, setError] = useState('');

    const [guestNameError, setGuestNameError] = useState(false);
    const [hotelError, setHotelError] = useState(false);
    

    useEffect(() => { if (guestName) { setError(''); }}, [guestName]);    

    useEffect(() => { if (selectedHotel) { setError(''); }}, [selectedHotel]); 

    const handleSubmit = (e) => {e.preventDefault();

        let validForm = true;
        
        if(!selectedHotel)
        {   setError('No hotel selected.');
        setHotelError(true);
        validForm = false;
        }else {
            setHotelError(false);
        }

        
        if(!guestName)
        {   setError('No guest name provided.');
            setGuestNameError(true);
            validForm = false;
    
        }else {
            if (!/^[A-Z a-z]+$/.test(guestName)) {
                setGuestNameError(true);
                validForm = false;
                setError('The guest name can only contain letters and spaces.'); 
            }else {
                setGuestNameError(false);
            }
        }
        

        if (!validForm) {
        alert("Form is not valid. Please correct the errors and try again.");
        return;
        }

        const data = { guestName, selectedHotel: selectedHotel ? selectedHotel.name : '', date, numberOfNights, numberOfGuests, breakfast, totalPrice};

        const message = `Thank you, ${guestName}! Your reservation at ${data.selectedHotel} has been confirmed. ` +
    `Your stay will begin on ${dateObject.toLocaleDateString()} and end on ${arrivalDate.toLocaleDateString()}. ` +
    `We wish you a pleasant stay!`;

    alert(message);
    };

     const currentyear = new Date().getFullYear();

  return (
    
    <div className="App">
      <header className="grid headerFixed" >

       <div className='logo'>  <a href="#home" >
            <img src={plane_logo} className='headerimage' alt="onboard_logo"/>
            </a></div>

        <div className="navlist"> 
        <a className='buttona' href="#home"><div className='buttondiv'>Home</div></a>
        <a className='buttona' href="#ourhotels"><div className='buttondiv'>Our Hotels</div></a>
        <a className='buttona' href="#whybookwithus"><div className='buttondiv'>Why book with us?</div></a>
        <a className='buttona booknowbutton' href="#booknow"><div className='buttondiv booknowbuttondiv'>Book now!</div></a>
        </div>
      </header>
      <main>
        <section className='introduction' id='home'>
          <Carousel autoPlay interval={3000} infiniteLoop useKeyboardArrows showThumbs={false} >
              <div>
                  <img src={beach} className='image' alt="beach" />
              </div>
              <div>
                  <img src={hotel} className='image' alt="hotel" />
              </div>
              <div>
                  <img src={room} className='image' alt="room" />
              </div>
          </Carousel>
          <a href="#booknow"><button href="#booknow" className='introductionbutton'>Book your dream hotel today!</button> </a>
          <h1>Discover your dreams with us. OnBoard!</h1>
        </section>

        <section className='sectiontitle' id='ourhotels'><div><h1>Trending Holiday Destinations</h1></div>
        <div><p>| Discover some of our most popular tourist destinations for an incredible experience.</p>
        </div></section>
        <section className='ourhotels' >
            <div className='gridhotels'>
            {hotels.map(hotel => (
                 <HotelCard hotel={hotel} />
            ))}
            </div>
        </section>
        
        <section className='description'>
         <img src={beachsunset} className='descriptionimage' alt="beachsunset"/>
         <img src={sun} className='descriptionsun' alt="sun"/>
            <p className='descriptiondata'>Welcome to <b>OnBoard</b>, your passport to a world of unforgettable stays. <br></br>
            We bring together an unparalleled collection of luxury, boutique, and unique hotels from around the globe, 
            all at the click of a button. With us, it's not just about booking a room; it's about immersing yourself 
            in a new destination. Our handpicked hotels are more than just a place to sleep - they are experiences in 
            themselves, each with its own unique story to tell. <br></br><br></br>Whether you're dreaming of a relaxing beachside resort,
             a chic city-center boutique, a quaint countryside inn, or a luxurious five-star hotel, we have you covered. </p>
        </section>


        <section className='sectiontitle' id='whybookwithus'><div><h1>Why book with us?</h1></div>
        <div><p>| Here are some of the advantages of choosing our service for your dream vacation.</p>
        </div></section>
        <section className='whybookwithus' >
        <div className='gridadvantages'>
        {advantages.map(advantage => (
                <AdvantageCard advantage={advantage} />
            ))}
            </div>
        </section>

        <section className='sectiontitle' id='booknow'><div><h1>Book now!</h1></div>
        <div><p>| Why wait? Jump right in and be one step closer to your dream relaxation experience!</p>
        </div></section>
        <section className='booknow' >
            <div className='divbooknow'>
            <form action="">
                <div className='divform'>
                    <div className='divfirst'>
                        <div className='divfirstform'>
                            {error && <div style={{color: 'red'}}>{error}</div>}
                            
                            <h2>1. Hotel Selection</h2>
                            <label for="guestname"> Guest's Full Name</label>
                            <input type="text" id="guestname" className={guestNameError ? 'invalid' : ''} name="guestname" placeholder='Enter Full Name' maxLength="25" value={guestName} onChange={e => setGuestName(e.target.value)} required></input>
                            
                            
                            <label for="hotelselect"> Preferred hotel</label> 
                            <select name="hotelselect" id="hotelselect" className={hotelError ? 'invalid' : ''} value={selectedHotel.name ? selectedHotel.name : ''} onChange={e => setSelectedHotel(hotels.find(hotel => hotel.name === e.target.value))} required>
                            <option value="none" selected  hidden>Choose a hotel</option>
                                {hotels.map(hotel => (
                                    <option value={hotel.name}>{hotel.name}</option>
                                ))}
                            </select>


                            <h2>2. Reservation Details</h2>
                            <div className='divresdetails'>
                                    <div>
                            <label for="checkin"> Check-in date</label>
                            <input type="date" required min={date} value={date} onChange={e => setDate(e.target.value)} id="checkin"/>
                                    </div>
                                    <div>
                            <label for="nightsselect"> Number of nights </label> 
                            <select name="nightsselect" id="nightsselect" value={numberOfNights} onChange={e => setNumberOfNights(e.target.value)} required>
                                <option value="3">3</option>
                                <option value="7">7</option>
                                <option value="10" selected>10</option>
                                <option value="14">14</option>
                                <option value="30">30</option>
                            </select>
                                </div>
                            </div>

                            <label for="numberofguests"> Number of guests </label> 
                            <input type="range" className='custom-range' min="1" max="3" value={numberOfGuests}  required onChange={e => setNumberOfGuests(e.target.value)} id="numberofguests" />
                            
                            
                            <label for="breakfast"> Do you want breakfast included?  </label>
                            <input type="checkbox" id="breakfast" name="breakfast" checked={breakfast} onChange={e => setBreakfast(e.target.checked)}/>
                            
                        </div>
                    </div>
                    
                    <div className='divsecond'>
                        <div className='divsecondform'>  
                            <h2>Reservation Summary</h2>
                            <h3><i>{guestName ? guestName: "No name given"}{guestName && selectedHotel ? "'s booking at the " : "   |   "}{selectedHotel ? selectedHotel.name : 'No hotel selected'}</i></h3>
                            <ul>
                                <li>{numberOfGuests==1 ? "One guest " : (numberOfGuests==2 ? "Two guests " : "Three guests ")}visiting</li>
                                <li>Check-in Date: {date}</li>
                                <li>Staying for {numberOfNights} nights</li>
                                <li>{breakfast ? 'Breakfast included' : 'Breakfast not included'}</li>
                                <li><b>The total price will be : ${totalPrice}</b></li>
                            </ul>
                            <button className='formsubmit' type="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </section>
      </main>
      <footer>
            <p>All rights reserved © {currentyear} OnBoard</p>
      </footer>
    </div>
  );
}

export default App;
