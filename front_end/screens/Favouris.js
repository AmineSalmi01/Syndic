import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import profile from "../assets/syndic_profile.png";
import logo from "../assets/logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "../components/Nav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Favouris = () => {
  const [annonce, setAnnonce] = useState([]);
  const { selectResident } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://192.168.137.101:8000/api/annonce");
        //   console.log(res.data);
        const newData = res.data.filter((item) => item.favouris);
        console.log(newData);
        setAnnonce(newData);
      } catch (error) {

        console.log("Error select data", error);
      }
    };
    getData();
  }, []);

  const deleteAnonnce = async (id) => {
    try {
      const res = await axios.delete(
        "http://192.168.137.101:8000/api/annonce/" + id
      );
      setAnnonce((old) => {
        return old.filter((item) => item.id !== id);
      });
    } catch (error) {
      console.log("deleted failed", error);
    }
  };

  const favouris = async (id) => {
    try {
      const res = await axios.put(
        "http://192.168.137.101:8000/api/annonce/" + id
      );
      if (res) {
        console.log("deleted");
      }
      const newData = annonce.map((item) => {
        if (item.id === id) {
          return { ...item, favouris: !item.favouris };
        }
        return item;
      });
      setAnnonce(newData);
    } catch (error) {
      console.log("deleted failed", error);
    }
  };
  return (
    <View>
      <Nav />
      <ScrollView>
        {/*  */}
        {annonce ? (
          annonce.map((item) => {
            return (
              <View
                style={{
                  gap: 18,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  backgroundColor: "#fff",
                  padding: 15,
                  marginTop: 15,
                  borderRadius: 20,
                  elevation: 5,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{ display: "flex", flexDirection: "row", gap: 6 }}
                  >
                    <Image style={{ width: 30, height: 30 }} source={profile} />
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>
                      {item.syndic.firstName} {item.syndic.lastName}
                    </Text>
                  </View>
                  <Ionicons
                    name="close-outline"
                    style={{ fontSize: 20, color: "#000" }}
                    onPress={() => deleteAnonnce(item.id)}
                  />
                </View>
                <Text
                  style={{ fontSize: 15, textAlign: "justify", width: "100%" }}
                >
                  {item.message}
                </Text>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Ionicons
                    color={"#f00"}
                    name="bookmark-outline"
                    style={{
                      fontSize: 20,
                    }}
                    onPress={() => favouris(item.id)}
                  />
                  <Ionicons
                    name="create-outline"
                    style={{ fontSize: 20, color: "#000" }}
                  />
                </View>
              </View>
            );
          })
        ) : (
          <Text>No favouris</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Favouris;
