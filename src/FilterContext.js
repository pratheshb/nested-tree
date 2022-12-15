import { createContext, useContext } from "react";


export const FilterContext = createContext(null);

export function useFilter() {
    return useContext(FilterContext);
}
