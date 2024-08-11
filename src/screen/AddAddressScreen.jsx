import React, { useContext } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import AddressForm from '../component/AddressForm ';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { insertData } from '../global/somecommonFunction';
import { API_DELIVERY_ADDRESS } from '../global/data';
import { AuthContext } from '../context/authContext';
import { UserContext } from '../context/userContext';

const AddAddressScreen = () => {
    const { user } = useContext(AuthContext);
    const { getAddressesList } = useContext(UserContext);
    const navigation = useNavigation();

    const handleSubmit = async (formData) => {
        const formDataWithUserId = {
            ...formData,
            user_id: user.email
        };
        console.log('Form data:', formDataWithUserId);
        await insertData(formDataWithUserId, API_DELIVERY_ADDRESS,"Address Add ");
        getAddressesList();
        navigation.goBack();
    
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
                <Text style={styles.headerTitle}>Add Your Address</Text>
            </View>
           
                <AddressForm initialValues={{}} onSubmit={handleSubmit} />
           
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

export default AddAddressScreen;
