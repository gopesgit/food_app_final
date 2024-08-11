import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import Header from '../../component/Header'
import { colors, globalStyle, orangeButton, parameters } from '../../global/styles'
import * as Animatable from 'react-native-animatable'
import { Button, Icon, SocialIcon } from 'react-native-elements'
import { useContext, useRef, useState } from 'react'
import { login } from '../../global/somecommonFunction'
import { AuthContext } from '../../context/authContext'

export default function SigninScreen({ navigation }) {
    //console.log(navigation);
    const [passvisable, setPassVisable] = useState(true)
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [loading,setLoading]=useState(false)
    const { setUser } = useContext(AuthContext)
    
    const handleLogin=async()=>{
        if(!email || !password){
            ToastAndroid.showWithGravity("Please fill field",ToastAndroid.SHORT,ToastAndroid.TOP)
            setLoading(false) 
            return
        }
        await login({ email, password, type:"customer" },setUser)
        //console.log({email,password});
    }
    return (

        <View style={styles.container}>            
            <View style={{gap:10 }}>
                <View style={globalStyle.centeritem}>
                    <Text style={globalStyle.title}>Sign-in</Text>
                    <Text style={globalStyle.subtitle}>Please enter the email and password</Text>
                </View>
                <View style={globalStyle.textInput}>
                    <TextInput
                        placeholder='email or userid'
                        value={email}
                        onChangeText={(text)=>setEmail(text)}
                    />
                </View>
                <View style={globalStyle.textInputPassword}>
                    <Animatable.View animation={!passvisable ? "bounce" : "wobble"} duration={4000}>
                        <Icon
                            name="lock"
                            size={28}
                            color={colors.grey1}
                            type="entypo"
                        />
                    </Animatable.View>
                    <TextInput
                        placeholder='password'
                        secureTextEntry={!passvisable}
                        value={password}
                        onChangeText={(text)=>setPassword(text)}
                       
                    />
                    <Animatable.View animation={!passvisable ? "bounce" : "swing"} duration={4000}>
                        {!passvisable ?
                            <Icon
                                name="eye-with-line"
                                size={28}
                                color={colors.grey1}
                                type="entypo"
                                onPress={() => setPassVisable(!passvisable)}
                            /> :
                            <Icon
                                name="eye"
                                size={28}
                                color={colors.grey1}
                                type="entypo"
                                onPress={() => setPassVisable(!passvisable)}
                            />
                        }
                    </Animatable.View>
                </View>
                <View style={globalStyle.controlWrapper}>
                    <Button
                        title="Sign in"
                        //style=
                        buttonStyle={[globalStyle.primaryBtn,{marginHorizontal:0}]}
                        titleStyle={globalStyle.primaryBtnText}
                        onPress={() =>handleLogin()}
                    />
                </View>
                <View style={globalStyle.centeritem}>
                    <Text style={globalStyle.subtitlelink}>Forgot Password ?</Text>
                </View>
            </View>
            {/* <View style={{ marginTop: 30,gap:10}}>

                <View style={globalStyle.centeritem}>
                    <Text style={globalStyle.hedertextBlack}>OR</Text>
                </View>
                <View>
                    <SocialIcon
                        title='Signin With Facebook'
                        button
                        type='facebook'
                        style={globalStyle.socialicon}
                        onPress={() => { }}
                    />
                </View>
                <View>
                    <SocialIcon
                        title='Signin With Google'
                        button
                        type='google'
                        style={globalStyle.socialicon}
                        onPress={() => { }}
                    />
                </View>
                <View style={globalStyle.centeritem}>
                    <Text style={globalStyle.subtitle}>New on Foodies ?</Text>
                </View>
                <View >
                    <Button
                        title="Create New Account"
                        //style=
                        buttonStyle={globalStyle.secondaryBtn}
                        titleStyle={globalStyle.secondaryBtnText}
                    />
                </View>
                <Animatable.View style={[globalStyle.centeritem, globalStyle.mt25]}
                    animation={'bounce'}
                    iterationCount={'infinite'}
                    duration='4000'>
                    <Text style={styles.subtitle}>Enjoy Healthy Food!!!</Text>
                </Animatable.View>
            </View> */}




      


            {/* </ScrollView> */}
        </View>


    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    mt12: {
        marginTop: 12,
    },







})