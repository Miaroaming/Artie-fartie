import { CraftsContext } from "../context/CraftsContext";
import { useContext } from "react";

export const useCraftsContext = () => {
    const context = useContext(CraftsContext)

    if(!context) {
        throw Error('useCraftsContext hook must be used inside CraftsContextProvider')
    }

    return context
}