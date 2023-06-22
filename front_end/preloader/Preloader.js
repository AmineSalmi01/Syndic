import { useEffect, useState } from "react";
import {
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
} from "react-native";
import LoginScreen from "../screens/LoginScreen";
import Syndic from "../screens/Syndic";

const Preloader = ({route,navigation}) => {

  const {checkToken, setLoginCredential, token, setToken} = route.params;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    checkToken()
  }, [])
  return (
    <View style={styles.parentContainer}>
      {isLoading ? (
        <View style={styles.container}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 150, height: 50 }}
          />

          <ActivityIndicator
            animating={isLoading}
            size="large"
            color="#873EE4"
          />

          <StatusBar style="auto" />
        </View>
      ) : (
        <LoginScreen checkToken={checkToken} setLoginCredential={setLoginCredential} token={token} setToken={setToken} navigation={navigation}/>
        // <Syndic/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  parentContainer: {
    flex: 1,
  },
});

export default Preloader;
