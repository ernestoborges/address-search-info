import { GoogleMap, Marker } from '@react-google-maps/api';
import { useContext, useEffect } from 'react';
import PlaceContext from '../../contexts/PlaceProvider';
import "./styles.css"

export function Map() {

    const center = useContext(PlaceContext)?.center;
    const place = useContext(PlaceContext)?.place;
    const map = useContext(PlaceContext)?.map;
    const setMap = useContext(PlaceContext)?.setMap;

    useEffect(() => {
        if (place) {
            map?.panTo(place)
        }
    }, [place])

    return (
        <>
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={center}
                zoom={12}
                options={{
                    zoomControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    fullscreenControl: false
                }}
                onLoad={(map) => {
                    if (setMap)
                        setMap(map);
                        if (place)
                            map.panTo(place);
                }
                }
            >
                {place && <Marker position={place} />}
            </GoogleMap>
        </>
    )
}