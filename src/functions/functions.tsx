import {
    WiMoonAltNew,
    WiMoonAltFull,
    WiMoonAltWaxingCrescent3,
    WiMoonAltWaxingGibbous3,
    WiMoonAltFirstQuarter,
    WiMoonAltWaningGibbous3,
    WiMoonAltThirdQuarter,
    WiMoonAltWaningCrescent3,
} from "react-icons/wi"

export function hour24Format(date: string) {
    if (date.split(" ")[1] === "PM") {
        return (`${(Number(date.split(":")[0]) === 12 ? 12 : Number(date.split(":")[0]) + 12).toString()}:${date.split(" ")[0].split(":")[1]}`)
    }
    return (Number(date.split(":")[0]) >= 12 ? (Number(date.split(":")[0]) - 12).toString() + ":" + date.split(" ")[0].split(":")[1] : date.split(" ")[0])
}

export function conicString(start: number, end: number, background: string, color: string) {
    const val1 = start;
    const val2 = start < end ? (end - start) * 100 / 360 : 100 + (end - start) * 100 / 360;

    return (
        `conic-gradient(from ${val1 - 180}deg at 50% 50%, ${background} ${val2}%, ${color} ${val2}% )`
    )
}

export function astroPosition(sunStart: string, sunEnd: string, moonStart: string, moonEnd: string, current: string) {

    const sunStartDecimalHour = Number(hour24Format(sunStart).split(":")[0]) + (Number(hour24Format(sunStart).split(":")[1]) / 60)
    const sunEndDecimalHour = Number(hour24Format(sunEnd).split(":")[0]) + (Number(hour24Format(sunEnd).split(":")[1]) / 60)
    const sunStartDegree = (sunStartDecimalHour > 24 ? sunStartDecimalHour - 12 : sunStartDecimalHour) * 360 / 24;
    const sunEndDegree = (sunEndDecimalHour > 24 ? sunEndDecimalHour - 12 : sunEndDecimalHour) * 360 / 24;

    const moonStartDecimalHour = Number(hour24Format(moonStart).split(":")[0]) + (Number(hour24Format(moonStart).split(":")[1]) / 60)
    const moonEndDecimalHour = Number(hour24Format(moonEnd).split(":")[0]) + (Number(hour24Format(moonEnd).split(":")[1])) / 60
    const moonStartDegree = moonStartDecimalHour * 360 / 24;
    const moonEndDegree = moonEndDecimalHour * 360 / 24;

    const currentDecimalHour = Number(current.split(" ")[1].split(":")[0]) + (Number(current.split(" ")[1].split(":")[1]) / 60)
    const currentHourDegree = currentDecimalHour * 360 / 24;

    return ({
        sun: {
            startDegree: sunStartDegree,
            endDegree: sunEndDegree,
            currentHourDegree: currentHourDegree - 180
        },
        moon: {
            startDegree: moonStartDegree,
            endDegree: moonEndDegree,
            currentHourDegree: currentHourDegree - 180
        }
    })
}

export function moonPhasePicker(moon: string) {
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

export function clockDotsPosition(width: number, height: number, i: number, dots: number, r: number) {

    const xC = width / 2, yC = height / 2;
    const radius = ((i * 360 / dots) - 90) * Math.PI / 180;

    const x = xC + (r * Math.sin(-radius))
    const y = yC - (r * Math.cos(-radius))

    return ({ top: x + "px", left: y + "px" });
}

export function simplifyWeatherCloud(condition:string) {
    if (
        condition === "Sunny" ||
        condition === "Clear"
    ) {
        return("clean");
    }
    if (condition === "Partly cloudy") {
        return("partial-cloud");
    }
    if (condition === "Cloudy" ||
        condition === "Overcast" ||
        condition === "Mist") {
            return("cloudy");
    }
    if (
        condition === "Patchy light drizzle" ||
        condition === "Light drizzle" ||
        condition === "Freezing drizzle" ||
        condition === "Heavy freezing drizzle" ||
        condition === "Light rain shower" ||
        condition === "Patchy rain possible" ||
        condition === "Light rain" ||
        condition === "Moderate rain" ||
        condition === "Moderate rain at times" ||
        condition === "Light freezing rain" ||
        condition === "Patchy light rain" ||
        condition === "Light sleet" ||
        condition === "Moderate or heavy sleet" ||
        condition === "Light sleet showers" ||
        condition === "Moderate or heavy sleet showers"
    ) {
        return("rain");
    }

    if (
        condition === "Moderate or heavy freezing rain" ||
        condition === "Patchy light rain with thunder" ||
        condition === "Moderate or heavy rain with thunder" ||
        condition === "Moderate or heavy rain shower" ||
        condition === "Heavy rain" ||
        condition === "Torrential rain shower" ||
        condition === "Thundery outbreaks possible"
    ) {
        return("storm");
    }
    if (
        condition === "Patchy light snow with thunder" ||
        condition === "Moderate or heavy snow with thunder" ||
        condition === "Light snow showers" ||
        condition === "Patchy snow possible" ||
        condition === "Patchy snow possible" ||
        condition === "Patchy snow possible" ||
        condition === "Blowing snow" ||
        condition === "Patchy snow possible" ||
        condition === "Patchy snow possible" ||
        condition === "Patchy light snow" ||
        condition === "Light snow" ||
        condition === "Patchy moderate snow" ||
        condition === "Moderate snow" ||
        condition === "Patchy heavy snow" ||
        condition === "Heavy snow" ||
        condition === "Moderate or heavy snow showers" ||
        condition === "Blizzard" ||
        condition === "Ice pellets" ||
        condition === "Light showers of ice pellets" ||
        condition === "Moderate or heavy showers of ice pellets" ||
        condition === "Patchy freezing possible"

    ) {
        return("snow");
    }
    if (
        condition === "Fog" ||
        condition === "Freezing fog") {
            return("fog");
    }
}
