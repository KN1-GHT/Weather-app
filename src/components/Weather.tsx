import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Weather.css';
import weatherIcon from '../Weather.png';
import clearImage from '../sunny.png'; 
import rainImage from '../Rainy.png';  
import cloudsImage from '../Cloudy.png';

const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const Weather = () => {
    const [city, setCity] = useState('London');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        setError(null); 
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
            setWeatherData(null); 
            setError("The City that you are looking for has not been found."); 
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
    };

    const getWeatherImage = (weather) => {
        switch (weather) {
            case 'Clear':
                return clearImage;
            case 'Rain':
                return rainImage;
            case 'Clouds':
                return cloudsImage;
            default:
                return weatherIcon; 
        }
    };

    return (
        <div className="weather-container">
            <img 
                src={weatherData ? getWeatherImage(weatherData.weather[0].main) : weatherIcon} 
                alt={weatherData ? weatherData.weather[0].main : "Weather Icon"} 
                className="weather-image-lg"
            />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                />
                <button type="submit">Get Weather</button>
            </form>
            {error ? (
                <h1 className="error-message">{error}</h1>  
            ) : weatherData ? (
                <div className="weather-details">
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Description: {weatherData.weather[0].description}</p>
                    <p>Feels like: {weatherData.main.feels_like}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Pressure: {weatherData.main.pressure} hPa</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default Weather;
