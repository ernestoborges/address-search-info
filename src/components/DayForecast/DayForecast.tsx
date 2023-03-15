import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import "./styles.css"
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion"


export function DayForecast() {

    const [containerKey, setContainerKey] = useState(0);
    const [leftConstraint, setLeftConstraint] = useState(0);

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const [fullDayData, setFullDayData] = useState(weatherData?.forecast.forecastday[0].hour);
    const [temperatureRange, setTemperatureRange] = useState({ max: 0, min: 0 });

    const { t } = useTranslation();

    function handleDayData() {
        const hourNow = Number(weatherData?.location.localtime.split(" ")[1].split(":")[0]);
        const todayData = weatherData && weatherData?.forecast.forecastday[0].hour.filter((_, index) => index >= hourNow)
        const tomorrowData = weatherData && weatherData?.forecast.forecastday[1].hour.filter((_, index) => index <= hourNow)
        todayData && tomorrowData && setFullDayData(todayData.concat(tomorrowData))
    }

    const handleLeftConstraint = useCallback(() => {
        const el = document.getElementById("carousel-id");
        if (el) {
            setLeftConstraint(el.scrollWidth - el.offsetWidth);
        }
    }, ["carousel-id"])

    const handleTemperatureBarSize = (tempNow: number) => {
        const {max, min} = temperatureRange
        return ((tempNow - min) * 100) / (max - min) + 10
    }

    useEffect(() => {
        handleDayData();
    }, [weatherData])

    useMemo(() => {
        const max = fullDayData ? Math.max(...fullDayData.map((day) => day.temp_c)) : 0
        const min = fullDayData ? Math.min(...fullDayData.map((day) => day.temp_c)) : 0
        setTemperatureRange({
            max: max,
            min: min
        })
    }, [fullDayData])

    useEffect(() => {
        const handleResize = () => {
            setContainerKey((prev) => prev + 1);
            handleLeftConstraint();
        };
        window.addEventListener("resize", handleResize);
        handleLeftConstraint();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleLeftConstraint]);

    return (
        <>
            <h2>{t("day_forecast.title")}</h2>
            <motion.div

                className="carousel"
                whileTap={{ cursor: "grabbing" }}
            >
                <motion.ul
                    className="scroll-container"
                    drag="x"
                    id="carousel-id"
                    key={containerKey}
                    dragConstraints={{
                        right: 0,
                        left: -leftConstraint
                    }}
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