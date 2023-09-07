import React from "react";
import "./Weather.css";
import cloud from "../GIF/cloud.gif";
import rain from "../GIF/rain.gif";
import thunderstorm from "../GIF/thunderstorm.gif";
import clear_day from "../GIF/clear_day.gif";
import party_cloudy_day from "../GIF/party_cloudy_day.gif";
import snow from "../GIF/snow.gif";
import fog from "../GIF/fog.gif";

const DataShowHolder = ({ iconCode, additionalContent }) => {
  let iconUrl;

  const weatherIconMap = {
    "01d": "clear_day",
    "02d": "party_cloudy_day",
    "03d": "cloud",
    "04d": "cloud",
    "09d": "rain",
    "10d": "rain",
    "11d": "thunderstorm",
    "13d": "snow",
    "50d": "fog",
  };

  if (weatherIconMap[iconCode]) {
    if (iconCode === "09d" || iconCode === "10d") {
      iconUrl = rain;
    } else if (iconCode === "03d" || iconCode === "04d") {
      iconUrl = cloud;
    } else if (iconCode === "11d") {
      iconUrl = thunderstorm;
    } else if (iconCode === "01d") {
      iconUrl = clear_day;
    } else if (iconCode === "02d") {
      iconUrl = party_cloudy_day;
    } else if (iconCode === "13d") {
      iconUrl = snow;
    } else if (iconCode === "13d") {
      iconUrl = fog;
    } else {
      iconUrl = rain;
    }
  } else {
    iconUrl = fog;
  }

  return (
    <div className="data-show-holder">
      <img className="weather-icon" src={iconUrl} alt="Weather Icon" />
      {additionalContent && <div>{additionalContent}</div>}
    </div>
  );
};

const Weather = ({
  city,
  temperature,
  description,
  feelsLike,
  windSpeed,
  visibility,
  iconCode,
  additionalContent,
}) => {
  // Capitalize the first letter of each word in the description
  const capitalizedDescription = description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="wrapper-weather">
      <h1 className="header">{city}</h1>
      <div className="weather-holder">
        <DataShowHolder
          iconCode={iconCode}
          additionalContent={additionalContent}
        />
        <span className="weather-c">{temperature}°C</span>
      </div>
      <p className="weather-show">{capitalizedDescription}</p>
      <div className="weather-show-2">
        <p>Feels like: {feelsLike}°C</p>
        <p>Wind: {windSpeed} m/s</p>
        {/* <p>Visibility: {visibility}m</p> */}
      </div>
    </div>
  );
};

export default Weather;
