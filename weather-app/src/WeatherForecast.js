import React, { useState, useEffect } from "react";
import WeatherForecastPreview from "./WeatherForecastPreview";
import axios from "axios";
import "./WeatherForecast.css";

export default function WeatherForecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
    let apiKey = "e1bf5fae41dd590f56865f62a727ce70";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      props.city
    )}&appid=${apiKey}&units=metric&cnt=7`;

    axios
      .get(apiUrl)
      .then((response) => {
        console.log("API response:", response.data);
        setForecast(response.data.list);
        setLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
        setLoaded(true);
      });
  }, [props.city]);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  if (!forecast) {
    return <div>No forecast data available</div>;
  }

  const upcomingDaysForecast = forecast.slice(0, 7); // Take the first 7 days for a week

  return (
    <div className="WeatherForecast row">
      {upcomingDaysForecast.map((forecastData, index) => (
        <div className="col" key={index}>
          <WeatherForecastPreview data={forecastData} />
        </div>
      ))}
    </div>
  );
}
