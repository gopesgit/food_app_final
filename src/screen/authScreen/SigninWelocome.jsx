import { Image, StyleSheet, Text, View } from 'react-native'
import { globalStyle } from '../../global/styles'
import { Button } from 'react-native-elements'
import Swiper from 'react-native-swiper'
export default function SigninWelocome({ navigation }) {
    //console.log(navigation);
    return (
        <View style={styles.container}>
            <View style={globalStyle.welcomeScreenHeader}>
                <Text></Text>
                <Text style={globalStyle.headerTitle}>Discovery restaurant in your area</Text>
            </View>
            <View style={globalStyle.welcomeScreenSlider}>
                <Swiper loop={false} autoplay={true} autoplayTimeout={4}>
                    <View style={globalStyle.slider}>
                        <Image
                            source={{ uri: "https://tableo.com/wp-content/uploads/Restaurant-Stock-Images-e1699951587809.webp" }}
                            style={globalStyle.slideImage}
                        />
                    </View>
                    <View style={globalStyle.slider}>
                        <Image
                            source={{ uri: "https://img.freepik.com/free-photo/top-view-table-full-delicious-food-composition_23-2149141351.jpg" }}
                            style={globalStyle.slideImage}
                        />
                    </View>
                    <View style={globalStyle.slider}>
                        <Image
                            source={{ uri: "https://hospibuz.com/wp-content/uploads/2023/10/Bengali-food-1.jpg" }}
                            style={globalStyle.slideImage}
                        />
                    </View>
                    <View style={globalStyle.slider}>
                        <Image
                            source={{ uri: "https://assets.epicurious.com/photos/624d9590857fa7e509238b59/16:9/w_2560%2Cc_limit/RegionalChinese_HERO_033122_31320.jpg" }}
                            style={globalStyle.slideImage}
                        />
                    </View>
                </Swiper>
            </View>
            <View style={globalStyle.welcomeScreenFooter}>
                <View >
                    <Button
                        title="Sign in"
                        //style=
                        buttonStyle={globalStyle.primaryBtn}
                        titleStyle={globalStyle.primaryBtnText}
                        onPress={() => {
                            navigation.navigate('sigin-screen')
                        }}
                    />
                </View>
                <View >
                    <Button
                        title="Create New Account"
                        //style=
                        buttonStyle={globalStyle.secondaryBtn}
                        titleStyle={globalStyle.secondaryBtnText}
                        onPress={()=>{
                            navigation.navigate("signup-screen")
                        }}
                    />
                </View>
            </View>


        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor:"#fff"
    },

})