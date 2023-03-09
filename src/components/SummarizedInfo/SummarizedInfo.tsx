import "./styles.css"
import { useContext, useState } from "react"
import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { simplifyWeatherCloud } from "../../functions/functions";
import { useTranslation } from "react-i18next";

export function SummarizedInfo() {

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const {t} = useTranslation();

    return (
       <>
            <img src={`images/weather/${weatherData ? weatherData.current.is_day === 1 ? "day" : "night" : "day"}/${simplifyWeatherCloud(weatherData ? weatherData.current.condition.text:"Sunny")}.jpg`} alt="" />
            <div>
                <div className="place-name">
                    <span>
                        {weatherData?.location.name}
                    </span>
                </div>
                <div className="summarized-info">
                    <span className="value">
                        {weatherData && weatherData?.current.temp_c < 0 && <span className="minus-sign">-</span>}
                        {weatherData && Math.abs(weatherData.current.temp_c).toString().split(".")[0]}
                        <span className="unit">ºC</span>
                    </span>
                    <div className="max-min-container">
                        <span className="max">
                            {weatherData && `${Math.round(weatherData?.forecast.forecastday[0].day.maxtemp_c)}º`}
                        </span>
                        /
                        <span className="min">
                            {weatherData && `${Math.round(weatherData?.forecast.forecastday[0].day.mintemp_c)}º`}
                        </span>
                    </div>
                </div>
                <div className="condition-name">
                    <span>
                        {t("summarized_info.condition."+weatherData?.current.condition.text.replace(/\s+/g, '_').toLowerCase())}
                    </span>
                </div>
            </div>
        </>
    )
}