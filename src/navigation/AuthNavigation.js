import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet, Text, View } from 'react-native'
import SigninWelocome from '../screen/authScreen/SigninWelocome'
import SigninScreen from '../screen/authScreen/SigninScreen'
import HomeNavigation from './HomeNavigation'
import { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import SignUpScreen from '../screen/authScreen/SignUpScreen'
const AuthStack = createStackNavigator()
export default function AuthNavigation() {
    const { user } = useContext(AuthContext)
    const login = user.token == null ? false : true
    return (

        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            {!login ?
                <>
                    <AuthStack.Screen
                        name="welcome-screen"
                        component={SigninWelocome}
                        options={{
                            headerShown: false
                        }
                        }
                    />
                    <AuthStack.Screen
                        name="sigin-screen"
                        component={SigninScreen}
                        options={{
                            headerShown: false
                        }
                        }
                    />
                    <AuthStack.Screen
                        name="signup-screen"                        
                        component={SignUpScreen}
                        options={{
                            headerShown: false
                        }
                        }
                    />
                </> :
                <AuthStack.Screen
                    name="home-navi"
                    component={HomeNavigation}
                    options={{
                        headerShown: false
                    }
                    }
                />
            }

        </AuthStack.Navigator>

    )
}
const styles = StyleSheet.create({})