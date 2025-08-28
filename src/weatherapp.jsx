import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/weathercard";
import Loader from "./components/Loader";

// Online background images (Unsplash)
const weatherBackgrounds = {
  Clear: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
  Clouds: "https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1600&q=80",
  Rain: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80",
  Drizzle: "https://images.unsplash.com/photo-1527766833261-b09c3163a791?auto=format&fit=crop&w=1600&q=80",
  Thunderstorm: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
  Snow: "https://images.unsplash.com/photo-1608889175631-2fbb8021f5d4?auto=format&fit=crop&w=1600&q=80",
  Mist: "https://images.unsplash.com/photo-1526481280695-3c720685208b?auto=format&fit=crop&w=1600&q=80",
  Smoke: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1600&q=80",
  Haze: "https://images.unsplash.com/photo-1520975918319-4107cba1a3c9?auto=format&fit=crop&w=1600&q=80",
  Fog: "https://images.unsplash.com/photo-1543968996-ee822b8176ba?auto=format&fit=crop&w=1600&q=80",
  Default: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80",
};

const API_KEY = "96e7e3c289ee1620b8896d89da6a2318"; // your API key

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [bgImage, setBgImage] = useState(weatherBackgrounds.Default);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      setError("");
      setLoading(true);

      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: { q: city, appid: API_KEY, units: "metric" },
        }
      );

      const data = response.data;
      setWeather(data);

      // Set background based on weather condition
      const condition = data.weather[0].main;
      setBgImage(weatherBackgrounds[condition] || weatherBackgrounds.Default);
    } catch (err) {
      setError("City not found. Try again!");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl w-96 p-6 text-center text-white">
        <h1 className="text-2xl font-bold mb-4">🌤️ Weather Forecast</h1>

        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mb-4 px-3 py-2 rounded-lg border border-gray-300 w-full text-black"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
          onClick={fetchWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "Report Weather"}
        </button>

        {loading && <Loader />}
        {error && <p className="text-red-400 mt-3">{error}</p>}
        {weather && !loading && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}
