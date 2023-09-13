import React from "react";
import "./DataWeather.css";

const DataWeather = ({ hourlyWeatherData }) => {
  // Filter the data for the next 24 hours
  const filteredHourlyData = hourlyWeatherData.list.slice(0, 24);

  return (
    <div className="data-wrapper data-hourly">
      <h2 className="daily">Hourly</h2>
      <div className="data-show-container">
        {filteredHourlyData.map((forecast, index) => (
          <DataShowHolder key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

const DataShowHolder = ({ forecast }) => {
  const { icon, description } = forecast.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const dateObj = new Date(forecast.dt * 1000);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  // Function to format time
  const formatTime = (hours, minutes) => {
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
  };

  return (
    <div className="data-show-holder">
      <p>{formatTime(hours, minutes)}</p>
      <img src={iconUrl} alt={description} />
      <p>{forecast.main.temp.toFixed(1)}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default DataWeather;
