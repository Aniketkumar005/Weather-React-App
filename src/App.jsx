
import { useState, useEffect } from "react";
import TopButtons from "./components/TopButtons";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function capital(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function App() {
  const COLD_URL =
    "https://images.unsplash.com/photo-1641672222794-536ad524a929?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const HOT_URL =
    "https://images.unsplash.com/photo-1504370805625-d32c54b16100?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const RAIN_URL =
    "https://images.unsplash.com/photo-1511289081-d06dda19034d?q=80&w=992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const NIGHT_URL =
    "https://images.unsplash.com/photo-1509515837298-2c67a3933321?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const [query, setQuery] = useState({ q: "meerut" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";

    toast.info(`Fetching weather data for ${capital(cityName)}`);

    await getFormattedWeatherData({ ...query, units }).then((data) => {
      toast.success(`Fetching weather data for ${data.name}, ${data.country}`);

      setWeather(data);
      console.log(data);
    })
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  // Listen to screen size changes
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ground = () => {
    if (isMobile) return {};
    
     // Remove background on mobile

    const baseStyle = {
      backgroundImage: "",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100%",
      width: "100vw",
    };

    const threshold = units === "metric" ? 15 : 70;
    
 
    if (!weather) {
      return {
        ...baseStyle,
        backgroundImage: `url(${COLD_URL})`,
      };
    }

    if (weather.details.includes("Rain")) {
      return {
        ...baseStyle,
        backgroundImage: `url(${RAIN_URL})`,
      };
    }

    if (weather.temp <= threshold) {
      return {
        ...baseStyle,
        backgroundImage: `url(${COLD_URL})`,
      };
    }

    if (weather.temp > threshold) {
      return {
        ...baseStyle,
        backgroundImage: `url(${HOT_URL})`,
      };
    }

    return {
      ...baseStyle,
      backgroundImage: `url(${NIGHT_URL})`,
    };
  };
  
  const formatBackground = () => {

    if (!weather) return "from-cyan-400 to-blue-700";
    
    if (weather.details.includes("Rain")) return "from-purple-950 to-fuchsia-200"
    
    if(!weather.sunrise) return "from-black to-transparent" 
   
    const threshold = units === "metric" ? 15 : 60;
    
    if (weather.temp <= threshold) return "from-slate-950 to-slate-300";

    if(weather.temp >= 20) return "from-orange-700 to-yellow-300";

    return "from-yellow-300 to-orange-700";
};


  return (
  
    <div
      className="grid place-items-center h-screen"
      style={ground()} // Dynamically applies background only for non-mobile devices
    >
    
      <div
        className={` ${formatBackground()}`}
        style={{ opacity: 0.8 }}
      >
        <TopButtons setQuery={setQuery} />
        <Input setQuery={setQuery} setUnits={setUnits} />

        {weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TemperatureAndDetails weather={weather} units={units} />
            <Forecast title="3 hour step forecast" data={weather.hourly} />
            <Forecast title="daily forecast" data={weather.daily} />
          </>
        )}

        <ToastContainer autoClose={800} theme="colored" hideProgressBar={true} />
      </div>
      
    </div>
    
  );
}  

export default App; 


