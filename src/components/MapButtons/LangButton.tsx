import i18n from "../../translation/i18n";
import {MdLanguage} from "react-icons/md";
import "./styles.css";
import { useEffect, useState } from "react";

export function LangButton() {

    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [selectedLang, setSelectedLang] = useState(i18n.language)

    useEffect(()=>{
        i18n.changeLanguage(selectedLang)
    }, [selectedLang])

    return (
        <>
            <button 
                className={`map-button lang-button lang-en ${selectedLang === "en" ? "selected-lang" : ""}`}
                onClick={() => setSelectedLang("en")}
                style={isButtonClicked ? {left: "7.8rem"} : {left: "1rem"}}
            >
                en
            </button>
            <button 
                className={`map-button lang-button lang-en ${selectedLang === "pt" ? "selected-lang" : ""}`}
                onClick={() => setSelectedLang("pt")}
                style={isButtonClicked ? {left: "4.4rem"} : {left: "1rem"}}
            >
                pt
            </button>
            <button 
                className={`map-button lang-button ${isButtonClicked ? "selected-button" : "" }`}
                onClick={()=>setIsButtonClicked(!isButtonClicked)}
            >
                <MdLanguage />
            </button>
        </>
    )
}