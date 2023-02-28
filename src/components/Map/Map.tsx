import { GoogleMap, Marker} from '@react-google-maps/api';
import { useContext, useEffect } from 'react';
import PlaceContext from '../../contexts/PlaceProvider';


export function Map() {

    const center = useContext(PlaceContext)?.center;
    const place = useContext(PlaceContext)?.place;
    const map = useContext(PlaceContext)?.map;
    const setMap = useContext(PlaceContext)?.setMap;

    useEffect(()=>{
        if(place){
            map?.panTo(place)
        }
    }, [place])

    return (
        <>
            <GoogleMap
                mapContainerStyle={{ width: "500px", height: "500px" }}
                center={center}
                zoom={15}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
                onLoad = {(map) => {if(setMap)setMap(map)}}
            >
                {place && <Marker position={place} />}
            </GoogleMap>
        </>
    )
}