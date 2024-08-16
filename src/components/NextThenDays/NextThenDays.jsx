import React from "react";
import css from './NextThenDays.module.css';
import { useSelector } from "react-redux";
import { selectWeather5Days } from "../../redux/selectors";
import { AiFillSun } from 'react-icons/ai';

const WeatherNextFiveDays = () => {
  const nextDays = useSelector(selectWeather5Days);
  console.log("nextDays:",nextDays)

  if (!nextDays || !Array.isArray(nextDays)) {
    return null;
  }
  // const getDayInfo = (nextDays) => {
  //   console.log("filter:",nextDays.dt_txt);
  //   const data = nextDays.filter(item => {
  //     const hour = new Date(item.dt_txt).getHours();
  //     console.log(hour);
  //     return hour === 0;
  //   });
  //   if (data.length === 0) {
  //       console.error('No data after filtering');
  //       return;
  //     };

  //     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  //   const dataOfWeek = daysOfWeek[new Date(data.dt_txt).getDay()];
  //   console.log("data of week:",dataOfWeek);
  //   // return dataOfWeek;
  // };
  const getDayInfo = (nextDays) => {
    console.log("Received data:", nextDays);
    
    const data = nextDays.filter(item => {
      const hour = new Date(item.dt_txt).getHours();
      console.log("Hour:", hour);
      return hour === 0;
    });
  
    if (data.length === 0) {
      console.error('No data after filtering');
      return [];
    }
  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    data.forEach(item => {
      const date = new Date(item.dt_txt);
      const dayOfWeek = daysOfWeek[date.getDay()];
      console.log("Date:", date, "Day of week:", dayOfWeek);
    });
  
    //Returnez o matrice cu zilele saptamanii
    const daysOfWeekArray = data.map(item => daysOfWeek[new Date(item.dt_txt).getDay()]);
    console.log("Days of week:", daysOfWeekArray);
  
    return daysOfWeekArray;
  };
  const dayArray = getDayInfo(nextDays);

  
  return (
    <div className={css.wrapperNextDays}>
        <div className={css.titleWeapper}><h1>Next 5 days Weather Forecast</h1></div>
        <div className={css.wrapperNextDaysData}>
        {nextDays.filter(item => new Date(item.dt_txt).getHours() === 12)
        .map((nextDay, index) => (
        <div key={nextDay.dt} className={css.wraperShowWeather}>
            <h2>{dayArray[index]}</h2>
          <span className={css.tempC}>{Math.floor(nextDay.main.temp)}°C</span>
          {nextDay.weather[0].description.includes('clear') ? (
            <AiFillSun className={`${css.iconSun} ${css.iconApi}`} />
          ) : (
            <img 
              src={`http://openweathermap.org/img/wn/${nextDay.weather[0].icon}@2x.png`}
              alt="Weather Icon" 
              className={css.iconApi} 
            />
          )}
          <p className={css.description}>{nextDay.weather[0].description}</p>
          <div className={css.containerIntValue}>
          <div className={css.tempValue}>
            <span className={css.tempInt}>Min</span> 
            <span className={css.dataTempInt}>{Math.floor(nextDay.main.temp_min)}°C</span>
            </div>
            <hr/>
            <div className={css.tempValue}>
            <span className={css.tempInt}>Max</span>
            <span className={css.dataTempInt}>{Math.floor(nextDay.main.temp_max)}°C</span>
            </div>
          </div>
        </div>
      ))}
        </div>
    </div>
  );
};

export default WeatherNextFiveDays;
