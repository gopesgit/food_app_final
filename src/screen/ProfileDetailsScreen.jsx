import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthContext } from '../context/authContext';

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState({
    name: user.name,
    phone: user.phone,
    email: user.email,
    dateOfBirth: '',
    anniversary: '',
  });

  const [isEditable, setIsEditable] = useState({
    name: false,
    phone: false,
    email: false,
  });

  const [showDatePicker, setShowDatePicker] = useState({
    dateOfBirth: false,
    anniversary: false,
  });

  const handleToggleEditable = (field) => {
    setIsEditable((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (event, selectedDate, field) => {
    const currentDate = selectedDate || profile[field];
    setShowDatePicker((prev) => ({ ...prev, [field]: Platform.OS === 'ios' }));
    const formattedDate = currentDate.toISOString().split('T')[0]; // Format as Y-m-d
    handleInputChange(field, formattedDate);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIcon}>
          <Icon name="arrow-back" type="material" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Your Profile</Text>
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.avatarContainer}>
          <Icon name="account-circle" type="material" size={80} color="#007AFF" />
          <TouchableOpacity style={styles.editIcon}>
            <Icon name="edit" type="material" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={profile.name}
              editable={isEditable.name}
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TouchableOpacity onPress={() => handleToggleEditable('name')}>
               <Text style={styles.changeText}>{isEditable.name ? "DONE" : "CHANGE"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Mobile</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={profile.phone}
              editable={isEditable.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={profile.email}
              editable={isEditable.email}
              onChangeText={(text) => handleInputChange('email', text)}
            />
            <TouchableOpacity onPress={() => handleToggleEditable('email')}>
              <Text style={styles.changeText}>{isEditable.email ? "DONE" : "CHANGE"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Date of birth"
              value={profile.dateOfBirth}
              editable={false}
            />
            <TouchableOpacity onPress={() => setShowDatePicker({ ...showDatePicker, dateOfBirth: true })}>
              <Text style={styles.changeText}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker.dateOfBirth && (
            <DateTimePicker
              value={profile.dateOfBirth ? new Date(profile.dateOfBirth) : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => handleDateChange(event, date, 'dateOfBirth')}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Anniversary</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Anniversary"
              value={profile.anniversary}
              editable={false}
            />
            <TouchableOpacity onPress={() => setShowDatePicker({ ...showDatePicker, anniversary: true })}>
              <Text style={styles.changeText}>CHANGE</Text>
            </TouchableOpacity>
          </View>
          {showDatePicker.anniversary && (
            <DateTimePicker
              value={profile.anniversary ? new Date(profile.anniversary) : new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => handleDateChange(event, date, 'anniversary')}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={profile.gender}
              onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    paddingHorizontal: 15,
    paddingVertical: 35,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  backIcon: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
  },
  changeText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: 'bold',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileDetailsScreen;