import WeatherDataContext from "../../contexts/WeatherDataProvider"
import { clockDotsPosition } from "../../functions/functions"
import { useContext } from "react"
import "./styles.css"

export function WindInfo() {

    const subtitles = [
        { text: "s", deg: 180 },
        { text: "ssw", deg: 202.5 },
        { text: "sw", deg: 225 },
        { text: "wsw", deg: 247.5 },
        { text: "w", deg: 270 },
        { text: "wnw", deg: 292.5 },
        { text: "nw", deg: 315 },
        { text: "nnw", deg: 337.5 },
        { text: "n", deg: 0 },
        { text: "nne", deg: 22.5 },
        { text: "ne", deg: 45 },
        { text: "ene", deg: 67.5 },
        { text: "e", deg: 90 },
        { text: "ese", deg: 112.5 },
        { text: "se", deg: 135 },
        { text: "sse", deg: 157.5 },
    ]

    const weatherData = useContext(WeatherDataContext)?.weatherData;

    return (

        <>
            {
                weatherData &&
                <>
                    <div className="wind-info">
                        <h2>Wind</h2>
                        <ul>
                            <li>Speed: {weatherData.current.wind_kph} km/h</li>
                            <hr></hr>
                            <li>Direction: {weatherData.current.wind_dir}</li>
                            <hr></hr>
                            <li>Degree: {weatherData.current.wind_degree}º</li>
                        </ul>
                    </div>
                    <div className="wind-rose-container">
                        <div className="wind-rose">
                            <div className="wind-rose-content-wrapper">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                        <div className="wind-rose-subtitles">
                            <div className="subtitles-wrapper">
                                {
                                    subtitles.map((dir, index) => (
                                        <span
                                            key={index}
                                            className={dir.text == weatherData.current.wind_dir.toLocaleLowerCase() ? "selected-dir" : ""}
                                            style={clockDotsPosition(160, 160, index, subtitles.length, 75)}
                                        >
                                            {dir.text}
                                        </span>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="compas-arrow-container">
                            <div className="compas" style={{ transform: `translate(-50%, -50%) rotate(${weatherData.current.wind_degree}deg)` }}>a</div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}