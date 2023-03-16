import i18n from "../../translation/i18n";
import {MdLanguage} from "react-icons/md";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
import MenuButtonsContext from "../../contexts/MenuButtonsProvider";

export function LangButton() {

    const [selectedLang, setSelectedLang] = useState(i18n.language)

    const openedMenu = useContext(MenuButtonsContext)?.openedMenu;
    const setOpenedMenu = useContext(MenuButtonsContext)?.setOpenedMenu;

    useEffect(()=>{
        i18n.changeLanguage(selectedLang);
        localStorage.setItem("language", selectedLang);
    }, [selectedLang])
    
    return (
        <>
            <button 
                className={`map-button lang-button lang-en ${selectedLang === "en" ? "selected-option" : ""}`}
                onClick={() => setSelectedLang("en")}
                style={openedMenu?.lang ? {left: "7.8rem"} : {left: "1rem"}}
            >
                en
            </button>
            <button 
                className={`map-button lang-button lang-en ${selectedLang === "pt" ? "selected-option" : ""}`}
                onClick={() => setSelectedLang("pt")}
                style={openedMenu?.lang ? {left: "4.4rem"} : {left: "1rem"}}
            >
                pt
            </button>
            <button 
                className={`map-button lang-button ${openedMenu?.lang ? "selected-button" : "" }`}
                onClick={() => {
                    if (setOpenedMenu) {
                        if (openedMenu?.lang) {
                            setOpenedMenu({
                                metrics: false,
                                lang: false
                            })
                        } else {
                            setOpenedMenu({
                                metrics: false,
                                lang: true
                            })
                        }
                    }

                }}
            >
                <MdLanguage />
            </button>
        </>
    )
}