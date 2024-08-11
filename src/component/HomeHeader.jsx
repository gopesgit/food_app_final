import { StyleSheet, Text, View } from 'react-native'
import { Icon, withBadge } from 'react-native-elements'
import { colors, globalStyle, parameters } from '../global/styles'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { CartContext } from '../context/cartContext'
export default function HomeHeader() {
    const { cartItem, updateCartItem }=useContext(CartContext)
    const BadgeIcon=withBadge(!cartItem?0:cartItem.length,{ top:4, left: 2 })(Icon)
    const navigation=useNavigation();
    
    return (
        <View style={[globalStyle.header,{backgroundColor:"#fff"}]}>
            <View >
                <Icon
                    name='menu'
                    size={30}
                    type="entypo"
                    color={"#000"}
                    onPress={()=>navigation.navigate("Menu")}
                />
            </View>
            <View >
                <Text style={[globalStyle.headerText,{color:"#000"}]}>Foodies</Text>
            </View>
            <View >
                <BadgeIcon
                    name='shopping-cart'
                    size={35}
                    type="entypo"
                    color={"#000"}
                    onPress={ ()=>navigation.navigate("Cart")}  
                    containerStyle={{ position: 'relative' }}            
                    
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({   
})
