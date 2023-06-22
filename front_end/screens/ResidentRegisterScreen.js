import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";


const ResidentRegisterScreen = ({ route }) => {

    const {globalVariable} = useContext(AuthContext)

    const [formValue, setFormValue]=useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        image: '',
        tele: '',
        syndicCredentioal: globalVariable,
    });

    const handleChange = (name, value) => {
        setFormValue((prevState)=>({
            ...prevState, [name]:value
        }))
    }
    const handleRegisterSubmite = async () => {
        console.log(formValue);
        try{
            const api = await axios.post('http://192.168.137.101:8000/residentRegister', formValue);
             console.log(api.data);
        }
        catch(error) {
            console.log(error)
        }
        
    }
 
  return (
    <View>
        <Nav />
        <Text style={{ fontWeight: "900" }}>Add resident</Text>
        <View style={styles.input}>
             <TextInput onChangeText={(text) => handleChange('firstName',text)} name='firstName' placeholder="First Name" style={{paddingVertical: 0, fontSize: 10}} />
             <TextInput onChangeText={(text) => handleChange('lastName',text)} name='lastName' placeholder="Last Name" style={{paddingVertical: 0, fontSize: 10}} />
             <TextInput onChangeText={(text) => handleChange('email',text)} name='email' placeholder="Email" style={{paddingVertical: 0, fontSize: 10}} />
             <TextInput onChangeText={(text) => handleChange('password',text)} name='password' placeholder="password" style={{ paddingVertical: 0, fontSize: 10 }} secureTextEntry={true} />
             <TextInput onChangeText={(text) => handleChange('image',text)} name='image' placeholder="image" style={{paddingVertical: 0, fontSize: 10}} />
             <TextInput onChangeText={(text) => handleChange('tele',text)} name='tele' placeholder="Tele" style={{paddingVertical: 0, fontSize: 10}} />
        </View>
        <TouchableOpacity onPress={handleRegisterSubmite} style={styles.btnLogin}>
                    <Text style={styles.textBtn}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({

    input: {
        flexDirection: 'column',
        borderBottomColor: '#BDB5B5',
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        marginBottom: 15,
        
    },
    btnLogin: {
        backgroundColor: '#C627E6',
        borderRadius: 10,
        padding: 7,
    },
 
})


export default ResidentRegisterScreen