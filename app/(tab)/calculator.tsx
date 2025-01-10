import {Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BodyFatChart from "@/app/components/BodyFatChart";

export default function Calculator() {
    const [data, setData] = useState(null);
    const [bmi, setBmi] = useState(null);
    const [bodyFat, setBodyFat] = useState(null);
    const [waistSize, setWaistSize] = useState('');
    const [neckSize, setNeckSize] = useState('');
    const [bodyFatHistory, setBodyFatHistory] = useState([]);


    const fetchUserData = async () => {
        try {
            const user = await asyncStorage.getItem('user');
            if(user) {
                setData(JSON.parse(user));
            }
        } catch (error) {
            Alert.alert("Error", 'Failed To fetch Data Of The User');
        }
    };


    const updateUserData = async () => {
        if(!waistSize || !neckSize) {
            Alert.alert('Error', 'Please Enter Valid Waist And Neck Size');
            return;
        }
        const updatedData = {
            ...data,
            waistSize,
            neckSize,
        };
        try {
            await asyncStorage.setItem('user', JSON.stringify(updatedData));
            setData(updatedData);
        } catch (error) {
            Alert.alert('Error', 'Failed To Update User Data');
        }
    };

   useEffect(() => {
       const calculateBodyFat =  () => {
           if(data && data.height && data.neckSize && data.waistSize) {
               const height = parseFloat(data.height);
               const neckSize = parseFloat(data.neckSize);
               const waistSize = parseFloat(data.waistSize);

               if(!isNaN(height) && !isNaN(neckSize) && !isNaN(waistSize) && height > 0) {
                   const bodyFatCount = (86.010 * Math.log10(waistSize - neckSize) - 70.041 * Math.log10(height) + 36.76).toFixed(2);
                   setBodyFat(bodyFatCount);
               } else {
                   setBodyFat(null);
               }
           } else {
               setBodyFat(null);
           }
       };
       calculateBodyFat()
   }, [data]);



    useEffect(() => {
        const countBmi = async () => {
            await  fetchUserData()
            if(data) {
                const weight = parseFloat(data.weight);
                const height = parseFloat(data.height);
                const heightToMeters = height / 100;

                if(!isNaN(height) && !isNaN(weight) && height > 0) {
                    const calculatedBmi = (weight / (heightToMeters * heightToMeters)).toFixed(2);
                    setBmi(calculatedBmi);
                } else {
                    Alert.alert("Error", "Invalid Weight or Height values");
                }
            }
        }
        countBmi();
    }, [data]);

    useEffect(() => {
        const fetchBodyFatHistory = async () => {
            try {
                const history = await AsyncStorage.getItem('bodyFatHistory');
                if (history) {
                    setBodyFatHistory(JSON.parse(history));
                }
            } catch (error) {
                console.error('Failed to fetch body fat history:', error);
            }
        };
        fetchBodyFatHistory();
    }, []);

    const saveBodyFat = async () => {
        if (bodyFat) {
            const newHistory = [...bodyFatHistory, { date: new Date().toISOString(), value: parseFloat(bodyFat) }];
            try {
                await AsyncStorage.setItem('bodyFatHistory', JSON.stringify(newHistory));
                setBodyFatHistory(newHistory);
            } catch (error) {
                Alert.alert('Error', 'Failed to save body fat percentage');
            }
        } else {
            Alert.alert('Error', 'No body fat percentage to save');
        }
    };

    return (
        <ScrollView>
            <View  style={styles.container}>
                <Text style={styles.title}>Body Fat Calculation</Text>
                <ScrollView contentContainerStyle={styles.form}>

                    <Text style={styles.label}>Waist size</Text>
                    <TextInput  style={styles.input} value={waistSize} onChangeText={setWaistSize} keyboardType="numeric"/>

                    <Text style={styles.label}>Neck size</Text>
                    <TextInput style={styles.input} value={neckSize} onChangeText={setNeckSize} keyboardType="numeric"/>

                    <TouchableOpacity style={styles.button} onPress={updateUserData}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
            <View style={styles.container}>
                <Text style={styles.bmiTitle}>Your BMI</Text>
                <Text style={styles.results}>{bmi}%</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.bmiTitle}>Body Fat</Text>
                <Text style={styles.results}>{bodyFat}%</Text>
                <TouchableOpacity style={styles.button} onPress={saveBodyFat}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Text style={styles.bmiTitle}>Body Fat Chart</Text>
                <BodyFatChart data={bodyFatHistory} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 23,
        textAlign: 'center',
        fontFamily: 'serif',
        padding: 5,
    },
    container: {
        backgroundColor: 'white',
        marginTop: 10,
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
    bmiTitle: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'serif',
        padding: 5,
    },
    results: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'serif',
        padding: 5,
        color: '#008fff'
    }
});