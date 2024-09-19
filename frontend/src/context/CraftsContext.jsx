import { createContext, useReducer } from 'react';

export const CraftsContext = createContext()

export const craftsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CRAFTS':
            return {
                crafts: action.payload
            }
        
        case 'CREATE_CRAFTS':
            return {
                crafts: [ action.payload, ...state.crafts]
            }

        case 'DELETE_CRAFT':
            return {
                crafts: state.crafts.filter((craft) => craft._id !== action.payload._id)
            }

        case 'UPDATE_CRAFT':
            const updatedCraft = action.payload;
                const updatedCrafts = state.crafts.map( craft => {
                    if ( craft._id === updatedCraft._id ) {
                    return updatedCraft;
                    }
                    return craft;
                    });
                    return {
                        crafts: updatedCrafts,
                    };
        default:
            return state
    }
}

export const CraftsContextProvider = ({children}) => {

    const [state, dispatch] = useReducer (craftsReducer, {
        crafts: null
    })

    return (
        <CraftsContext.Provider value={{...state, dispatch}}>
            {children}
        </CraftsContext.Provider>
    )
}