import {Text, View, StyleSheet, Vibration, TextInput, TouchableOpacity, ScrollView, Alert} from "react-native";
import {useState} from "react";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useNavigation} from "expo-router";

export default function Index() {
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        title: {
            fontSize: 23,
            textAlign: 'center',
            fontFamily: 'serif',
            padding: 5,
        },
        container: {
            backgroundColor: 'white',
            marginTop: 40,
            width: '90%',
            margin: 'auto',
            borderRadius: 15,
            paddingVertical: 20
        },
        form: {
            paddingTop: 10,
            width: '80%',
            margin: 'auto',
        },
        label: {
            paddingTop: 16,
            fontSize: 14,
            fontWeight: 'medium',
            marginBottom: 5,
            color: '#333',
            fontFamily: 'serif'
        },
        input: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            borderRadius: 5,
            paddingHorizontal: 10,
            backgroundColor: '#f9f9f9',
        },
        button: {
            marginTop: 20,
            backgroundColor: "#008fff",
            paddingVertical: 10,
            paddingHorizontal: 5,
            borderRadius: 10

        },
        buttonText: {
          color: 'white',
            textAlign: 'center',
            fontWeight: 'medium',
            fontFamily: 'serif',
        },
    })
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        weight: '',
        height: '',
        age: '',
    });

    const handleInputChange = (key, value) => {
        setFormData({ ...formData, [key]: value });
    }

    const handleSubmit = async () => {
        try {
            await asyncStorage.setItem('user', JSON.stringify(formData));
            Alert.alert("Success", "Data Saved Successfully", [
                {
                    text: "OK",
                    onPress: () => navigation.navigate("calculator"),
                },
            ]);
        } catch (error) {
            Alert.alert("Error", 'Failed Saved User');
            console.error(error);
        }
    };

    return (
        <View  style={styles.container}>
            <Text style={styles.title}>Enter Your Information</Text>
            <ScrollView contentContainerStyle={styles.form}>

                <Text style={styles.label}>First Name</Text>
                <TextInput value={formData.firstName} onChangeText={(text) => handleInputChange("firstName", text)} style={styles.input}/>

                <Text style={styles.label}>Last Name</Text>
                <TextInput value={formData.lastName} onChangeText={(text) => handleInputChange("lastName", text)} style={styles.input}/>

                <Text style={styles.label}>Address</Text>
                <TextInput value={formData.address} onChangeText={(text) => handleInputChange("address", text)} style={styles.input}/>

                <Text style={styles.label}>Weight</Text>
                <TextInput value={formData.weight} keyboardType="numeric" onChangeText={(text) => handleInputChange("weight", text)} style={styles.input}/>

                <Text style={styles.label}>Height</Text>
                <TextInput value={formData.height} keyboardType="numeric" onChangeText={(text) => handleInputChange("height", text)} style={styles.input}/>

                <Text style={styles.label}>Age</Text>
                <TextInput value={formData.age} keyboardType="numeric" onChangeText={(text) => handleInputChange("age", text)} style={styles.input}/>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
}
