import { useContext } from "react"
import WeatherDataContext from "../../contexts/WeatherDataProvider"
import "./styles.css"

export function WeekForecast() {

    function weekDay(date: string, i: number) {
        const dateObj = new Date(date);
        return dateObj.toString().split(" ")[0]
    }

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    return (
        <>
            <div>
                <h2>3 day forecasts</h2>
                <span>max/min</span>
            </div>
            <ul className="forecast-days-list">
                {
                    weatherData &&
                    weatherData.forecast.forecastday.map((day, index) =>
                        <>
                            <li key={index}>
                                <div>
                                    <img src={day.day.condition.icon} />
                                    <span>
                                        {`${day.date.split("-")[2]}/${day.date.split("-")[1]}`}
                                    </span>
                                </div>
                                <div>
                                    <span>{weekDay(day.date, index)}.</span>
                                </div>
                                <div>
                                    <div>
                                        <span>{day.day.condition.text}</span>
                                    </div>
                                    <div>
                                        <span>{Math.round(day.day.maxtemp_c)}º</span>
                                        <span>/</span>
                                        <span>{Math.round(day.day.mintemp_c)}º</span>
                                    </div>
                                </div>
                            </li>
                            {index < weatherData.forecast.forecastday.length - 1 && <hr></hr>}
                        </>
                    )
                }
            </ul>
        </>
    )
}