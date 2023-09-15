import React, { useEffect } from "react";
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
    "01d": clear_day,
    "01n": clear_day,
    "02d": party_cloudy_day,
    "02n": party_cloudy_day,
    "03d": cloud,
    "03n": cloud,
    "04d": cloud,
    "04n": cloud,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": fog,
    "50n": fog,
  };

  if (weatherIconMap[iconCode]) {
    if (iconCode === "09d" || iconCode === "09n") {
      iconUrl = rain;
    } else if (iconCode === "03d" || iconCode === "03n") {
      iconUrl = cloud;
    } else if (iconCode === "11d" || iconCode === "11n") {
      iconUrl = thunderstorm;
    } else if (iconCode === "01d" || iconCode === "01n") {
      iconUrl = clear_day;
    } else if (iconCode === "02d" || iconCode === "02n") {
      iconUrl = party_cloudy_day;
    } else if (iconCode === "13d" || iconCode === "13n") {
      iconUrl = snow;
    } else if (iconCode === "50d" || iconCode === "50n") {
      iconUrl = fog;
    } else if (iconCode === "04d" || iconCode === "04n") {
      iconUrl = cloud;
    } else if (iconCode === "10d" || iconCode === "10n") {
      iconUrl = rain;
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
  onCurrentLocationClick,
}) => {
  // Capitalize the first letter of each word in the description
  const capitalizedDescription = description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  useEffect(() => {
    // Check if it's raining or cloudy (you can modify this condition based on your weather icon codes)
    const isRaining =
      iconCode === "09d" ||
      iconCode === "09n" ||
      iconCode === "10d" ||
      iconCode === "10n";
    const isCloudy =
      iconCode === "03d" ||
      iconCode === "03n" ||
      iconCode === "04d" ||
      iconCode === "04n";
    const isThunderstorm = iconCode === "11d" || iconCode === "11n";

    // Add or remove the appropriate class to the body element based on the weather condition
    if (isRaining) {
      document.body.classList.add("rainy-background");
      document.body.classList.remove("cloudy-background");
      document.body.classList.remove("thunderstorm-background");
    } else if (isCloudy) {
      document.body.classList.add("cloudy-background");
      document.body.classList.remove("rainy-background");
      document.body.classList.remove("thunderstorm-background");
    } else if (isThunderstorm) {
      document.body.classList.add("thunderstorm-background");
      document.body.classList.remove("rainy-background");
      document.body.classList.remove("cloudy-background");
    } else {
      document.body.classList.remove("rainy-background");
      document.body.classList.remove("cloudy-background");
      document.body.classList.remove("thunderstorm-background");
    }
  }, [iconCode]);

  return (
    <div className="wrapper-weather">
      <h1 className="header">
        {city}{" "}
        <i
          className="fa-solid fa-location-dot world"
          onClick={onCurrentLocationClick}
        ></i>
      </h1>
      <div className="weather-holder">
        <DataShowHolder
          iconCode={iconCode}
          additionalContent={additionalContent}
        />
        <span className="weather-c">{Math.round(temperature)}°C</span>
      </div>
      <p className="weather-show">{capitalizedDescription}</p>
      <div className="weather-show-2">
        <p>Feels like: {Math.round(feelsLike)}°C</p>
        <p>Wind : {Math.round(windSpeed) * 3.6} km/h</p>
        <p>Visibility: {visibility / 1000} Km</p>
      </div>
    </div>
  );
};

export default Weather;
