import React, { useState, useEffect } from 'react';


import axios from 'axios';
import './App.css';


import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from 'react-icons/io';

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from 'react-icons/bs';

import { TbTemperatureCelsius } from 'react-icons/tb';
import { ImSpinner8 } from 'react-icons/im';


const APIkey = 'bcf2048bc3be154bded8f277f580ba2e';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Tetouan');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    
    if (inputValue !== '') {
    
      setLocation(inputValue);
    }

    
    const input = document.querySelector('input');

  
    if (input.value === '') {
      
      setAnimate(true);
     
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }


    input.value = '';

  
    e.preventDefault();
  };


  useEffect(() => {
    
    setLoading(true);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`;

    axios
      .get(url)
      .then((res) => {
        
        setTimeout(() => {
          setData(res.data);
          setLoading(false);
        }, 1500);
      })
      .catch((err) => {
        setLoading(false);
        setErrorMsg(err);
      });
  }, [location]);


  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [errorMsg]);

  
  if (!data) {
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    );
  }

  let icon;

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy id='hj'/>;
      break;
    case 'Haze':
      icon = <BsCloudHaze2Fill id='hj'/>;
      break;
    case 'Rain':
      icon = <IoMdRainy  id='hh'/>;
      break;
    case 'Clear':
      icon = <IoMdSunny  id='mn'/>;
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill id='hj' />;
      break;
    case 'Snow':
      icon = <IoMdSnow  id='kn'/>;
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm id='hj' />;
      break;
  }

 
  const date = new Date();

  return (
    <div className='vb'>
      {errorMsg && (
        <div className=''>{`${errorMsg.response.data.message}`}</div>
      )}
     
      <form
        classNam=''
      >
        <div className=''>
          <input
            onChange={(e) => handleInput(e)}
            className=''
            type='text'
            placeholder='Search your city or country'
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className=''
          >
            <IoMdSearch className='text' />
          </button>
        </div>
      </form>
    
      
      
      <div id='span'>
        {loading ? (
          <div >
            <ImSpinner8 id='ims'  />
          </div>
        ) : (
          <div>
          
            
               
                <div id='lo' >
                  {data.name}, {data.sys.country}
                </div>
                <div >
            
              <div>
              
               
                <div id='lk'>
                  {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                  {date.getUTCFullYear()}
               
                </div>
                <div class="vertical-line"></div>
                
              <div >{icon}</div>
              
              </div>
            
            </div>
         
            <div >
              <div >
              
              
          
              
                <div  id='sel'>
                  {parseInt(data.main.temp)}
                  <TbTemperatureCelsius />
                </div>
             
               
              </div>
           
              <div id='clair' >
                {data.weather[0].description}
              </div>
            </div>
       
            <div >
              <div >
                <div className='vs' >
                
                  <div   >
                    <BsEye />
                  </div>
                  <div>
                  <div>Visibility{' '}</div>
                    <span>{data.visibility / 1000} km</span>
                    
                  </div>
                </div>
                <div  className='re'>
                
                  <div >
                    <BsThermometer />
                  </div>
                  <div >
                    Feels like
                    <div >
                      {parseInt(data.main.feels_like)}
                      
                    </div>
                  </div>
                </div>
              </div>
              <div >
                <div  className='nb'>
                 
                  <div >
                    <BsWater />
                  </div>
                 
                  <div>
                      Humidity
                    <div >{data.main.humidity} %</div>
                  </div>
                </div>
                <div className='rt'>
               
                  <div >
                    <BsWind />
                  </div>
                  <div>
                    Wind <div>{data.wind.speed} m/s</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};



export default App;
