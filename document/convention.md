# General

- `index.css` must be on top so that it has lower power than specific components.  
  Example:

  ```jsx
  import "./index.css";
  import App from "./App";
  ```

- CSS reset is used to remove default style of the browser. CSS reset can be found in [index.css]

- Colors:

  - --text-color: black;

- Font:

  - --roboto: "Roboto", sans-serif;

- No inline CSS

# Project structure

```
|--- docs/
|    |--- convention.md
|
|--- public/
|
|--- src/
|    |--- assets/
|    |    |--- favicon.png
|    |
|    |--- components/
|    |    |--- DataWeather/
|    |    |        |--- DataWeather.css
|    |    |        |--- DataWeather.jsx
|    |    |--- DataWeatherDaily/
|    |    |        |--- DataWeatherDaily.css
|    |    |        |--- DataWeatherDailyjsx
|    |    |--- GIF/
|    |    |--- Search/
|    |    |        |--- Search.css
|    |    |        |--- Search.jsx
|    |    |--- Weather/
|    |    |        |--- Weather.css
|    |    |        |--- Weather.jsx
|    |--- App.jsx
|    |--- index.css
|    |--- main.css
|
|--- city_data.json
|--- index.html
|--- package.json
```

- `docs` folder contains documentations like `convention.md`
- `src` folder is where most of coding is done. It contains the root component `main.jsx` and its css `index.css`, and many other files/components.
  - `Image` folder contains images
  - `Components` folder contains all react components. Each component has its css file.  
    **Example:** in `DataWeather` folder, there are `DataWeather.jsx` and `DataWeather.css`
    ```
    |--- DateDisplay/
             |--- DateDisplay.css
             |--- DateDisplay.jsx
    ```

# Naming Convention

- Component name: capitalized. Example: `DataWeather.jsx`
- Function name: PascalCase. Example: `DataWeatherDaily (){...}`
- Variable name: camelCase. Example: `const handleCurrentLocationClick = ...`
- CSS class name: small letter with dash and camelCase . Example: `.search-box`

# Annotation rule

- Use `//` for single line comment
- Use **jsdoc syntax** for multiline comment:
  - Example:
    ```javascript
    /*
     * Multi line
     * comment
     */
    ```

# Grid & Flex

## Use Grid When

- Complex Layouts: CSS Grid is particularly powerful for creating complex two-dimensional layouts. If your design involves both rows and columns with varying sizes and alignment needs, CSS Grid is a great choice.
- Grid-like Structures: When you need to create a true grid structure with consistent gutters and a clear relationship between items, CSS Grid is more intuitive and efficient.
- Layout Control: CSS Grid offers fine-grained control over the placement of items, making it suitable for creating magazine-like layouts, dashboard designs, and any other layout that requires precise control.
- Overlapping Items: If you need items to overlap each other, CSS Grid provides a simple way to achieve this effect, which can be tricky to do with Flexbox.
- Responsive by Default: CSS Grid allows you to create responsive layouts without relying heavily on media queries. You can use features like fractional units and minmax() to create flexible grids that adapt to different screen sizes.

## Use Flexbox when

- One-Dimensional Layouts: Flexbox is best for arranging items in a single dimension — either as rows or columns. It excels at distributing space along the main axis while handling alignment along the cross axis.
- Equal Height Columns: If you want columns to have equal heights regardless of their content, Flexbox can help you achieve this effect without using additional tricks.
- Content Order: Flexbox allows you to change the order of items visually without affecting the source order in the HTML. This is useful for creating responsive designs where the order of content should change based on screen size.
- Alignment and Distribution: Flexbox is excellent for aligning items both horizontally and vertically, as well as distributing space between them along the main axis.
- Simple Component Layouts: When dealing with simpler components like navigation bars, cards, or buttons, Flexbox is often more straightforward and requires less code than CSS Grid.
- Fluid Resizing: If you want items to dynamically resize to accommodate varying content, Flexbox flexibility can be more suitable.

# Root & Background-gif

```css
/* Font Awesome */
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
/* Font Roboto */
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap");
body {
  box-sizing: border-box;
  margin: 0;
  background-image: url(./Image/Sky2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}
:root {
  --text-color-cloud: black;
  --text-color-rain: white;
  --small-text: 15px;
  --gap: 20px;
}

* {
  color: var(--color-black);
  font-family: "Roboto", sans-serif;
}
.rainy-background {
  background-image: url("../src/Component/GIF/rain_wallpaper.gif");
  & .header,
  .weather-holder,
  .weather-c,
  .weather-show,
  .weather-show-2 > p,
  .data-show-holder > p,
  .daily,
  .world {
    color: var(--text-color-rain);
  }
}
.cloudy-background {
  background-image: url("../src/Component/GIF/cloudy_wallpaper.gif");
  & .header,
  .weather-holder,
  .weather-c,
  .weather-show,
  .weather-show-2 > p,
  .data-show-holder > p,
  .daily {
    color: var(--text-color);
  }
}
```

## Index.css contain all of these :

- I set universal style : color , font-family

# API

### This website use 3 API :

1. This API i use for get 4 days forward data :

```jsx
`https://api.openweathermap.org/data/2.5/forecast?q=${newCityName}&appid=${apiKey}&units=metric`;
```

2. This API i use for get hourly Data :

```jsx
`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${cityName}&appid=${apiKey}&units=metric`;
```

3. This API i use for get current location :

```jsx
`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
```
