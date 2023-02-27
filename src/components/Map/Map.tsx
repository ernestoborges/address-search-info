import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useContext, useMemo, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import PlaceContext from '../../contexts/PlaceProvider';
import { AutocompleteSearchBar } from '../AutocompleteSearchBar/AutocompleteSearchBar';


export function Map() {



    const center = useContext(PlaceContext)?.center;
    const place = useContext(PlaceContext)?.place;
    const setPlace = useContext(PlaceContext)?.setPlace;

    return (
        <>
            <GoogleMap
                mapContainerStyle={{ width: "500px", height: "500px" }}
                center={center}
                zoom={15}
            >
                {place && <Marker position={place} />}
            </GoogleMap>
        </>
    )
}