import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AuthContext from "../components/AuthContext";

const LoginScreen = ({ checkToken, setLoginCredential, setToken, token }) => {
  const { globalVariable, setGlobalVariable, setSyndiId } =
    useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const navigation = useNavigation(); // Access the navigation object


  useEffect(() => {
    checkToken();
  }, [token]);

  const handleLoginEmail = (text) => {
    setEmail(text);
  };

  const handleLoginPassword = (text) => {
    setPassword(text);
  };

  const handleLoginSubmit = async () => {
    console.log(email);
    console.log(password);

    try {
      const res = await axios.post("http://192.168.137.101:8000/api/login", {
        email,
        password,
      });
      console.log(res.data);
      const authToken = res.data.token;
      await AsyncStorage.setItem("token", authToken);
      if (res.data.syndic) {
        setGlobalVariable(res.data.syndic.email);
        setSyndiId(res.data.syndic.id);
      }
      setToken(authToken);
      //   if (authToken === 'syndic') {
      //     navigation.navigate('SYNDIC');
      //   } else if (authToken !== 'syndic') {
      //     navigation.navigate('RESIDENT');
      //   }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.upImage}>
        <Image
          style={{ height: 130, width: 150 }}
          source={require("../assets/up.png")}
        />
      </View>
      <View style={styles.centerImage}>
        <Image
          style={{ height: 250, width: 250 }}
          source={require("../assets/imageLogin.png")}
        />
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <Text style={{ marginBottom: 25, color: "#C627E6", fontWeight: 700 }}>
          Login
        </Text>
        <View style={styles.input}>
          <TextInput
            onChangeText={handleLoginEmail}
            name="email"
            placeholder="Email"
            style={{ paddingVertical: 0, fontSize: 10 }}
          />
          <Ionicons name="mail" style={{ fontSize: 18 }} color={"#BDB5B5"} />
        </View>
        <View style={styles.input}>
          <TextInput
            onChangeText={handleLoginPassword}
            name="password"
            placeholder="password"
            style={{ paddingVertical: 0, fontSize: 10 }}
            secureTextEntry={true}
          />
          <Ionicons name="eye" style={{ fontSize: 18 }} color={"#BDB5B5"} />
        </View>
        <TouchableOpacity onPress={handleLoginSubmit} style={styles.btnLogin}>
          <Text style={styles.textBtn}>Login</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Image
          style={{ height: 140, width: 130 }}
          source={require("../assets/down.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  upImage: {
    alignItems: "flex-end",
  },
  centerImage: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flexDirection: "row",
    borderBottomColor: "#BDB5B5",
    borderBottomWidth: 1,
    justifyContent: "space-between",
    marginBottom: 15,
  },
  btnLogin: {
    backgroundColor: "#C627E6",
    borderRadius: 10,
    padding: 7,
  },
  textBtn: {
    textAlign: "center",
    fontWeight: 500,
    fontSize: 12,
    color: "#fff",
  },
});

export default LoginScreen;
