import React, { useState, useEffect } from "react";
import Search from "./Component/Search/Search";
import Weather from "./Component/Weather/Weather";
import DataWeather from "./Component/DataWeather/DataWeather";
import DataWeatherDaily from "./Component/DataWeatherDaily/DataWeatherDaily";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState(""); // Default to an empty string
  const apiKey = "f6b52f57a593db891de1e68163d24c73"; // Updated OpenWeatherMap API key
  const [userLocation, setUserLocation] = useState(null);
  const [allowLocation, setAllowLocation] = useState(false); // Track if user allows location
  const defaultCity = "Cambodia"; // Default city name if geolocation is denied

  useEffect(() => {
    // Fetch weather data when the cityName changes
    async function fetchWeatherData() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    }

    fetchWeatherData();
  }, [cityName, apiKey]);

  // Define the search function to update cityName
  const handleSearch = (newCityName) => {
    setCityName(newCityName);
  };

  useEffect(() => {
    // Fetch user's current location if they allow it
    if (!allowLocation && "geolocation" in navigator) {
      // Prompt the user to allow location
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

            // Set the default city to the user's location
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`
            )
              .then((response) => response.json())
              .then((data) => {
                setCityName(data.name);
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
        // User clicked cancel, set the default city
        setCityName(defaultCity);
      }
    }
  }, [apiKey, allowLocation, defaultCity]);

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
