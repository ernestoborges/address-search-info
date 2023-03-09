import { createContext, SetStateAction, useEffect, useMemo, useState } from "react";


interface Props {
    children: React.ReactNode
}

interface Place {
    lat: number;
    lng: number;
}

interface ValuesProps {
    place: Place | google.maps.LatLng | google.maps.LatLngLiteral | null
    setPlace: React.Dispatch<React.SetStateAction<Place | null>>
    center: google.maps.LatLng | google.maps.LatLngLiteral
    map: google.maps.Map | null
    setMap: React.Dispatch<React.SetStateAction<google.maps.Map | null>>
}

const PlaceContext = createContext<ValuesProps | null>(null);

export function PlaceProvider({ children }: Props) {

    const center = {
        lat: 51.5072178,
        lng: -0.1275862,
    }

    const [place, setPlace] = useState<Place | null>(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setPlace({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          (error) => {
            console.error(error);
            setPlace(center);
          }
        );
      }, []);

    return (
        <PlaceContext.Provider value={{ place, setPlace, center, map, setMap}}>
            {children}
        </PlaceContext.Provider>
    )
}

export default PlaceContext;