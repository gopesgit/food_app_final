import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import AuthNavigation from './AuthNavigation'
import { AuthProvider } from '../context/authContext'
export default function RootNavigator() {
    
  return (
    <NavigationContainer>
      <AuthProvider>
        <AuthNavigation/>
        </AuthProvider>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({})