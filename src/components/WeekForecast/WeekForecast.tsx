import { useContext } from "react"
import { useTranslation } from "react-i18next";
import MetricsContext from "../../contexts/MetricsProvider";
import WeatherDataContext from "../../contexts/WeatherDataProvider"
import "./styles.css"

export function WeekForecast() {

    const { t } = useTranslation();

    function weekDay(date: string, i: number) {
        const dateObj = new Date(date);
        return dateObj.toString().split(" ")[0]
    }

    const weatherData = useContext(WeatherDataContext)?.weatherData;
    const metrics = useContext(MetricsContext)?.metrics

    function handleTemperatureValue(
        day: {
            maxtemp_c: number;
            maxtemp_f: number;
            mintemp_c: number;
            mintemp_f: number;
        },
        maxmin: string
    ) {

        if (maxmin === "max") {
            switch (metrics?.temperature) {
                case "c": return day.maxtemp_c
                case "f": return day.maxtemp_f
                default: return 0
            }
        }
        else if (maxmin === "min") {
            switch (metrics?.temperature) {
                case "c": return day.mintemp_c
                case "f": return day.mintemp_f
                default: return 0
            }
        } else {
            return 0
        }

    }

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
                                    <span>{t("week_forecast.weekday." + weekDay(day.date, index).toLocaleLowerCase())}.</span>
                                </div>
                                <div>
                                    <div>
                                        <span>{t("summarized_info.condition." + day.day.condition.text.replace(/\s+/g, '_').toLowerCase())}</span>
                                    </div>
                                    <div>
                                        <span>{Math.round(handleTemperatureValue(day.day, "max"))}º</span>
                                        <span>/</span>
                                        <span>{Math.round(handleTemperatureValue(day.day, "min"))}º</span>
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