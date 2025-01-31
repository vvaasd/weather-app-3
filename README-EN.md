# WeatherApp 1 (React SPA)

## About the Project

A single-page application for viewing weather forecasts

Deployed on Netlify [(project link)](https://vvaasd-weather-app-3.netlify.app) since GitHub Pages does not support dynamic websites.

### Tech Stack

**React JS**, HTML, CSS (modular approach)  
Bundler: Create React App  
Linters: Stylelint, Prettier  

Features implemented:
- Background changes depending on the weather
- Dark theme implemented using CSS variables
- Geolocation detection
- Weather forecast slider
- Ability to add cities to "Favorites", saved in local storage
- Search history for cities, saved in local storage
- Live search for cities
- Skeleton loading placeholders
- Error handling and display on the interface
- Responsive adaptive Pixel Perfect layout (clamp() + media queries)
- (+ Working with Git: commits, pushing changes to GitLab & GitHub, merging branches)

The project was completed as part of the [Preax](https://preax.ru/) internship according to technical requirements and design specifications.

## Installation Guide

To run the application locally (requires [Node](https://nodejs.org/en)):
1) Clone the repository using the following terminal command: `git clone https://github.com/vvaasd/weather-app-3.git`
2) Navigate to the repository folder using the command: `cd weather-app-3`
3) Install dependencies using the command: `npm install`
4) Start the application in development mode using the command: `npm run dev` (for the build version: `npm run build`)
5) The application will be available at: http://localhost:3000/ (3000 is the default port, but yours may be different, e.g., 5173)

(!) Do not use quotes in terminal commands

## README.md

- ru [Русский](https://github.com/vvaasd/weather-app-3/blob/main/README.md)
