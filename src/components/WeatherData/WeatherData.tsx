import "./styles.css"
import { useContext, useEffect, useState } from "react";
import PlaceContext from "../../contexts/PlaceProvider";

interface WeatherApiResponse {
    location: {
        name: string;
        region: string;
        country: string;
        lat: number;
        lon: number;
        tz_id: string;
        localtime_epoch: string;
        localtime: string;
    };
    current: {
        last_updated_epoch: number;
        last_updated: string;
        temp_c: number;
        temp_f: number;
        is_day: number;
        condition: {
            text: string;
            icon: string;
            code: number;
        }
        wind_mph: number;
        wind_kph: number;
        wind_degree: number;
        wind_dir: string;
        pressure_mb: number;
        pressure_in: number;
        humidity: number;
        cloud: number;
        feelslike_c: number;
        feelslike_f: number;
        vis_km: number;
        vis_miles: number;
        uv: number;
        gust_mph: number;
        gust_kph: number;
    }
}

export function WeatherData() {
    const [weatherData, setWeatherData] = useState<WeatherApiResponse>();

    const place = useContext(PlaceContext)?.place;

    const weatherHTTP = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_REACT_APP_WEATHERAPI_API_KEY}&q=${place?.lat},${place?.lng}`

    async function fetchWeatherData() {
        try {
            const response = await fetch(weatherHTTP);
            const data = await response.json();
            setWeatherData(data);
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
                </section>
            </article>
        </>
    )

}