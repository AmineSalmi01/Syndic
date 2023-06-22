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
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import { useNavigation } from "@react-navigation/native";

const Syndic = ({ route, navigation }) => {
  const { globalVariable, syndiId, selectResident, data, setData } =
    useContext(AuthContext);
  const [annonce, setAnnonce] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://192.168.137.101:8000/api/annonce");
        //   console.log(res.data);
        setAnnonce(res.data);
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

  const { setIsloggedIn } = route.params;

  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem("token");
      setIsloggedIn(false);
    } catch (error) {
      console.log("error remove token", error);
    }
  };

  // const selectResident = async () => {
  //   try{
  //     const res = await axios.post('http://192.168.137.177:8000/api/residents' , {syndicID: syndiId});
  //     console.log(res.data);
  //     setData(res.data);
  //   }
  //   catch (error) {
  //     console.log('Error select data',error)
  //   }
  // }

  useEffect(() => {
    selectResident();
  }, []);

  const renderItem = (item) => (
    <View style={styles.containerProfile}>
      <View
        style={
          item.item.price == 0
            ? {
                backgroundColor: "#F8F0FF",
                display: "flex",
                flexDirection: "row",
                width: 130,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                gap: 5,
              }
            : {
                backgroundColor: "#FD5B5B",
                display: "flex",
                flexDirection: "row",
                width: 130,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                gap: 5,
              }
        }
      >
        <Text
          style={
            item.item.price == 0
              ? { color: "#000", fontWeight: "700" }
              : { color: "#fff", fontWeight: "700" }
          }
        >
          {item.item.resident.firstName} {item.item.resident.lastName}
        </Text>
      </View>
    </View>
  );

  const renderDetails = (item) => (
    <View
      style={
        item.item.price == 0
          ? {
              backgroundColor: "#F8F0FF",
              display: "flex",
              width: 140,
              height: 120,
              borderRadius: 15,
              justifyContent: "space-between",
            }
          : {
              backgroundColor: "#FD5B5B",
              display: "flex",
              width: 140,
              height: 120,
              borderRadius: 15,
              justifyContent: "space-between",
            }
      }
    >
      <View style={styles.titleCard}>
        <Text
          style={
            item.item.price == 0
              ? { color: "#000", fontWeight: "700" }
              : { color: "#fff", fontWeight: "700" }
          }
        >
          {item.item.resident.firstName} {item.item.resident.lastName}
        </Text>
      </View>
      <View style={styles.payValider}>
        <Ionicons
          name={
            item.item.price == 0 ? "checkmark-outline" : "alert-circle-outline"
          }
          style={
            item.item.price == 0
              ? { color: "#000", fontSize: 18 }
              : { color: "#fff", fontSize: 18 }
          }
        />
        <Text
          style={
            item.item.price == 0
              ? { color: "#000", fontWeight: "700" }
              : { color: "#fff", fontWeight: "700" }
          }
        >
          {item.item.price}$
        </Text>
      </View>
    </View>
  );
  const redirectPage = () => {
    navigation.navigate("AllResident");
  };
  return (
    <View style={styles.container}>
      {/* Top */}
      <Nav />

      {/* Title */}
      <View style={styles.resident}>
        <Text style={{ fontWeight: "900" }}>RESIDENT</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Pressable onPress={redirectPage}>
            <Text style={{ color: "#AF76E0", fontWeight: "600" }}>SEE ALL</Text>
          </Pressable>
          <Ionicons
            name="arrow-forward-outline"
            style={{ fontSize: 18, color: "#AF76E0" }}
          />
        </View>
      </View>

      {/*  */}
      <View style={styles.containerProfile}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>

      <View>
        <Text style={{ fontWeight: "900", marginTop: 55 }}>RESIDENT</Text>
      </View>

      {/*  */}
      <View style={styles.containerCardPay}>
        <FlatList
          data={data}
          renderItem={renderDetails}
          keyExtractor={(item) => item.id}
          numColumns={2}
        />
      </View>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginTop: 30,
        }}
      >
        <Text style={{ color: "#AF76E0", fontWeight: "600" }}>
          ajouter une annonce
        </Text>
        <Ionicons
          name="add-outline"
          style={{ fontSize: 18, color: "#AF76E0" }}
        />
      </View>

      <ScrollView horizontal>
        {/*  */}
        {annonce.map((item) => {
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
                <View style={{ display: "flex", flexDirection: "row", gap: 6 }}>
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
              <Text style={{ fontSize: 15, textAlign: "justify", width: 340 }}>
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
				color={item.favouris == true ? "#f00" : "#000"}
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
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  resident: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  profileResident: {
    width: 25,
    height: 25,
  },
  card: {
    backgroundColor: "#F8F0FF",
    display: "flex",
    flexDirection: "row",
    width: 130,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    gap: 5,
  },
  containerProfile: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
    marginTop: 15,
  },
  titleCard: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    padding: 6,
    justifyContent: "center",
  },

  cardPay: {
    backgroundColor: "#F8F0FF",
    display: "flex",
    width: 140,
    height: 120,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  cardPayRouge: {
    backgroundColor: "#FD0404 ",
    display: "flex",
    width: 140,
    height: 120,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  payValider: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
  },
  containerCardPay: {
    display: "flex",
    flexDirection: "row",
    gap: 17,
    marginTop: 15,
  },
});

export default Syndic;
