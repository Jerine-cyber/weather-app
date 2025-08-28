import React from "react";

export default function WeatherCard({ weather }) {
  return (
    <div className="mt-4 p-4 bg-white/20 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold">{weather.name}</h2>
      <p className="capitalize">{weather.weather[0].description}</p>
      <p className="text-lg font-semibold">{weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}
