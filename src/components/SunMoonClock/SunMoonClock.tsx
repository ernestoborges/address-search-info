import "./styles.css"
import { useContext, useEffect, useState } from "react";
import WeatherDataContext from "../../contexts/WeatherDataProvider";

export function SunMoonClock() {

    const astroData = useContext(WeatherDataContext)?.astroData;

    const [sunPosDegree, setSunPosDegree] = useState({
        startDegree: 0,
        endDegree: 0,
        currentHourDegree: 0
    });
    const [moonPosDegree, setMoonPosDegree] = useState({
        startDegree: 0,
        endDegree: 0,
        currentHourDegree: 0
    });

    function hour24Format(date: string) {
        if (date.split(" ")[1] === "PM") {
            return (`${(Number(date.split(":")[0]) + 12).toString()}:${date.split(" ")[0].split(":")[1]}`)
        }
        return (Number(date.split(":")[0]) >= 12 ? (Number(date.split(":")[0]) - 12).toString() + ":" + date.split(" ")[0].split(":")[1] : date.split(" ")[0])

    }

    function astroPosDegree(sunStart: string, sunEnd: string, moonStart: string, moonEnd: string, current: string) {

        const sunStartDecimalHour = Number(hour24Format(sunStart).split(":")[0]) + (Number(hour24Format(sunStart).split(":")[1]) / 60)
        const sunEndDecimalHour = Number(hour24Format(sunEnd).split(":")[0]) + (Number(hour24Format(sunEnd).split(":")[1]) / 60)

        const moonStartDecimalHour = Number(hour24Format(moonStart).split(":")[0]) + (Number(hour24Format(moonStart).split(":")[1]) / 60)
        const moonEndDecimalHour = Number(hour24Format(moonEnd).split(":")[0]) + (Number(hour24Format(moonEnd).split(":")[1])) / 60

        const currentDecimalHour = Number(current.split(" ")[1].split(":")[0]) + (Number(current.split(" ")[1].split(":")[1]) / 60)

        const sunStartDegree = (sunStartDecimalHour > 24 ? sunStartDecimalHour - 12 : sunStartDecimalHour) * 360 / 24;
        const sunEndDegree = (sunEndDecimalHour > 24 ? sunEndDecimalHour - 12 : sunEndDecimalHour) * 360 / 24;

        const moonStartDegree = moonStartDecimalHour * 360 / 24;
        const moonEndDegree = moonEndDecimalHour * 360 / 24;

        const currentHourDegree = currentDecimalHour * 360 / 24;

        setSunPosDegree({
            startDegree: sunStartDegree,
            endDegree: sunEndDegree,
            currentHourDegree: currentHourDegree - 180
        });

        setMoonPosDegree({
            startDegree: moonStartDegree,
            endDegree: moonEndDegree,
            currentHourDegree: currentHourDegree - 180
        })
    }

    function conicString(start: number, end: number, background: string, color: string) {

        const val1 = start;
        const val2 = start < end ? (end - start) * 100 / 360 : 100 + (end - start) * 100 / 360;

        return (
            `conic-gradient(from ${val1 - 180}deg at 50% 50%, ${background} ${val2}%, ${color} ${val2}% )`
        )
    }

    useEffect(() => {
        if (astroData)
            astroPosDegree(
                astroData.astronomy.astro.sunrise,
                astroData.astronomy.astro.sunset,
                astroData.astronomy.astro.moonrise,
                astroData.astronomy.astro.moonset,
                astroData.location.localtime
            )
    }, [astroData]);

    function clockDotsPosition(i: number, dots: number, r: number) {
        const width = 100;
        const height = 100;
        const xC = width / 2, yC = height / 2;
        const radius = ((i * 360 / dots) - 90) * Math.PI / 180;

        const x = xC + (r * Math.sin(-radius))
        const y = yC - (r * Math.cos(-radius))

        return ({ top: x + "px", left: y + "px" });
    }

    return (
        <>
            <div className="sun-moon-wrapper">
                <div className="sun-moon-container">
                    <div
                        className="sun-clock"
                        style={{ backgroundImage: conicString(sunPosDegree.startDegree, sunPosDegree.endDegree, "#FBEF00", "#2B2D18") }}
                    >
                        <div>
                            <div
                                className="moon-clock"
                                style={{ backgroundImage: conicString(moonPosDegree.startDegree, moonPosDegree.endDegree, "#DEDEDE", "#3D3D3D") }}>
                                <div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="clock-border">
                        {
                            [...Array(24)].map((_, i) => (
                                <div key={i} className="clock-hour-point" style={clockDotsPosition(i, 24, 55)}></div>
                            ))
                        }
                    </div>
                    <div className="clock-border-title">
                        <span style={clockDotsPosition(0, 4, 68)} >24</span>
                        <span style={clockDotsPosition(1, 4, 68)} >6</span>
                        <span style={clockDotsPosition(2, 4, 68)} >12</span>
                        <span style={clockDotsPosition(3, 4, 68)} >18</span>
                    </div>
                    <div className="clock-pointer">
                        <span style={clockDotsPosition(sunPosDegree.currentHourDegree + 180, 360, 45)}></span>
                        <span style={clockDotsPosition(sunPosDegree.currentHourDegree + 180, 360, 30)}></span>
                    </div>
                </div>
            </div>
            {/* 
        {sunPosDegree.startDegree}<br />
        {sunPosDegree.endDegree}<br />
        {moonPosDegree.startDegree}<br />
        {moonPosDegree.endDegree}<br />
        {Math.abs(moonPosDegree.endDegree - moonPosDegree.startDegree) * 100 / 360} */}
        </>
    )
}