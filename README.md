# Product ScreenShot:

![screen shot](/src/Image/product.png)

# Weather App

A simple weather website build with React to help you check the weather condition for different locations.

## Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Technologies](#technologies)
- [Usage](#usage)
- [Document](#document)
- [Convention Guide](#convention)

## Features

- `Weather Current location`: Get the current location from user and display user location weather information that have `location of city , temperature , visibility and wind speed`.
- `Search dropdown`: search for weather data by enter a city name and it display dropdown the city name and country name `example` : enter `seoul` the dropdown will display `Seoul,Korea,Republic of` and when click on city name the screen will change data from current location into data weather of city that you entered.
- `weather forecest`: display next 4days of weather data and display 24 hours of weather data
- `Responsive Design`: The website is designed to work on both desktop and mobile devices.

## Installation

To run this project locally , follow these steps:

1. Clone the reponsitory to your local machine:

```bash
git clone https://github.com/anb-hq/AnB_Prime_Weather_Sambath_Ratanak.git

cd AnB_Prime_Weather_Sambath_Ratanak/

npm i
```

2. change apikey: `in App.jsx`

```jsx
const apiKey = "b55ebdc22b904e591303fa9ae71ebea6";
```

change apikey to your apikey by this website [GetApi](https://home.openweathermap.org/api_keys)

## Usage

1. Run the app

```bash
npm run dev
```

after that it will show

```
Local:   http://localhost:5175/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

2. Open your web brower and go to `http://localhost:5175/` to access the Weather App

3. if website want your location if you want to see your current location just `OK` allow if not click `Cancel` , after you click `OK` the website will display the current weather data in your current location . if you click `cancel` it will show default country `Kingdom of Cambodia`.

## Technologies

- React
- CSS (Cascading Style Sheets)
- [OpenWeatherAPI](https://openweathermap.org/api)
- [React-Select](https://react-select.com/home)
- Flaticon [Link](https://www.flaticon.com/search?word=fog&type=animated-icon)

## Convention

Convention guide can be accessed [here](/document/convention.md).

## Document

- [UI Prototype](https://www.figma.com/file/fN8lF9e0AemfjKnHnhk8cE/Weather?type=design&node-id=0-1&mode=design&t=HMLSSKC9B6rGR0FM-0)

# Noted

- I do everything by my own research and thank you for city_data.json that given by Mr.Kim Sang
