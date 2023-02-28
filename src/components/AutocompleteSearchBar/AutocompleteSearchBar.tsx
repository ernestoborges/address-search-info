import "./styles.css"
import { useContext } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import PlaceContext from "../../contexts/PlaceProvider";

export function AutocompleteSearchBar() {

  const place = useContext(PlaceContext)?.place;
  const setPlace = useContext(PlaceContext)?.setPlace;
  const map = useContext(PlaceContext)?.map;

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
    setPlace ? setPlace({ lat, lng }) : null;
  }

  return (
    <>
      <label>
        Search:
        <input className="autocomplete-input" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </label>
      <ul className="autocomplete-list">
        {
          status === "OK"
          && data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => { handleSelectPlace(description) }} >{description}</li>
          ))
        }
      </ul>
    </>
  )

}