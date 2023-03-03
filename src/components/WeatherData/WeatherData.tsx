import "./styles.css"
import { useContext, useEffect, useState } from "react";
import PlaceContext from "../../contexts/PlaceProvider";
import WeatherDataContext from "../../contexts/WeatherDataProvider";

export function WeatherData() {

    const place = useContext(PlaceContext)?.place;

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const setWeatherData = useContext(WeatherDataContext)?.setWeatherData;
    const astroData = useContext(WeatherDataContext)?.weatherData?.forecast.forecastday[0].astro;

    const weatherHTTP = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_REACT_APP_WEATHERAPI_API_KEY}&q=${place?.lat},${place?.lng}&days=3&aqi=no&alerts=no`

    async function fetchWeatherData() {
        try {
            const response = await fetch(weatherHTTP);
            const weatherData = await response.json();
            if (setWeatherData) setWeatherData(weatherData);
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
            <article>
                <header><h2>Atro</h2></header>
                <section>
                    <p>time: {weatherData?.location.localtime}</p>
                    <p>sunrise: {astroData?.sunrise} </p>
                    <p>sunset:  {astroData?.sunset}</p>
                    <p>moonrise:  {astroData?.moonrise}</p>
                    <p>moonset:  {astroData?.moonset}</p>
                    <p>moon_phase:  {astroData?.moon_phase}</p>
                    <p>moon_illumination:  {astroData?.moon_illumination}</p>
                    <p>is_moon_up:  {astroData?.is_moon_up}</p>
                    <p>is_sun_up: {astroData?.is_sun_up}</p>
                </section>
            </article>
        </>
    )

}