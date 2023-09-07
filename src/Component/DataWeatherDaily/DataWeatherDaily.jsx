import React from "react";
import "./DataWeatherDaily.css";

const DataWeatherDaily = ({ weatherData }) => {
  // Group the data by date to get daily forecasts
  const groupedData = groupDataByDate(weatherData.list);

  return (
    <div className="data-wrapper">
      <h2 className="daily">Daily</h2>
      <div className="data-show-container">
        {groupedData.map((dailyForecast, index) => (
          <DataShowHolder key={index} dailyForecast={dailyForecast} />
        ))}
      </div>
    </div>
  );
};

// Helper function to group data by date
const groupDataByDate = (dataList) => {
  const groupedData = {};
  dataList.forEach((forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString("en-US");
    if (!groupedData[date]) {
      groupedData[date] = [];
    }
    groupedData[date].push(forecast);
  });

  return Object.values(groupedData);
};

const DataShowHolder = ({ dailyForecast }) => {
  const firstForecast = dailyForecast[0];
  const iconCode = firstForecast.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const dateObj = new Date(firstForecast.dt * 1000);
  const dayOfWeek = dateObj
    .toLocaleDateString("en-US", { weekday: "long" })
    .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize the first letter of each word

  const dayOfMonth = dateObj.getDate();

  return (
    <div className="data-show-holder">
      <p>
        {dayOfWeek} {dayOfMonth}
      </p>
      <p>
        <img src={iconUrl} alt="Weather Icon" />
        <p>{firstForecast.main.temp}°C</p>
        <p>{firstForecast.weather[0].description}</p>
      </p>
    </div>
  );
};

export default DataWeatherDaily;
