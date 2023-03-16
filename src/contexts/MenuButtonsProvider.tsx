import { createContext, useState } from "react";

interface Props {
    children: React.ReactNode
}

interface MenuOptions {
    lang: boolean;
    metrics: boolean;
}

interface ValueProps {
    openedMenu: MenuOptions | null
    setOpenedMenu: React.Dispatch<React.SetStateAction<MenuOptions>>
    
}
const MenuButtonsContext = createContext<ValueProps | null>(null);

export function MenuButtonsProvider({ children }: Props) {

    const [ openedMenu, setOpenedMenu] = useState({
        lang: false,
        metrics: false
    });
   
    return (
        <MenuButtonsContext.Provider value={{openedMenu, setOpenedMenu} }>
            {children}
        </MenuButtonsContext.Provider>
    )
}

export default MenuButtonsContext;