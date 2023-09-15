import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Component/Search/Search";
import Weather from "./Component/Weather/Weather";
import DataWeather from "./Component/DataWeather/DataWeather";
import DataWeatherDaily from "./Component/DataWeatherDaily/DataWeatherDaily";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyWeatherData, setHourlyWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const [apiKey, setApiKey] = useState("b55ebdc22b904e591303fa9ae71ebea6");
  const [userLocation, setUserLocation] = useState(null);
  const [allowLocation, setAllowLocation] = useState(false);
  const [defaultCity] = useState("Kingdom of Cambodia");
  const [currentLocation, setCurrentLocation] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

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

  const handleSearch = async (newCityName) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${newCityName}&appid=${apiKey}&units=metric`
      );

      if (response.status === 200) {
        setCurrentWeather(response.data);
        setCityName(newCityName);
        setWeatherData(null);
        setSearchHistory([...searchHistory, response.data]);
      } else {
        console.error("Failed to fetch weather data");
      }
    } catch (error) {
      console.error("Error fetching weather data", error);
    }
  };

  const handleCurrentLocationClick = () => {
    if ("geolocation" in navigator) {
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
                setCurrentWeather(response.data);
              } else {
                console.error("Failed to fetch weather data");
              }
            })
            .catch((error) => {
              console.error("Error fetching user's location data: ", error);
            });
        },
        (error) => {
          console.error("Error getting user location", error);
          setCityName(defaultCity);
        }
      );
    }
  };

  useEffect(() => {
    // Fetch user's current location if they allow it
    if ("geolocation" in navigator) {
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
                setCurrentWeather(response.data);
              } else {
                console.error("Failed to fetch weather data");
              }
            })
            .catch((error) => {
              console.error("Error fetching user's location data: ", error);
            });
        },
        (error) => {
          console.error("Error getting user location", error);
          setCityName(defaultCity);
        }
      );
    }
  }, [apiKey, allowLocation, defaultCity]);

  console.log("asdg", searchHistory);

  return (
    <>
      <Search onSearch={handleSearch} />
      {(weatherData || currentWeather) && hourlyWeatherData && (
        <>
          <Weather
            city={cityName}
            currentWeather={currentWeather}
            weatherData={weatherData}
            temperature={
              currentWeather?.main.temp || weatherData?.list[0]?.main.temp
            }
            description={
              currentWeather?.weather[0]?.description ||
              weatherData?.list[0]?.weather[0]?.description
            }
            iconCode={
              currentWeather?.weather[0]?.icon ||
              weatherData?.list[0]?.weather[0]?.icon
            }
            feelsLike={
              currentWeather?.main.feels_like ||
              weatherData?.list[0]?.main.feels_like
            }
            windSpeed={
              currentWeather?.wind.speed || weatherData?.list[0]?.wind.speed
            }
            visibility={
              currentWeather?.visibility || weatherData?.list[0]?.visibility
            }
            userLocation={userLocation}
            onCurrentLocationClick={handleCurrentLocationClick}
          />

          <DataWeather
            hourlyWeatherData={hourlyWeatherData}
            currentWeather={currentWeather}
          />
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
