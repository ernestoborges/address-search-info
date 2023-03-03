import "./styles.css"
import { useContext, useState } from "react"
import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { simplifyWeatherCloud } from "../../functions/functions";

export function SummarizedInfo() {

    const weatherData = useContext(WeatherDataContext)?.weatherData;

    return (
        <section className="summarized-info-section">
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
                            {`${"00"}º`}
                        </span>
                        /
                        <span className="min">
                            {`${"00"}º`}
                        </span>
                    </div>
                </div>
                <div className="condition-name">
                    <span>
                        {weatherData?.current.condition.text}
                    </span>
                </div>
            </div>
        </section>
    )
}