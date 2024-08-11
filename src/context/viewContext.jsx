import { createContext, useEffect, useState } from "react";
import { API_FOOD_CATEGORIE, API_RESTAURANT } from "../global/data";
import axios from "axios";
export const FoodViewContext = createContext("")
export const FoodViewProvide = ({ children }) => {
    const [foodmenuCata, setFoodMenuCata] = useState([]);   
    const [restaurant, setRestaurant] = useState([]);   
    useEffect(() => {
        getFoodenuCategorie();
        getRestaurant();
    }, [])
    const getFoodenuCategorie = async () => {       
        try {
            setFoodMenuCata([])
            const response = await axios.get(API_FOOD_CATEGORIE);
            setFoodMenuCata(response.data)
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);            
        }      
    }
    const getRestaurant=async ()=>{
        try {
            setRestaurant([])
            const response = await axios.get(API_RESTAURANT);    
            console.log("From Get Restaurant data");       
            setRestaurant(response.data)            
        } catch (error) {
             console.error('There was a problem with the fetch operation:', error); 
        }

    }
    return (
        <FoodViewContext.Provider value={{ foodmenuCata,restaurant }}>
            {children}
        </FoodViewContext.Provider>
    )
}