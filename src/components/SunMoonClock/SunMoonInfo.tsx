import { BsSunFill, BsMoonFill } from "react-icons/bs"
import { useContext } from "react";
import WeatherDataContext from "../../contexts/WeatherDataProvider";
import { SunMoonClock } from "./SunMoonClock";
import { hour24Format } from "../../functions/functions";
import { useTranslation } from "react-i18next";

export function SunMoonInfo() {

    const astroData = useContext(WeatherDataContext)?.weatherData?.forecast.forecastday[0].astro;
    const localtionData = useContext(WeatherDataContext)?.weatherData?.location;

    const { t } = useTranslation();

    return (
        <>
            <SunMoonClock />
            <div className="time-name-container">
                <div className="digital-clock-container">
                    <span>{localtionData &&
                        (
                            localtionData.localtime.split(" ")[1].split(":")[0].length > 1
                                ? localtionData.localtime.split(" ")[1].split(":")[0]
                                : "0" + localtionData.localtime.split(" ")[1].split(":")[0]
                        )}</span>
                    <span>:</span>
                    <span>{localtionData && localtionData.localtime.split(" ")[1].split(":")[1]}</span>
                </div>
                <div className="moon-name-container">
                    <span>{astroData && t("sun_moon_clock.moon_phase." + astroData.moon_phase.replace(/\s+/g, '_').toLowerCase()).split(" ")[0]}</span>
                    <span>{astroData && t("sun_moon_clock.moon_phase." + astroData.moon_phase.replace(/\s+/g, '_').toLowerCase()).split(" ")[1]}</span>
                </div>
            </div>
            <div className="table-n-icon-wraper">
                <div className="rise-n-set-table-container">
                    <div className="table">

                        <div className="grid-sun"><BsSunFill /></div>
                        <div className="grid-moon"><BsMoonFill /></div>

                        <div className="grid-sunrise">
                            <div className="grid-astrorise">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5z M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79z"></path></svg>
                            </div>
                            <div>
                                {astroData && hour24Format(astroData.sunrise).split(" ")[0]}
                            </div>
                        </div>
                        <div className="grid-sunset">
                            <div className="grid-astroset">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5z M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79z"></path></svg>
                            </div>
                            <span>
                                {astroData && hour24Format(astroData.sunset).split(" ")[0]}
                            </span>
                        </div>
                        <div className="grid-moonrise">
                            <span>
                                {astroData && hour24Format(astroData.moonrise).split(" ")[0]}
                            </span>
                            <div className="grid-astrorise">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5z M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79z"></path></svg>
                            </div>
                        </div>
                        <div className="grid-moonset">
                            <span>
                                {astroData && hour24Format(astroData.moonset).split(" ")[0]}
                            </span>
                            <div className="grid-astroset">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5z M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}