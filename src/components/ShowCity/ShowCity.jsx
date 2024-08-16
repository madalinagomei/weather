import React from 'react';
import { useSelector } from 'react-redux';
import { selectCity} from '../../redux/selectors';
import css from './ShowCity.module.css';
import { AiFillSun } from "react-icons/ai";
import { FiSunrise } from "react-icons/fi";
import { FiSunset } from "react-icons/fi";
import { PiWind } from "react-icons/pi";



const ShowCity = () => {
  const cityWeather = useSelector(selectCity);

  const formatUnixTimestampToLocalTime = (unixTimestamp, timezoneOffset) => {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  if (!cityWeather) {
    return null;
  }

  const weatherDescription = cityWeather.weather[0].description;
  const isClearSky = weatherDescription.includes('clear');

  const weatherIconUrl = `http://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`;


  return (
    <div className={css.wraperShowWeather}>
      <div className={css.titleDaily}><h1>Daily Forcast</h1></div>
      <div className={css.wrapperDailyData}>
      <div className={css.wrapperLeft}>
      <h2>{cityWeather.name}, {cityWeather.sys.country}</h2>
      <h2>{Math.floor(cityWeather.main.temp)}°C</h2>
      {isClearSky ? (
        <AiFillSun className={`${css.iconSun} ${css.iconApi}` } />
      ) : (
        <img src={weatherIconUrl} alt="Weather Icon" className={css.iconApi} />
      )}
      <p className={css.description}>{cityWeather.weather[0].description}</p>
      <div className={css.tempValue}>
      <p className={css.tempInt}>Min: <span>{Math.floor(cityWeather.main.temp_min)}°C</span></p>
      <p className={css.tempInt}>Max: <span>{Math.floor(cityWeather.main.temp_max)}°C</span></p>
      </div>
      <div className={css.containerIntervSun}>
        <div className={css.wrapperSunrise}>
        <span><FiSunrise className={css.iconSunrise}/></span>
      <span>{formatUnixTimestampToLocalTime(cityWeather.sys.sunrise, cityWeather.timezone)}</span> 
        </div>
      <div className={css.wrapperSunset}>
      <span><FiSunset className={css.iconSunSet}/></span>
      <span>{formatUnixTimestampToLocalTime(cityWeather.sys.sunset, cityWeather.timezone)}</span>
      </div>
      </div>
      </div>
      <div className={css.wrapperRight}>
        <div className={css.wrapperTop}>
        <div className={css.wrapperFeelsLike}>
          <span>Feels like</span>
          <span>{Math.floor(cityWeather.main.feels_like)}°C</span>
        </div>
        <div className={css.wrapperHumidity}>
          <span>Humidity</span>
          <span>{cityWeather.main.humidity}%</span>
        </div>
        </div>
        <div className={css.wrapperBottom}>
        <div className={css.wrapperWind}>
          <span>Wind</span>
          <div className={css.containerWindData}>
            <PiWind/>
            <span>{cityWeather.wind.speed}m/s</span>
          </div>
        </div>  
        <div className={css.wrapperVisibility}>
          <span>Visibility</span>
          <span>{(cityWeather.visibility/1000).toFixed(2)} km</span>
          </div>    
     </div>
        </div>
      </div>
      
    </div>
  );
};

export default ShowCity;
