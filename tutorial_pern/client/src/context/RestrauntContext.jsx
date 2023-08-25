import React , {useState, createContext} from "react";

export const RestrauntsContext = createContext();

export const RestrauntsContextProvider = props => {
    const [restraunts,setRestraunts] = useState([]);
    const [reviews, setReviews] = useState([]);

    const addRestraunts = (restraunt) => setRestraunts([...restraunts,restraunt])
    return (
        <RestrauntsContext.Provider value={{
            restraunts, 
            reviews,
            setRestraunts,
            setReviews, 
            addRestraunts 
            }}>
            {props.children}
        </RestrauntsContext.Provider>
    )
}