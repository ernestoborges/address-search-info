import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { useContext, useState } from "react"
import "./styles.css"
import { useTranslation } from "react-i18next"


export function MiscInfo() {

    const { t } = useTranslation();

    const weatherData = useContext(WeatherDataContext)?.weatherData;

    const [isDetailsOn, setIsDetailsOn] = useState(false);

    return (
        <>
            {
                weatherData &&
                <>
                    <div className="lists-wrapper">
                        <div className={`misc-lists-container ${!isDetailsOn ? "" : "hide-misc-info"}`}>
                            <ul>
                                <li>
                                    <span>{t("misc_info.humidity")}</span>
                                    <span>{weatherData.current.humidity}%</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>{t("misc_info.cloud")}</span>
                                    <span>{weatherData.current.cloud}%</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>{t("misc_info.chance_of_rain")}</span>
                                    <span>{weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>{t("misc_info.feels_like")}</span>
                                    <span>{weatherData.current.feelslike_c} ºC</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>{t("misc_info.pressure")}</span>
                                    <span>{weatherData.current.pressure_mb} mbar</span>
                                </li>
                                <hr></hr>
                                <li>
                                    <span>{t("misc_info.uv")}</span>
                                    <span>{weatherData.current.uv}</span>
                                </li>
                                <hr></hr>
                                <li className="air-quality-item">
                                    <span>{t("misc_info.epa_air_quality")}</span>
                                    <span
                                        className={`air-quality-${weatherData.current.air_quality["us-epa-index"]}`}
                                    >{t(`misc_info.epa_index.${weatherData.current.air_quality["us-epa-index"]}`)}</span>
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
                    <button onClick={() => setIsDetailsOn(!isDetailsOn)}>{`${isDetailsOn ? t("misc_info.hide") : t("misc_info.show")} ${t("misc_info.details")}`}</button>
                </>
            }
        </>
    )
}