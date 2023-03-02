import {
    WiMoonAltNew,
    WiMoonAltFull,
    WiMoonAltWaxingCrescent3,
    WiMoonAltWaxingGibbous3,
    WiMoonAltFirstQuarter,
    WiMoonAltWaningGibbous3,
    WiMoonAltThirdQuarter,
    WiMoonAltWaningCrescent3,
    // WiMoonAltWaxing6
} from "react-icons/wi"

import { BsSunFill, BsMoonFill } from "react-icons/bs"
import { useContext } from "react";
import WeatherDataContext from "../../contexts/WeatherDataProvider";
import { SunMoonClock } from "./SunMoonClock";


export function SunMoonInfo() {

    const astroData = useContext(WeatherDataContext)?.astroData;

    function moonPhasePicker(moon: string) {
        switch (moon) {
            case "Full Moon":
                return <WiMoonAltFull />
            case "Waning Gibbous":
                return <WiMoonAltWaningGibbous3 />
            case "Last Quarter":
                return <WiMoonAltThirdQuarter />
            case "Waning Crescent":
                return <WiMoonAltWaningCrescent3 />
            case "New Moon":
                return <WiMoonAltNew />
            case "Waxing Crescent":
                return <WiMoonAltWaxingCrescent3 />
            case "First Quarter":
                return <WiMoonAltFirstQuarter />
            case "Waxing Gibbous":
                return <WiMoonAltWaxingGibbous3 />
        }
    }
    return (
        <>
            <SunMoonClock />
            <div className="table-n-icon-wraper">
                <div className="rise-n-set-table-container">
                    <div className="table">
                        <div className="row">
                            <div></div>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708l1.5-1.5z M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79z"></path></svg>
                            </div>
                            <div>
                                <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 10" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708l1.5 1.5z M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79z"></path></svg>
                            </div>
                        </div>
                        <div className="row">
                            <div><BsSunFill /></div>
                            <div>{astroData && astroData.astronomy.astro.sunrise.split(" ")[0]}</div>
                            <div>{astroData && astroData.astronomy.astro.sunset.split(" ")[0]}</div>
                        </div>
                        <div className="row">
                            <div><BsMoonFill /></div>
                            <div>{astroData && astroData.astronomy.astro.moonrise.split(" ")[0]}</div>
                            <div>{astroData && astroData.astronomy.astro.moonset.split(" ")[0]}</div>
                        </div>
                    </div>
                </div>
                <div className="moon-phase-container">
                    <div className="moon-icon-container">
                        <img src="images/weather/moon-small.png"></img>
                        <div></div>
                        {
                            astroData && moonPhasePicker(astroData?.astronomy.astro.moon_phase)
                        }
                    </div>
                    <span>{astroData && astroData.astronomy.astro.moon_phase.split(" ")[0]}</span>
                    <span>{astroData && astroData.astronomy.astro.moon_phase.split(" ")[1]}</span>

                </div>
            </div>
        </>
    )
}