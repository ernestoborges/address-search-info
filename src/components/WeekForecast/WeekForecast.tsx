import { useContext } from "react"
import { useTranslation } from "react-i18next";
import WeatherDataContext from "../../contexts/WeatherDataProvider"
import "./styles.css"

export function WeekForecast() {

    const {t} = useTranslation();

    function weekDay(date: string, i: number) {
        const dateObj = new Date(date);
        return dateObj.toString().split(" ")[0]
    }

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    return (
        <>
            <div>
                <h2>{t("week_forecast.title")}</h2>
                <span>{t("week_forecast.high")}/{t("week_forecast.low")}</span>
            </div>
            <ul className="forecast-days-list">
                {
                    weatherData &&
                    weatherData.forecast.forecastday.map((day, index) => (
                        <li key={index}>
                            <div className="list-content">
                                <div>
                                    <img src={day.day.condition.icon} />
                                    <span>
                                        {`${day.date.split("-")[2]}/${day.date.split("-")[1]}`}
                                    </span>
                                </div>
                                <div>
                                    <span>{t("week_forecast.weekday."+weekDay(day.date, index).toLocaleLowerCase())}.</span>
                                </div>
                                <div>
                                    <div>
                                        <span>{t("summarized_info.condition."+day.day.condition.text.replace(/\s+/g, '_').toLowerCase())}</span>
                                    </div>
                                    <div>
                                        <span>{Math.round(day.day.maxtemp_c)}º</span>
                                        <span>/</span>
                                        <span>{Math.round(day.day.mintemp_c)}º</span>
                                    </div>
                                </div>
                            </div>
                            {weatherData.forecast.forecastday.length - 1 > index && <hr></hr>}
                        </li>
                    ))
                }
            </ul>
        </>
    )
}