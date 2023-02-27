import './App.css';
import { GoogleMap, useJsApiLoader, Autocomplete, Marker, useLoadScript } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const libraries: ["places" | "drawing" | "geometry" | "localContext" | "visualization"] = ['places'];

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_API_KEY,
    libraries
  });

  const center = useMemo(() => ({
    lat: -21.13956294957754,
    lng: -41.67632004796125,
  }), []);
  const [place, setPlace] = useState(center);

  return (
    <div className="App">
      {
        isLoaded && <>
          <label>
            Search place:
            <AutocompleteSearchBar setPlace={setPlace} />
          </label>
          <GoogleMap
            mapContainerStyle={{ width: "1000px", height: "500px" }}
            center={center}
            zoom={15}
          >
            {<Marker position={place} />}
          </GoogleMap>

        </>
      }
    </div>
  )
}

function AutocompleteSearchBar({ setPlace }) {

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions
  } = usePlacesAutocomplete();

  async function handleSelectPlace(address: string) {
    setValue(address, false);

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setPlace({ lat, lng })
  }

  return (
    <>
      <label>
        Search:
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <div id="autocomplete-window">
          {
            status === "OK"
            && data.map(({ place_id, description }) => (
              <div key={place_id} onClick={() => { handleSelectPlace(description) }} >{description}</div>
            ))
          }
        </div>
      </label>
    </>
  )

}

export default App
