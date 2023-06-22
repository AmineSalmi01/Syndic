import { Image, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import profile from "../assets/syndic_profile.png";
import logo from "../assets/logo.png";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';



const Nav = () => {
  const Route = useRoute()

  const setIsloggedIn = Route.params.setIsloggedIn

  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setIsloggedIn(false)
    } catch (error) {
      console.log('error remove token', error);
    }
  };

  return (
    <View style={styles.container}>
         <View style={styles.top}>
            <Image style={styles.image} source={profile} />
            <Image style={styles.logo} source={logo} />
            <Ionicons onPress={LogOut} name="log-out-outline" style={{ fontSize: 22 }} color={"#000"} />
         </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 15,
      marginTop: 15,
    },
    image: {
      width: 35,
      height: 35,
    },
    logo: {
      width: 120,
      height: 40,
    },
    top: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    }, 
})

export default Nav