import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import { insertData } from '../../global/somecommonFunction';
import { API_USER } from '../../global/data';

// Assume this is a function to handle registration
export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [passVisible, setPassVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    
    const handleSignUp = async () => {
        const roles = [
            { role: 'customer', active: 1 },
            // Add other roles if needed
        ];
        const message = 'Registration successful!';
        if (!name || !email || !password || !confirmPassword || !phone) {
            ToastAndroid.showWithGravity("Please fill all fields", ToastAndroid.SHORT, ToastAndroid.TOP);
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            ToastAndroid.showWithGravity("Passwords do not match", ToastAndroid.SHORT, ToastAndroid.TOP);
            setLoading(false);
            return;
        }       
      
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);
        formData.append('type',"customer");
        formData.append('password_confirmation',confirmPassword);
        formData.append("active", 1);
        
       
        try {
            setLoading(true);
            const response = await insertData(formData,API_USER, message);
            setEmail('');
            setName('');
            setConfirmPassword('');
            setPassword('');
            setPhone('')
            setLoading(false);
            navigation.navigate('sigin-screen')
        } catch (error) {
            console.error('Registration failed');
            // Handle registration failure (e.g., show error message)
        }
        setLoading(false)
    };

    return (
        <View style={styles.container}>
            <View style={{ gap: 10 }}>
                <View style={styles.header}>
                    <Text style={styles.title}>Sign Up</Text>
                    <Text style={styles.subtitle}>Please enter your details to create an account</Text>
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder='Name'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={[styles.textInputPassword, { justifyContent: 'space-between' }]}>
                    <Icon
                        name="lock"
                        size={28}
                        color="#888"
                        type="entypo"
                    />
                    <TextInput
                        placeholder='Password'
                        secureTextEntry={!passVisible}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    {!passVisible ? (
                        <Icon
                            name="eye-with-line"
                            size={28}
                            color="#888"
                            type="entypo"
                            onPress={() => setPassVisible(!passVisible)}
                        />
                    ) : (
                        <Icon
                            name="eye"
                            size={28}
                            color="#888"
                            type="entypo"
                            onPress={() => setPassVisible(!passVisible)}
                        />
                    )}
                </View>
                <View style={[styles.textInputPassword, { justifyContent: 'space-between' }]}>
                    <Icon
                        name="lock"
                        size={28}
                        color="#888"
                        type="entypo"
                    />
                    <TextInput
                        placeholder='Confirm Password'
                        secureTextEntry={!passVisible}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    {!passVisible ? (
                        <Icon
                            name="eye-with-line"
                            size={28}
                            color="#888"
                            type="entypo"
                            onPress={() => setPassVisible(!passVisible)}
                        />
                    ) : (
                        <Icon
                            name="eye"
                            size={28}
                            color="#888"
                            type="entypo"
                            onPress={() => setPassVisible(!passVisible)}
                        />
                    )}
                </View>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder='Phone'
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                        keyboardType='phone-pad'
                    />
                </View>
                <View style={styles.controlWrapper}>
                    <Button
                        title="Sign Up"
                        buttonStyle={styles.primaryBtn}
                        titleStyle={styles.primaryBtnText}
                        onPress={handleSignUp}
                        loading={loading}
                    />
                </View>
                <View style={styles.centeritem}>
                    <Text style={styles.subtitlelink} onPress={() => navigation.navigate('sigin-screen')}>Already have an account?</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff",
        padding: 20
    },
    header: {
        alignItems: 'center',
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333'
    },
    subtitle: {
        fontSize: 16,
        color: '#666'
    },
    textInput: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    textInputPassword: {
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center'
    },
    controlWrapper: {
        marginTop: 20
    },
    primaryBtn: {
        backgroundColor: '#f57c00'
    },
    primaryBtnText: {
        color: '#fff'
    },
    subtitlelink: {
        color: '#f57c00',
        textAlign: 'center',
        marginTop: 20
    },
    centeritem: {
        alignItems: 'center'
    }
});
