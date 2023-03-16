import { useContext, useState } from "react"
import { FaRulerHorizontal } from "react-icons/fa"
import MenuButtonsContext from "../../contexts/MenuButtonsProvider"
import MetricsContext from "../../contexts/MetricsProvider";

export function MetricButtons() {

    const openedMenu = useContext(MenuButtonsContext)?.openedMenu;
    const setOpenedMenu = useContext(MenuButtonsContext)?.setOpenedMenu;

    const metrics = useContext(MetricsContext)?.metrics;
    const setMetrics = useContext(MetricsContext)?.setMetrics;

    function handleMetricSelection( key: string,value: string) {
        if (setMetrics)
            setMetrics((prev) => (
                {
                    ...prev,
                    [key]: value
                }
            ))
    }

    return (
        <>
            <button
                className={`map-button metrics-kmph ${metrics?.distance === "km" ? "selected-option" : ""}`}
                onClick={() => handleMetricSelection("distance", "km")}
                style={
                    openedMenu?.metrics === true
                        ? { left: "5rem", bottom: "4rem" }
                        : { left: "1rem", bottom: "6rem" }
                }
            >
                km
            </button>
            <button
                className={`map-button metrics-mph ${metrics?.distance === "mi" ? "selected-option" : ""}`}
                onClick={() => handleMetricSelection("distance", "mi")}
                style={
                    openedMenu?.metrics === true
                        ? { left: "9rem", bottom: "4rem" }
                        : { left: "1rem", bottom: "6rem" }
                }
            >
                mi
            </button>
            <button
                className={`map-button metrics-celcius ${metrics?.temperature === "c" ? "selected-option" : ""}`}
                onClick={() => handleMetricSelection("temperature", "c")}
                style={
                    openedMenu?.metrics === true
                        ? { left: "5rem", bottom: "8rem" }
                        : { left: "1rem", bottom: "6rem" }
                }
            >
                ºC
            </button>
            <button
                className={`map-button metrics-fahrenheit ${metrics?.temperature === "f" ? "selected-option" : ""}`}
                onClick={() => handleMetricSelection("temperature", "f")}
                style={
                    openedMenu?.metrics === true
                        ? { left: "9rem", bottom: "8rem" }
                        : { left: "1rem", bottom: "6rem" }
                }
            >
                ºF
            </button>
            <button
                className="map-button metrics-button"
                onClick={() => {
                    if (setOpenedMenu) {
                        if (openedMenu?.metrics) {
                            setOpenedMenu({
                                metrics: false,
                                lang: false
                            })
                        } else {
                            setOpenedMenu({
                                metrics: true,
                                lang: false
                            })
                        }
                    }
                }}
                style={
                    openedMenu?.metrics === true
                        ? { transform: "rotate(90deg)"}
                        : {}
                }
            >
                <FaRulerHorizontal />
            </button>
        </>
    )
}