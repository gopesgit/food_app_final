import { StyleSheet, Text, View } from 'react-native'
import { colors, globalStyle, parameters } from '../global/styles'
import { Icon } from 'react-native-elements'

export default function Header({ title,type,navigation }) {
  //console.log(navigation);
  return (
    <View style={globalStyle.header}>
      <View>
        <Icon
          name={type}
          size={28}
          color={colors.scenodry}
          type="entypo"
          onPress={() =>navigation.goBack()}
        />
      </View>
      <View>
        <Text style={globalStyle.headerText}>{title}</Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  
 
})