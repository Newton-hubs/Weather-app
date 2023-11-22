import React from "react";
import WeatherIcon from "./weatherIcon";

export default function WeatherForecastPreview(props) {
  console.log("props.data:", props.data);

  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days[day];
  }

  function maxTemperature() {
    if (props.data.main && props.data.main.temp_max) {
      let temperature = Math.round(props.data.main.temp_max);
      return `${temperature}°`;
    }
    return null;
  }

  function minTemperature() {
    if (props.data.main && props.data.main.temp_min) {
      let temperature = Math.round(props.data.main.temp_min);
      return `${temperature}°`;
    }
    return null;
  }

  return (
    <div className="WeatherForecastPreview">
      <div className="forecast-time">{day()}</div>
      {props.data.weather && props.data.weather[0].icon && (
        <WeatherIcon code={props.data.weather[0].icon} size={38} />
      )}
      <div className="forecast-temperature">
        {maxTemperature() && (
          <span className="forecast-temperature-max">{maxTemperature()}</span>
        )}
        {minTemperature() && (
          <span className="forecast-temperature-min">{minTemperature()}</span>
        )}
      </div>
    </div>
  );
}
