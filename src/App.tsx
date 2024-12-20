import "./App.css";
import { useState } from "react";
import {
  Container,
  CircularProgress,
} from "@mui/material";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import ErrorCard from "./components/ErrorCard";
import { WeatherData } from "./type";

const API_KEY = `61b744de432b40d9bea113125240812`;
const URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}`;

// const testObj = {
//   location: {
//     name: "London",
//     region: "City of London, Greater London",
//     country: "United Kingdom",
//     lat: 51.5171,
//     lon: -0.1062,
//     tz_id: "Europe/London",
//     localtime_epoch: 1733669629,
//     localtime: "2024-12-08 14:53",
//   },
//   current: {
//     last_updated_epoch: 1733669100,
//     last_updated: "2024-12-08 14:45",
//     temp_c: 7.2,
//     temp_f: 45,
//     is_day: 1,
//     condition: {
//       text: "Light rain",
//       icon: "//cdn.weatherapi.com/weather/64x64/day/296.png",
//       code: 1183,
//     },
//     wind_mph: 19.9,
//     wind_kph: 32,
//     wind_degree: 10,
//     wind_dir: "N",
//     pressure_mb: 1019,
//     pressure_in: 30.09,
//     precip_mm: 0.1,
//     precip_in: 0,
//     humidity: 87,
//     cloud: 50,
//     feelslike_c: 2.8,
//     feelslike_f: 37,
//     windchill_c: 1.6,
//     windchill_f: 34.9,
//     heatindex_c: 6.3,
//     heatindex_f: 43.4,
//     dewpoint_c: 4.8,
//     dewpoint_f: 40.7,
//     vis_km: 10,
//     vis_miles: 6,
//     uv: 0.2,
//     gust_mph: 27.8,
//     gust_kph: 44.8,
//   },
// };

// const MyContainer = styled(Container)(() => ({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexDirection: "column",
//   minHeight: "100vh",
//   backgroundColor: "#282c34",
//   textAlign: "center",
// }));

const CACHE_TIMEOUT = 10 * 60 * 1000;

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMsg, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>("#242424");

  const getWeather = async (param: string): Promise<void> => {
    //clean the input
    const normalizedParam = param.trim().toLowerCase();
    //cache data for faster retrieval and reduce API calls
    const cached = sessionStorage.getItem(normalizedParam);
    if (cached) {
      const parsedCache = JSON.parse(cached) as {
        data: WeatherData;
        timestamp: number;
      }

      if (Date.now() - parsedCache.timestamp < CACHE_TIMEOUT) {
        console.log("searching in cache...")
        setWeatherData(parsedCache.data);
        const condition = parsedCache.data.current.condition.text;
        setBgColor(determineBackgroundColor(condition));
        return;
      }
    }
    //loader
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${URL}&q=${encodeURIComponent(param)}&aqi=no`
      );

      if (response.ok) {
        const data = await response.json();
        //store result to cache
        sessionStorage.setItem(
          normalizedParam,
          JSON.stringify({ data, timestamp: Date.now() })
        );
        setWeatherData(data);
        setIsLoading(false);
        const condition = data.current.condition.text;
        setBgColor(determineBackgroundColor(condition));
        setError("");
      } else {
        // Handle non-OK HTTP responses
        const message =
          response.status === 400
            ? "Could not retrieve relevant information. Please try again."
            : "An unexpected error occurred. Please try again.";
        setError(message);
        setIsLoading(false);
        setBgColor(determineBackgroundColor("Unknown"));
      }
    } catch (e) {
      console.error(e);
      setIsLoading(false);
      setError("An unexpected error occured. Please try again.");
      setBgColor(determineBackgroundColor("Unknown"));
    }
  };

  //set the background color depending on the weather condition
  const getWeatherCategory = (condition: string): string => {
    if (condition.toLowerCase().includes("rain")) return "Rainy";
    if (condition.toLowerCase().includes("snow")) return "Snow";
    if (condition.toLowerCase().includes("clear")) return "Clear";
    if (condition.toLowerCase().includes("cloud")) return "Cloudy";
    if (condition.toLowerCase().includes("sunny")) return "Sunny";
    if (condition.toLowerCase().includes("overcast")) return "Overcast";
    if (condition.toLowerCase().includes("mist")) return "Mist";
    if (condition.toLowerCase().includes("thunderstorm")) return "Thunderstorm";
    return "Unknown";
  };

  const determineBackgroundColor = (condition: string): string => {
    const weatherColors: Record<string, string> = {
      Sunny: "#FFD700",
      Clear: "#87CEEB",
      Cloudy: "#B0C4DE",
      Overcast: "#778899",
      Rainy: "#4682B4",
      Thunderstorm: "#4B0082",
      Snow: "#FFFFFF",
      Mist: "#F0E68C",
      Unknown: "#d32f2f",
    };

    const defaultColor = "#242424";
    return weatherColors[getWeatherCategory(condition)] || defaultColor;
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: bgColor,
        textAlign: "center",
        minWidth: "100vw",
      }}
    >
      <SearchBar getWeather={getWeather} />
      {isLoading && <CircularProgress />}
      {weatherData && !errorMsg && !isLoading && (
        <WeatherCard weather={weatherData} />
      )}
      {errorMsg && <ErrorCard error={errorMsg} />}
    </Container>
  );
}

export default App
