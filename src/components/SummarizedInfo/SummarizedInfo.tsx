import "./styles.css"
import { useContext, useState } from "react"
import WeatherDataContext from "../../contexts/WeatherDataProvider"

export function SummarizedInfo() {

    const weatherData = useContext(WeatherDataContext)?.weatherData;

    function simplifyWeatherCloud(condition:string) {
        if (
            condition === "Sunny" ||
            condition === "Clear"
        ) {
            return("clean");
        }
        if (condition === "Partly cloudy") {
            return("partial-cloud");
        }
        if (condition === "Cloudy" ||
            condition === "Overcast" ||
            condition === "Mist") {
                return("cloudy");
        }
        if (
            condition === "Patchy light drizzle" ||
            condition === "Light drizzle" ||
            condition === "Freezing drizzle" ||
            condition === "Heavy freezing drizzle" ||
            condition === "Light rain shower" ||
            condition === "Patchy rain possible" ||
            condition === "Light rain" ||
            condition === "Moderate rain at times" ||
            condition === "Light freezing rain" ||
            condition === "Patchy light rain" ||
            condition === "Light sleet" ||
            condition === "Moderate or heavy sleet" ||
            condition === "Light sleet showers" ||
            condition === "Moderate or heavy sleet showers"
        ) {
            return("rain");
        }

        if (
            condition === "Moderate or heavy freezing rain" ||
            condition === "Patchy light rain with thunder" ||
            condition === "Moderate or heavy rain with thunder" ||
            condition === "Moderate or heavy rain shower" ||
            condition === "Heavy rain" ||
            condition === "Torrential rain shower" ||
            condition === "Thundery outbreaks possible"
        ) {
            return("storm");
        }
        if (
            condition === "Patchy light snow with thunder" ||
            condition === "Moderate or heavy snow with thunder" ||
            condition === "Light snow showers" ||
            condition === "Patchy snow possible" ||
            condition === "Patchy snow possible" ||
            condition === "Patchy snow possible" ||
            condition === "Blowing snow" ||
            condition === "Patchy snow possible" ||
            condition === "Patchy snow possible" ||
            condition === "Patchy light snow" ||
            condition === "Light snow" ||
            condition === "Patchy moderate snow" ||
            condition === "Moderate snow" ||
            condition === "Patchy heavy snow" ||
            condition === "Heavy snow" ||
            condition === "Moderate or heavy snow showers" ||
            condition === "Blizzard" ||
            condition === "Ice pellets" ||
            condition === "Light showers of ice pellets" ||
            condition === "Moderate or heavy showers of ice pellets" ||
            condition === "Patchy freezing possible"

        ) {
            return("snow");
        }
        if (
            condition === "Fog" ||
            condition === "Freezing fog") {
                return("fog");
        }
    }

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