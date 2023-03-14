import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { useContext, useEffect, useRef, useState } from "react";
import "./styles.css"
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"

export function DayForecast() {

    const carouselRef = useRef();

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const [fullDayData, setFullDayData] = useState(weatherData?.forecast.forecastday[0].hour);

    const { t } = useTranslation();

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
            <h2>{t("day_forecast.title")}</h2>
            <motion.div
                className="carousel"
                whileTap={{ cursor: "grabbing" }}
                ref={carouselRef}
            >
                <motion.ul
                    className="scroll-container"
                    drag="x"
                    dragConstraints={{right: 0, left: -(carouselRef.current?.scrollWidth - carouselRef.current?.offsetWidth)}}
                    style={{width: carouselRef.current?.scrollWidth}}
                >
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
                                        {hour.wind_kph.toFixed(1) + "km/h"}
                                    </span>
                                    <span>
                                        {hour.time.split(" ")[1]}
                                    </span>
                                </span>
                            </li>
                        ))
                    }
                </motion.ul>
            </motion.div>
        </>
    )
}