import React from "react";
import "./DataWeather.css";

const DataWeather = ({ hourlyWeatherData, currentWeather }) => {
  // Filter the data for the next 24 hours
  const filteredHourlyData = hourlyWeatherData.list.slice(0, 24);

  return (
    <div className="data-wrapper data-hourly">
      <h2 className="daily">Hourly</h2>
      <div className="data-show-container">
        {filteredHourlyData.map((forecast, index) => (
          <DataShowHolder
            key={index}
            forecast={forecast}
            currentWeather={currentWeather}
          />
        ))}
      </div>
    </div>
  );
};

const DataShowHolder = ({ forecast, currentWeather }) => {
  const { icon, description } = forecast.weather[0];
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  // Extract the UTC timestamp (dt) and timezone (timezone) from the forecast data
  const { dt, timezone } = forecast;
  console.log(currentWeather?.timezone);
  // Calculate the local time using provided dt and timezone
  const timeInSecond = dt + currentWeather?.timezone;
  const hour = Math.floor(timeInSecond / 3600);

  const period = hour % 24 < 12 ? "AM" : "PM";

  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const timeString = `${formattedHour} ${period}`;

  return (
    <div className="data-show-holder">
      <p>{timeString}</p>
      <img src={iconUrl} alt={description} />
      <p>{Math.round(forecast.main.temp)}°C</p>
      <p>{description}</p>
    </div>
  );
};

export default DataWeather;
