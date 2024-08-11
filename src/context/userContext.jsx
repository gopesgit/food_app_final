import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./authContext";
import { API_DELIVERY_ADDRESS, API_ORDER, API_ORDER_BY_USER } from "../global/data";
import ChangeAddressScreen from "../screen/ChangeAddressScreen";
import AddAddressScreen from "../screen/AddAddressScreen";
const getData = async (API_URL) => {
   // console.log(API_URL);
    try {
        const response = await axios.get(API_URL);       
        return response.data
    } catch (error) {
        console.log(error);        
    }
}
export const UserContext = createContext("")
export const UserProvide = ({ children }) => {
    const {user}=useContext(AuthContext)
    const [adresses, setAdresses] = useState([]) 
    const [order, setOrder] = useState([]) 
    useEffect(() => {       
        getAddressesList();
        getOrderList()
    }, [ChangeAddressScreen,AddAddressScreen])   
    const getAddressesList = async () => {
        console.log("Inside User Provider");
        setAdresses([]);
        //console.log("Operation=> ", await getData(API_DELIVERY_ADDRESS))        
        setAdresses((await  getData(API_DELIVERY_ADDRESS)).filter((item)=>item.user_id===user.email))
        //console.log("Adress=>",adresses);
    }
    const getOrderList = async () => {
        console.log("Inside User Provider");
        setOrder([]);
        console.log("Operation=> ", await getData(API_ORDER_BY_USER+user.email))        
        setOrder((await  getData(API_ORDER_BY_USER+user.email)).filter((item)=>item.orderuser_id===user.email))
        //console.log("Adress=>",order);
    }
    return (
        <UserContext.Provider value={{ adresses,  getAddressesList ,getOrderList,order}}>
            {children}
        </UserContext.Provider>
    )
}