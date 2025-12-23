import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export function useAuth(){
    const contextValue = useContext(AuthContext)

    if(!contextValue){
        throw new Error("Must use use auth in a valid component")
    }

    return contextValue
}