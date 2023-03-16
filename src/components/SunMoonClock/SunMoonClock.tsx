import "./styles.css"
import { useContext, useEffect, useState } from "react";
import WeatherDataContext from "../../contexts/WeatherDataProvider";
import { IoIosMoon, IoIosSunny } from "react-icons/io"
import { astroPosition, clockDotsPosition, conicString, moonPhasePicker } from "../../functions/functions";

export function SunMoonClock() {

    const astroData = useContext(WeatherDataContext)?.weatherData?.forecast.forecastday[0].astro;
    const localtionData = useContext(WeatherDataContext)?.weatherData?.location;

    const [astroPosDegree, setAstroPosDegree] = useState({
        sun: {
            startDegree: 0,
            endDegree: 0,
            currentHourDegree: 0
        },
        moon: {
            startDegree: 0,
            endDegree: 0,
            currentHourDegree: 0
        }
    })

    useEffect(() => {
        if (astroData && localtionData)
            setAstroPosDegree(
                astroPosition(
                    astroData.sunrise,
                    astroData.sunset,
                    astroData.moonrise,
                    astroData.moonset,
                    localtionData.localtime
                )
            )    
        
    }, [astroData]);

    return (
        <>
            <div className="sun-moon-wrapper">
                <div className="sun-moon-container">
                    <div
                        className="sun-clock"
                        style={{ backgroundImage: conicString(astroPosDegree.sun.startDegree, astroPosDegree.sun.endDegree, "#FBEF00", "#2B2D18") }}
                    >
                        <div>
                            <div
                                className="moon-clock"
                                style={{ backgroundImage: conicString(astroPosDegree.moon.startDegree, astroPosDegree.moon.endDegree, "#DEDEDE", "#3D3D3D") }}>
                                <div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clock-border">
                        {
                            [...Array(24)].map((_, i) => (
                                <div key={i} className="clock-hour-point" style={clockDotsPosition(100, 100, i, 24, 55)}></div>
                            ))
                        }
                    </div>
                    <div className="clock-border-title">
                        <span style={clockDotsPosition(100, 100, 0, 4, 68)} >24</span>
                        <span style={clockDotsPosition(100, 100, 1, 4, 68)} >6</span>
                        <span style={clockDotsPosition(100, 100, 2, 4, 68)} >12</span>
                        <span style={clockDotsPosition(100, 100, 3, 4, 68)} >18</span>
                    </div>
                    <div className="clock-display">
                        <div>
                            <div className="moon-phase-container">
                                <div className="moon-icon-container">
                                    <img src="images/weather/moon-small.png"></img>
                                    <div></div>
                                    {
                                        astroData && moonPhasePicker(astroData?.moon_phase)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clock-sunmoon-icons">
                        <IoIosSunny style={clockDotsPosition(
                            100,
                            100,
                            (astroPosDegree.sun.startDegree + astroPosDegree.sun.endDegree) / 2,
                            360,
                            45
                        )} />
                        <IoIosMoon style={clockDotsPosition(
                            100,
                            100,
                            (astroPosDegree.moon.startDegree + astroPosDegree.moon.endDegree) / 2,
                            360,
                            31)} />
                    </div>
                    <div className="clock-pointer">
                        <span style={clockDotsPosition(100, 100, astroPosDegree.sun.currentHourDegree + 180, 360, 45)}></span>
                        <span style={clockDotsPosition(100, 100, astroPosDegree.sun.currentHourDegree + 180, 360, 31)}></span>
                    </div>
                </div>
            </div>
        </>
    )
}