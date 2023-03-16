import "./styles.css"
import { useContext, useState } from "react"
import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { simplifyWeatherCloud } from "../../functions/functions";
import { useTranslation } from "react-i18next";
import MetricsContext from "../../contexts/MetricsProvider";

export function SummarizedInfo() {

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const metrics = useContext(MetricsContext)?.metrics;

    const { t } = useTranslation();

    function handleTemperatureSign() {
        if (weatherData)
            switch (metrics?.temperature) {
                case "c": return weatherData?.current.temp_c < 0
                case "f": return weatherData?.current.temp_f < 0
                default: return false
            }
    }

    function handleTemperatureValue() {
        if (weatherData)
            switch (metrics?.temperature) {
                case "c": return weatherData?.current.temp_c
                case "f": return weatherData?.current.temp_f
                default: return 0
            }
        return 0
    }

    function handleMaxMinValue(key: string) {
        if (weatherData) {
            if (key === "max")
                switch (metrics?.temperature) {
                    case "c": return weatherData?.forecast.forecastday[0].day.maxtemp_c
                    case "f": return weatherData?.forecast.forecastday[0].day.maxtemp_f
                    default: return 0
                }
            if (key === "min")
                switch (metrics?.temperature) {
                    case "c": return weatherData?.forecast.forecastday[0].day.mintemp_c
                    case "f": return weatherData?.forecast.forecastday[0].day.mintemp_f
                    default: return 0
                }
        }
        return 0
    }

    return (
        <>
            <img src={`images/weather/${weatherData ? weatherData.current.is_day === 1 ? "day" : "night" : "day"}/${simplifyWeatherCloud(weatherData ? weatherData.current.condition.text : "Sunny")}.jpg`} alt="" />
            <div>
                <div className="place-name">
                    <span>
                        {weatherData?.location.name}
                    </span>
                </div>
                <div className="summarized-info">
                    <span className="value">
                        {weatherData && handleTemperatureSign() && <span className="minus-sign">-</span>}
                        {weatherData && Math.round(Math.abs(handleTemperatureValue()))}
                        <span className="unit">
                            {`º${metrics?.temperature.toUpperCase()}`}
                        </span>
                    </span>
                    <div className="max-min-container">
                        <span className="max">
                            {weatherData && `${Math.round(handleMaxMinValue("max"))}º`}
                        </span>
                        /
                        <span className="min">
                            {weatherData && `${Math.round(handleMaxMinValue("min"))}º`}
                        </span>
                    </div>
                </div>
                <div className="condition-name">
                    <span>
                        {t("summarized_info.condition." + weatherData?.current.condition.text.replace(/\s+/g, '_').toLowerCase())}
                    </span>
                </div>
            </div>
        </>
    )
}