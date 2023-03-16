import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { useContext, useState } from "react"
import "./styles.css"

export function MiscInfo() {

    const weatherData = useContext(WeatherDataContext)?.weatherData;

    const [isDetailsOn, setIsDetailsOn] = useState(false);

    function indexToText(index: number) {
        switch (index) {
            case 1: return ("Good")
            case 2: return ("Moderate")
            case 3: return ("Unhealthy for Sensitive Groups")
            case 4: return ("Unhealthy")
            case 5: return ("Very Unhealthy")
            case 6: return ("Hazardous")
            default:
                break;
        }
    }

    return (
        <>
            {
                weatherData &&
                <>
                    <div className="lists-wrapper">
                        <div className={`misc-lists-container ${!isDetailsOn ? "" : "hide-misc-info"}`}>
                            <ul>
                                <li>
                                    <span>Humidity</span>
                                    <span>{weatherData.current.humidity}%</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>Cloud</span>
                                    <span>{weatherData.current.cloud}%</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>Chance of rain</span>
                                    <span>{weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>Feels like</span>
                                    <span>{weatherData.current.feelslike_c} ºC</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>Pressure</span>
                                    <span>{weatherData.current.pressure_mb} mbar</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>UV</span>
                                    <span>{weatherData.current.uv}</span>
                                </li>
                                <hr></hr>
                                <li className="air-quality-item">
                                    <span>EPA Air Quality</span>
                                    <span
                                        className={`air-quality-${weatherData.current.air_quality["us-epa-index"]}`}
                                    >{indexToText(weatherData.current.air_quality["us-epa-index"])}</span>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <span>EPA</span>
                                    <span>{weatherData.current.air_quality["us-epa-index"]}</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>CO</span>
                                    <span>{weatherData.current.air_quality.co.toFixed(1)}</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>NO<sub>2</sub></span>
                                    <span>{weatherData.current.air_quality.no2.toFixed(1)}</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>O<sub>3</sub></span>
                                    <span>{weatherData.current.air_quality.o3.toFixed(1)}</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>SO<sub>2</sub></span>
                                    <span>{weatherData.current.air_quality.so2.toFixed(1)}</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>PM2.5</span>
                                    <span>{weatherData.current.air_quality.pm2_5.toFixed(1)}</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>PM10</span>
                                    <span>{weatherData.current.air_quality.pm10.toFixed(1)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <button onClick={() => setIsDetailsOn(!isDetailsOn)}>{`${isDetailsOn ? "hide" : "show"} details`}</button>
                </>
            }
        </>
    )
}