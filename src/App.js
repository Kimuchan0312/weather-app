import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "97386b34b7ec6cb71b16bc3a445548af",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchweatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
          setWeatherInfo({
            name: data.name,
            country: data.sys.country,
            description: data.weather[0].description,
            temp: data.main.temp,
          });
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchweatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };
  return (
    <>
      <div className="container">
      <h1 className="title">Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          placeholder="City"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="btn" type="submit">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div className="error-message" style={{ color: "red" }}>
              {errorMessage}
            </div>
          ) : (
            <div className="weather-info">
              {weatherInfo && (
                <div>
                  <h2>{weatherInfo.name}</h2>
                  <p>{weatherInfo.country}</p>
                  <p>{weatherInfo.description}</p>
                  <p>{weatherInfo.temp}°C</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
      </div>
    </>
  );
}

export default App;
