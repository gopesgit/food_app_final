import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import HomeScreen from '../screen/HomeScreen'
import RestaurantScreen from '../screen/RestaurantScreen'
import CartScreen from '../screen/CartScreen'
import { FoodViewProvide } from '../context/viewContext'
import { CartProvider } from '../context/cartContext'
import OrderScreen from '../screen/OrderScreen'
import PaymentScreen from '../screen/PaymentScreen'
import { useNavigation } from '@react-navigation/native'
import HeaderNavi from './HeaderNavi'
import AddAddressScreen from '../screen/AddAddressScreen'
import ChangeAddressScreen from '../screen/ChangeAddressScreen'
import EditAddressScreen from '../screen/EditAddressScreen'
import { UserProvide } from '../context/userContext'
import DetailOrderScreen from '../screen/DetailOrderScreen'
import OrderListScreen from '../screen/OrderListScreen'
import CouponsScreen from '../screen/CouponsScreen'
import ProfileDetailsScreen from '../screen/ProfileDetailsScreen'
const HomeStack = createStackNavigator()
export default function HomeNavigation() {
    return (
        <UserProvide>
        <FoodViewProvide>
            <CartProvider>
                <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                    <HomeStack.Screen
                        name="home-screen"
                        component={HomeScreen}
                        options={{
                            headerShown: false
                        }
                        }
                    />
                    <HomeStack.Screen
                        name="Restaurant"
                        component={RestaurantScreen}
                        options={{
                            headerShown: false
                        }
                        }
                    />
                    <HomeStack.Screen
                        name="Cart"
                        options={{ presentation: "modal" }}
                        component={CartScreen}
                    />
                    <HomeStack.Screen
                        name="Order"
                        options={{ presentation: "modal" }}
                        component={OrderScreen}
                    />
                    <HomeStack.Screen
                        name="Payment"
                        options={{ presentation: "modal" }}
                        component={PaymentScreen}
                    />
                    <HomeStack.Screen
                        name="Menu"
                        options={{
                            presentation: 'transparentModal',
                            gestureEnabled: true,
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: '#fff', opacity: .7 },
                            cardOverlay: () => (
                                <TouchableOpacity
                                    style={{ flex: 1 }}
                                    onPress={() => useNavigation.goBack()}
                                />
                            ),
                            headerShown: false,
                        }}
                        component={HeaderNavi}
                    />
                    <HomeStack.Screen
                        name="Add-Address"
                        options={{ presentation: "modal" }}
                        component={AddAddressScreen}
                    />
                    <HomeStack.Screen
                        name="Change-Address"
                        options={{ presentation: "modal" }}
                        component={ChangeAddressScreen}
                    />
                    <HomeStack.Screen
                        name="Edit-Address"
                        options={{ presentation: "modal" }}
                        component={EditAddressScreen}
                    />
                    <HomeStack.Screen
                        name="Order-Details"
                        options={{ presentation: "modal" }}
                        component={DetailOrderScreen}
                    />
                      <HomeStack.Screen
                        name="Order-List"
                        options={{ presentation: "modal" }}
                        component={OrderListScreen}
                    />
                    <HomeStack.Screen
                        name="AllCoupons"
                        options={{ presentation: "modal" }}
                        component={CouponsScreen}
                    />
                    <HomeStack.Screen
                        name="ProfileDetails"
                        options={{ presentation: "modal" }}
                        component={ProfileDetailsScreen}
                    />

                </HomeStack.Navigator>
            </CartProvider>
        </FoodViewProvide>
        </UserProvide>
    )
}
const styles = StyleSheet.create({})