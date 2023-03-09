import "./styles.css"
import { MdOutlineMyLocation } from "react-icons/md"
import { useContext } from "react"
import PlaceContext from "../../contexts/PlaceProvider"
export function CenterMapButton() {

    const place = useContext(PlaceContext)?.place
    const map = useContext(PlaceContext)?.map

    return (
        <>
            <button className="map-button center-map-button" onClick={()=> {
                if(place){
                    map?.panTo(place)
                }
            }}>
                <MdOutlineMyLocation />
            </button>
        </>
    )
}