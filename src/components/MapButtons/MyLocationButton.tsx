import "./styles.css"
import { IoLocationOutline, IoLocationSharp } from "react-icons/io5"
import { useContext } from "react";
import PlaceContext from "../../contexts/PlaceProvider";

export function MyLocationButton() {

    const place = useContext(PlaceContext)?.place;
    const map = useContext(PlaceContext)?.map;
    const setPlace = useContext(PlaceContext)?.setPlace;

    function getUserLocation() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const myLocation = { lat: latitude, lng: longitude }
                if(place?.lat !== myLocation.lat || place?.lng !== myLocation.lng){
                    setPlace && setPlace(myLocation);
                } else {
                    if(place){
                        map?.panTo(place)
                    }
                }
            },
            (error) => {
                console.error(error);
            }
        );
    }

    return (
        <>
            <button 
                className="map-button my-location-button"
                onClick={()=>getUserLocation()}    
            >
                <IoLocationSharp />
            </button>
        </>
    )
}