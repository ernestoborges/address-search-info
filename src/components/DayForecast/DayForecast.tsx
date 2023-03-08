import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { useContext, useEffect, useState } from "react";
import "./styles.css"

export function DayForecast() {

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const [fullDayData, setFullDayData] = useState(weatherData?.forecast.forecastday[0].hour);

    function handleDayData() {
        const hourNow = Number(weatherData?.location.localtime.split(" ")[1].split(":")[0]);
        const todayData = weatherData && weatherData?.forecast.forecastday[0].hour.filter((_, index) => index >= hourNow)
        const tomorrowData = weatherData && weatherData?.forecast.forecastday[1].hour.filter((_, index) => index <= hourNow)
        todayData && tomorrowData && setFullDayData(todayData.concat(tomorrowData))

    }

    const handleTemperatureBarSize = (tempNow: number) => {
        const higherTemp = fullDayData ? Math.max(...fullDayData.map((day) => day.temp_c)) : 0
        const lowerTemp = fullDayData ? Math.min(...fullDayData.map((day) => day.temp_c)) : 0

        return ((tempNow - lowerTemp) * 100) / (higherTemp - lowerTemp) + 10
    }

    useEffect(() => {
        handleDayData();
    }, [weatherData])

    return (
        <>
            <h2>24 hours forecast</h2>
            <ul>
                {
                    fullDayData && fullDayData.map((hour, index) => (
                        <li key={index}>
                            <span className="temperature-data">
                                {Math.round(hour.temp_c)}º
                            </span>
                            <div
                                className="temperature-bar"
                                style={{ height: handleTemperatureBarSize(hour.temp_c) + "px" }}
                            >
                            </div>
                            <span className="extra-data">
                                <img src={hour.condition.icon} />
                                <span>
                                    {hour.gust_kph + "km/h"}
                                </span>
                                <span>
                                    {hour.time.split(" ")[1]}
                                </span>
                            </span>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}