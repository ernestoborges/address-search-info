import "./styles.css"
import { useContext, useRef } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import PlaceContext from "../../contexts/PlaceProvider";
import { IoLocationSharp } from "react-icons/io5"

export function AutocompleteSearchBar() {

  const listRef = useRef<HTMLUListElement>(null);

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
    setPlace && setPlace({ lat, lng });
  }

  return (
    <>

      <input
        className="autocomplete-input"
        type="text" value={value}
        onChange={(e) => setValue(e.target.value)} placeholder="Search location here..."
        onFocus={(e) => listRef.current && e.target.value && (listRef.current.style.display = "flex")}
        onBlur={(e) => listRef.current && (listRef.current.style.display = "none")}
      />
      <ul ref={listRef} className="autocomplete-list" style={{ display: data.length > 0 ? "flex" : "none" }}>
        {
          status === "OK"
          && data.map(({ place_id, description }) => (
            <li key={place_id} onClick={() => { handleSelectPlace(description) }} >
              <IoLocationSharp />
              <span>
                {description}
              </span>
            </li>
          ))
        }
        {/* <div className="blur-border" /> */}
      </ul>
    </>
  )

}