import React from "react";
import "./DataWeatherDaily.css";

const DataWeatherDaily = ({ weatherData }) => {
  // Filter and group the data to show data every 8 data points (3 hours)
  const filteredData = filterDataEvery8Hours(weatherData.list);

  return (
    <div className="data-wrapper">
      <h2 className="daily">Daily</h2>
      <div className="data-show-container data-show-container-2">
        {filteredData.map((forecast, index) => (
          <DataShowHolder key={index} forecast={forecast} />
        ))}
      </div>
    </div>
  );
};

// Helper function to filter data every 8 data points (3 hours)
const filterDataEvery8Hours = (dataList) => {
  const filteredData = [];
  for (let i = 0; i < dataList.length; i += 8) {
    filteredData.push(dataList[i]);
  }
  return filteredData;
};

const DataShowHolder = ({ forecast }) => {
  const iconCode = forecast.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const dateObj = new Date(forecast.dt * 1000);
  const dayOfWeek = dateObj
    .toLocaleDateString("en-US", { weekday: "long" })
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const date = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
  });

  return (
    <div className="data-show-holder">
      <p>
        {dayOfWeek} {date}
      </p>

      <p>
        <img src={iconUrl} alt="Weather Icon" />
        <p>{Math.round(forecast.main.temp)}°C</p>
        <p>{forecast.weather[0].description}</p>
      </p>
    </div>
  );
};

export default DataWeatherDaily;
