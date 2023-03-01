import "./styles.css"
import { useContext, useEffect, useState } from "react";
import PlaceContext from "../../contexts/PlaceProvider";
import WeatherDataContext from "../../contexts/WeatherDataProvider";

export function WeatherData() {
    // const [weatherData, setWeatherData] = useState<WeatherApiResponse>();

    const place = useContext(PlaceContext)?.place;

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const setWeatherData = useContext(WeatherDataContext)?.setWeatherData;

    const weatherHTTP = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_REACT_APP_WEATHERAPI_API_KEY}&q=${place?.lat},${place?.lng}`

    async function fetchWeatherData() {
        try {
            const response = await fetch(weatherHTTP);
            const data = await response.json();
            if(setWeatherData) setWeatherData(data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (place?.lat !== undefined) {
            fetchWeatherData();
        }
    }, [place])

    return (
        <>
            <article>
                <header><h2>Location</h2></header>
                <section>
                    <p>Name: {weatherData?.location.name}</p>
                    <p>State: {weatherData?.location.region}</p>
                    <p>Country: {weatherData?.location.country}</p>
                    <p>Latitude: {weatherData?.location.lat}</p>
                    <p>Longitude: {weatherData?.location.lon}</p>
                </section>
            </article>
            <article>
                <header><h2>Weather</h2></header>
                <section>
                    <p>Temperature: {weatherData?.current.temp_c} ºC, {weatherData?.current.temp_f} F </p>
                    <p>Feels Like: {weatherData?.current.feelslike_c} ºC, {weatherData?.current.feelslike_f} F</p>
                    <p>Wind: {weatherData?.current.wind_kph} km/h, {weatherData?.current.wind_mph} m/h</p>
                    <p>Wind Direction: {weatherData?.current.wind_dir}</p>
                    <p>Pressure: {weatherData?.current.pressure_mb} Millibar</p>
                    <p>Humidity: {weatherData?.current.humidity}</p>
                    <p>UV: {weatherData?.current.uv}</p>
                    <p>Desc: {weatherData?.current.condition.text}</p>
                </section>
            </article>
        </>
    )

}