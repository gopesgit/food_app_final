import { useNavigation } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import { CartContext } from '../context/cartContext'
import CartRow from '../component/CartRow'
import { UserContext } from '../context/userContext'

const OrderScreen = () => {
    const navigation = useNavigation()
    const { cartItem, updateCartItem, totalPrice } = useContext(CartContext)
    const { adresses } = useContext(UserContext)
    let defaultaddress = adresses.filter(item => item.is_default === 1);
    //console.log(cartItem);
    return (
        <View className="bg-white flex-1">
            <View className="relative">
                <Image
                    source={require("../../assets/images/cart.jpg")}
                    style={{ width: '100%', height: 275 }}
                />
                <View
                    style={{ backgroundColor: "rgba(0,0,0,.5)", borderRadius: 100 }}
                    className="absolute top-12 left-4" >
                    <Icon
                        type='material-community'
                        name='arrow-left-bold-circle-outline'
                        size={45}
                        color={"#fff"}

                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
            <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                className="bg-white -mt-36 pt-2"
            >
                <View className="relative py-2 shadow-sm">
                    <View>
                        <Text className="text-center text-xl font-bold">Order Summary</Text>
                        {/* <Text className="text-center text-gray-500">Mass</Text> */}
                    </View>
                </View>

                <View style={{ paddingHorizontal: 12, shadowColor: "rgba(0, 0, 0, 0.5)", shadowRadius: 12, paddingVertical: 4 }}
                    className="flex-row items-center justify-evenly shadow bg-gray-200"
                >
                    <Text>{`${defaultaddress[0].address}\nPin: ${defaultaddress[0].pin}`}</Text>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className="bg-white pt-1"
            >
                {cartItem &&
                    cartItem.map((item, index) => (
                        <>
                            <View className="flex-row items-center bg-stone-50 p-3 rounded shadow mb-3 mx-2"
                                style={{ shadowColor: "rgba(0, 0, 0, 0.5)", shadowRadius: 12 }} >
                                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                                    <Image
                                        className="rounded-xl"
                                        style={{ height: 50, width: 50 }}
                                        source={{ uri: item.food_image_url }}
                                    />
                                </View>
                                <View style={{ flex: 4 }}>
                                    <Text className="font-extrabold">{item.name}</Text>
                                    <Text className="text-gray-500 font-bold">Rs. {item.price}</Text>
                                    <Text className="text-gray-700 font-bold text-xs">Quantity: {item.quantity}</Text>
                                </View>
                            </View>

                        </>
                    ))
                }

            </ScrollView>

            <View
                className="p-6 px-8 rounded-t3xl space-y-4 bg-stone-300"
                style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
            >
                <View className="flex-row justify-between">
                    <Text className="text-gray-700 font-semibold">Subtotal</Text>
                    <Text className="text-gray-700">{totalPrice}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700 font-semibold">Delivery Fee</Text>
                    <Text className="text-gray-700">deliveryFee</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-gray-700 font-extrabold">Order Total</Text>
                    <Text className="text-gray-700 font-extrabold">
                        {/* ${parseFloat(cartTotal) + parseFloat(deliveryFee)} */}
                    </Text>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Payment")
                        }

                        className="p-3 rounded-full  bg-orange-900"
                    >
                        <Text className="text-white text-center font-bold text-lg">
                        Proceed to Payment
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default OrderScreen
const styles = StyleSheet.create({})