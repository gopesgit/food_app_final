import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View,TouchableWithoutFeedback,Image } from 'react-native'
const RestaurantCard = ({restaurant}) => {
    const navigation =useNavigation();
    //console.log("=>",restaurant);
  return (
    // <Text>ok</Text>
    <TouchableWithoutFeedback
    onPress={() => navigation.navigate('Restaurant',{...restaurant })}
  >
    <View
      style={{ shadowColor: "rgba(0, 0, 0, 0.5)", shadowRadius:12, marginVertical:8}}
      className="mr-5 bg-white rounded-3xl shadow justify-center"
    >
      <Image className="h-36 w-64 rounded-t-3xl" source={{uri:restaurant.image_url}} style={{objectFit:'fill'}} />
      <View className="px-3 pb-4 space-y-2 w-64">
        <Text className="font-bold pt-2 text-base">{restaurant.name}</Text>
        <View className="flex-row items-center space-x-1">
          <Image
            source={require("./../../assets/images/staricon.png")}
            className="h-4 w-4"
          />
          <Text className="text-gray-700">{restaurant.rating}</Text>
          <Text className="text-gray-700">
            ({restaurant.reviews} reviews)
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          {/* <Icon.MapPin height="20" width="20" color="gray" /> */}
          <Text className="text-gray-700 text-xs">
      
            Nearby {restaurant.address.substring(0,30)}
          </Text>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
  )
}
export default RestaurantCard
const styles = StyleSheet.create({})