import { createContext, SetStateAction, useMemo, useState } from "react";


interface Props {
    children: React.ReactNode
}

interface Place {
    lat: number;
    lng: number;
}

interface ValuesProps {
    place: google.maps.LatLng | google.maps.LatLngLiteral
    setPlace: React.Dispatch<React.SetStateAction<Place>>
    center: google.maps.LatLng | google.maps.LatLngLiteral
    map: google.maps.Map | null
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>
}

const PlaceContext = createContext<ValuesProps | null>(null);

export function PlaceProvider({ children }: Props) {

    const center = useMemo(() => ({
        lat: -21.13956294957754,
        lng: -41.67632004796125,
    }), []);
    const [place, setPlace] = useState(center);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    return (
        <PlaceContext.Provider value={{ place, setPlace, center, map, setMap}}>
            {children}
        </PlaceContext.Provider>
    )
}

export default PlaceContext;