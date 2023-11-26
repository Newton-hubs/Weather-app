import React, { useState, useEffect } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  async function search() {
    if (!city) {
      setError("Please enter a city.");
      return;
    }

    setLoading(true);
    const apiKey = "e1bf5fae41dd590f56865f62a727ce70";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      handleResponse(response);
      setError(null);
    } catch (error) {
      setError("City not found. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (city) {
        search();
      }
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(debounceTimer);
  }, [city]);

  if (weatherData.ready) {
    return (
      <div className="Weather">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-9">
            <input
              type="search"
              placeholder="Enter a city.."
              className="form-control search-input"
              onChange={handleCityChange}
            />
          </div>
          <div className="col-3 p-0">
            <input
              type="submit"
              value="Search"
              className="btn btn-primary w-100"
            />
          </div>
        </div>
      </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} city={weatherData.city} />
        <footer>
          This Weather-app project was coded by NJ
        </footer>
      </div>
    );
  } else {
    return (
      <div className="Weather">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9 col-sm-8">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control search-input"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-md-3 col-sm-4">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
                disabled={loading}
              />
            </div>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    );
  }
}
