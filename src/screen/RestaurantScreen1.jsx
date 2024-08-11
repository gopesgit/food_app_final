import { useNavigation, useRoute } from '@react-navigation/native'
import { StyleSheet, Text, View, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native'
import { Icon, Rating } from 'react-native-elements'
import DishRow from '../component/DishRow';
import CartIcon from '../component/CartIcon';
const RestaurantScreen = () => {
    const { params } = useRoute();
    const item = params
    let restaurant = params;
    const navigation = useNavigation();
    console.log(params);
    return (
        <View>
            <CartIcon />

            <StatusBar style="light" />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View className="relative">
                    <Image className="w-full h-80" source={{ uri: restaurant.image_url }} />
                    <View
                        style={{ backgroundColor: "rgba(0,0,0,.5)", borderRadius: 100 }}
                        className="absolute top-12 left-4" >
                        <Icon
                            type='material-community'
                            name='arrow-left-bold-circle-outline'
                            size={40}
                            color={"#fff"}

                            onPress={() => navigation.goBack()}
                        />
                    </View>

                </View>
                <View style={{marginTop:'35%',marginLeft:'41%', backgroundColor:"rgba(0,0,0,.5)"}} className="p-2 absolute rounded-full">
                        <Image className="w-14 h-14 rounded-full" source={{ uri: restaurant.logo_url }} style={{ objectFit: 'fill',borderColor:"#fff", borderWidth:1 }} />
                    </View>
                <View
                    style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className="bg-white -mt-12 pt-4"
                >
                    
                    <View className="px-5">

                        <Text className=" text-2xl font-bold">{restaurant.name}</Text>
                        {/* <Text className="font-semibold">{restaurant.categories}</Text> */}
                        <View className="flex-row space-x-1 my-1">
                            <View className="flex-row items-center space-x-1">
                                <Rating imageSize={15} readonly fractions={1} startingValue={restaurant.rating} />
                                <Text className="text-gray-700">{restaurant.rating}</Text>
                                <Text className="text-gray-700">
                                    ({restaurant.reviews} reviews){" "}

                                </Text>
                            </View>
                        </View>
                        <View className="flex-row items-center space-x-1">
                            <Icon
                                type='material-community'
                                name='map-marker'
                                size={25}
                                color={"#666"}
                                onPress={() => navigation.goBack()}
                            />
                            <Text className="text-gray-700 text-xs">
                                Nearby {restaurant.address}
                            </Text>
                        </View>

                        <Text className="text-gray-500 mt-2">{restaurant.description}</Text>
                    </View>
                </View>
                <View className="pb-24 bg-white" >
                    <Text className="px-4 py-4 text-2xl font-bold">Menu</Text>
                    {restaurant.foods.map((dish, index) => (
                        <DishRow item={{ ...dish }} key={index} />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}
export default RestaurantScreen
const styles = StyleSheet.create({})