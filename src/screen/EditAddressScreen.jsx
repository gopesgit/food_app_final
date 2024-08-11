import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AddressForm from '../component/AddressForm ';
import { Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { updateData } from '../global/somecommonFunction';
import { API_DELIVERY_ADDRESS } from '../global/data';
import { AuthContext } from '../context/authContext'
import { UserContext } from '../context/userContext';
const EditAddressScreen = ({ route }) => {
    
    const { addressItem } = route.params;
    const {getAddressesList}=useContext(UserContext);
    console.log("ffff=>", addressItem);
    const navigation = useNavigation();
    const handleSubmit = async (formData) => {
        // Implement logic to submit the form data (e.g., API call)      
        const formdata = new FormData();
        formdata.append('_method', 'put');
        formdata.append('city', formData.city);
        formdata.append('country', formData.country);
        formdata.append('latitude', formData.latitude);
        formdata.append('longitude', formData.longitude);
        formdata.append('near_location', formData.near_location);
        formdata.append('description', formData.description);
        formdata.append('street_address', formData.street_address);
        formdata.append('state', formData.state);
        formdata.append('postal_code', formData.postal_code);
        //formdata.append('is_default', formData.is_default);
        console.log(formdata);
        await updateData(formdata, API_DELIVERY_ADDRESS + "/" + addressItem.id)
        getAddressesList();       
        navigation.goBack()
        // Reset form or navigate back
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Icon
                type='material-community'
                name='arrow-left'
                size={30}
                color="#fff"
                onPress={() => navigation.goBack()}
                containerStyle={styles.iconContainer}
            />
            <Text style={styles.headerTitle}>Edit Your Address</Text>
        </View>
       
            <AddressForm initialValues={addressItem} onSubmit={handleSubmit} />
       
    </View>
    
    );
   
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop:20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50', // Use a green background color
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    iconContainer: {
        marginRight: 10,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    scrollContainer: {        
        paddingBottom: 20,
    },
});



export default EditAddressScreen;
