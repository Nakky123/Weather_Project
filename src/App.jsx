import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Component/Search/Search";
import Weather from "./Component/Weather/Weather";
import DataWeather from "./Component/DataWeather/DataWeather";
import DataWeatherDaily from "./Component/DataWeatherDaily/DataWeatherDaily";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const apiKey = "b55ebdc22b904e591303fa9ae71ebea6";
  const [userLocation, setUserLocation] = useState(null);
  const [allowLocation, setAllowLocation] = useState(false);
  const defaultCity = "Kingdom of Cambodia";
  const [currentLocation, setCurrentLocation] = useState("");

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        );

        if (response.status === 200) {
          setWeatherData(response.data);
        } else {
          console.error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    }

    fetchWeatherData();
  }, [cityName, apiKey]);

  useEffect(() => {
    async function fetchHourlyWeatherData() {
      try {
        const hourlyResponse = await axios.get(
          `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${cityName}&appid=${apiKey}&units=metric`
        );

        if (hourlyResponse.status === 200) {
          setHourlyWeatherData(hourlyResponse.data);
        } else {
          console.error("Failed to fetch hourly weather data");
        }
      } catch (error) {
        console.error("Error fetching hourly weather data", error);
      }
    }

    fetchHourlyWeatherData();
  }, [cityName, apiKey]);

  const handleSearch = (newCityName) => {
    setCityName(newCityName);
  };

  useEffect(() => {
    // Fetch user's current location if they allow it
    if (!allowLocation && "geolocation" in navigator) {
      const allowGeoLocation = window.confirm(
        "To get weather information for your current location, please allow access to your location."
      );

      if (allowGeoLocation) {
        setAllowLocation(true);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });

            axios
              .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
              )
              .then((response) => {
                if (response.status === 200) {
                  setCityName(response.data.name);
                  setCurrentLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  });
                } else {
                  console.error("Failed to fetch weather data");
                }
              })
              .catch((error) => {
                console.error("Error fetching user's location data", error);
              });
          },
          (error) => {
            console.error("Error getting user location", error);
          }
        );
      } else {
        setCityName(defaultCity);
      }
    }
  }, [apiKey, allowLocation, defaultCity]);
  console.log("Hourly Weather Data:", hourlyWeatherData);

  return (
    <>
      <Search onSearch={handleSearch} />
      {weatherData && hourlyWeatherData && (
        <>
          <Weather
            city={cityName}
            temperature={weatherData.list[0].main.temp}
            description={weatherData.list[0].weather[0].description}
            iconCode={weatherData.list[0].weather[0].icon}
            feelsLike={weatherData.list[0].main.feels_like}
            windSpeed={weatherData.list[0].wind.speed}
            visibility={weatherData.list[0].visibility}
            userLocation={userLocation}
          />
          <DataWeather hourlyWeatherData={hourlyWeatherData} />
          <br />
          <DataWeatherDaily
            weatherData={weatherData}
            userLocation={userLocation}
          />
          <footer></footer>
        </>
      )}
    </>
  );
}

export default App;
