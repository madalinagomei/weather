import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, getCurrentLocation, getCityPhoto, getWeather5Days } from '../../redux/operations';
import ShowCity from '../ShowCity/ShowCity';
import WeatherSearch from '../WeatherSearch/WeatherSearch';
import { selectCity, selectCityPhoto, selectIsLoading, selectWeather5Days } from '../../redux/selectors';
import css from './App.module.css';
import WeatherNextFiveDays from '../NextThenDays/NextThenDays';
import Spinner from 'components/Spinner/Spinner';

function App() {
  const dispatch = useDispatch();
  const weatherCity = useSelector(selectCity);
  const loader = useSelector(selectIsLoading);
  const photo = useSelector(selectCityPhoto);
  const weather5Days = useSelector(selectWeather5Days);
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');

  const setCityNameMemoized = useCallback((name, country) => {
    setCityName(name);
    setCountry(country);
  }, []);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await dispatch(getCurrentLocation({ lat: latitude, lon: longitude }));
          if (response.payload && response.payload.name) {
            setCityName(response.payload.name);
            setCountry(response.payload.sys.country);
          }
        },
        (error) => {
          console.error('Error fetching geolocation:', error);
        }
      );
    };

    fetchCurrentLocation();
  }, [dispatch]);

  useEffect(() => {
    if (cityName) {
      dispatch(getCity({ cityName, country }));
      dispatch(getCityPhoto(cityName));
      dispatch(getWeather5Days({ cityName, country }));
    }
  }, [dispatch, cityName, country]);

  const wrapperStyle = {
    backgroundImage: photo ? `url(${photo.urls.regular})` : 'url(https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className={css.wrapper} style={wrapperStyle}>
      {loader ? <Spinner/>: <WeatherSearch setCityNameProp={setCityNameMemoized} />}
      {loader ? <Spinner/>: (weatherCity && weatherCity.name && <ShowCity />)}
      {loader ? <Spinner/>: (weather5Days && weather5Days.length > 0 && <WeatherNextFiveDays />)}
    </div>
  );
}

export default App;
