import "./styles.css"
import { useContext, useRef } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import PlaceContext from "../../contexts/PlaceProvider";
import { IoLocationSharp } from "react-icons/io5"
import { useTranslation } from "react-i18next";

export function AutocompleteSearchBar() {

  const listRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const blurTimeout = useRef<number | null>(null);

  const setPlace = useContext(PlaceContext)?.setPlace;

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
    console.log({lat, lng})
    setPlace && setPlace({ lat, lng });
    listRef.current && (listRef.current.style.display = "none");
    inputRef.current && inputRef.current.blur();
  }

  function handleInputFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (e.target.value !== "") {
      listRef.current && (listRef.current.style.display = "flex");
    }
  }

  function handleInputBlur() {
    blurTimeout.current = setTimeout(() => {
      listRef.current && (listRef.current.style.display = "none");
    }, 200);
  }

  function handleListItemClick(address: string) {
    handleSelectPlace(address);
    clearTimeout(blurTimeout.current!);
  }

const {t} = useTranslation();
const searchBarPlaceholder = t("autocomplete.placeholder");

  return (
    <>
      <label>
        <input
          ref={inputRef}
          className="autocomplete-input"
          type="text" value={value}
          onChange={(e) => setValue(e.target.value)} 
          placeholder={searchBarPlaceholder}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <ul
          ref={listRef}
          className="autocomplete-list" style={{ display: data.length > 0 ? "flex" : "none" }}>
          {
            status === "OK"
            && data.map(({ place_id, description }) => (
              <li key={place_id} onClick={() => { handleListItemClick(description) }} >
                <IoLocationSharp />
                <span>
                  {description}
                </span>
              </li>
            ))
          }
        </ul>
      </label>
    </>
  )

}