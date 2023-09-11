import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Component/Search/Search";
import Weather from "./Component/Weather/Weather";
import DataWeather from "./Component/DataWeather/DataWeather";
import DataWeatherDaily from "./Component/DataWeatherDaily/DataWeatherDaily";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState("");
  const apiKey = "f6b52f57a593db891de1e68163d24c73";
  const [userLocation, setUserLocation] = useState(null);
  const [allowLocation, setAllowLocation] = useState(false);
  const defaultCity = "Cambodia";
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
                    // Update currentLocation with latitude and longitude
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
        //clicked cancel, set the default city
        setCityName(defaultCity);
      }
    }
  }, [apiKey, allowLocation, defaultCity]);

  useEffect(() => {
    // Fetch user's IP address if they allow it
    if (!userLocation && allowLocation) {
      axios
        .get("https://api.ipify.org?format=json")
        .then((response) => {
          const userIPAddress = response.data.ip;
          console.log("User's IP Address:", userIPAddress);
          // You can store the IP address or use it as needed in your application.
        })
        .catch((error) => {
          console.error("Error fetching user's IP address", error);
        });
    }
  }, [allowLocation, userLocation]);

  console.log(currentLocation);

  return (
    <>
      <Search onSearch={handleSearch} />
      {weatherData && (
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
          <DataWeather weatherData={weatherData} />
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
