import React from "react";
import "./DataWeather.css";

const DataWeather = ({ weatherData }) => {
  // Filter the data for the next 2 days (48 hours)
  const currentDate = new Date();
  const days = new Date(currentDate);
  days.setDate(currentDate.getDate() + 1);

  const filteredData = weatherData.list.filter((forecast) => {
    const forecastDate = new Date(forecast.dt * 1000);
    return forecastDate >= currentDate && forecastDate <= days;
  });

  return (
    <div className="data-wrapper data-hourly">
      <h2 className="daily">Hourly</h2>
      <div className="data-show-container">
        {filteredData.map((forecast, index) => (
          <DataShowHolder key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

const DataShowHolder = ({ forecast }) => {
  const iconCode = forecast.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const dateObj = new Date(forecast.dt * 1000);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  // Calculate the time difference from the current time
  const now = new Date();
  const timeDifference = dateObj - now;

  // Function to format time
  const formatTime = (hours, minutes) => {
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes < 10 ? `0${minutes}` : minutes}${ampm}`;
  };

  return (
    <div className="data-show-holder">
      <p>{timeDifference < 0 ? "Now" : formatTime(hours, minutes)}</p>
      <p>
        <img src={iconUrl} alt="Weather Icon" />
        <p>{forecast.main.temp}°C</p>
        <p>{forecast.weather[0].description}</p>
      </p>
    </div>
  );
};

export default DataWeather;
