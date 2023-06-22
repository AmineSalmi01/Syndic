import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native"
import AuthContext from "../components/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import Nav from "../components/Nav";


const AllResident = () => {
    const {selectResident,data, setData} = useContext(AuthContext);

  
    useEffect(() => {
        selectResident()
    }, [])
    
    // const renderItem = (item) => {

    //  <View style={item.item.price == 0 ? { backgroundColor: "#F8F0FF",
    //     display: "flex",
    //     width: 140,
    //     height: 120,
    //     borderRadius: 15,
    //     justifyContent: "space-between"}:  { backgroundColor: "#FD5B5B",
    //     display: "flex",
    //     width: 140,
    //     height: 120,
    //     borderRadius: 15,
    //     justifyContent: "space-between"} }>
        
    //     <View style={styles.titleCard}>
    //       <Text style={ item.item.price == 0 ? { color: "#000", fontWeight: "700" }: { color: "#fff", fontWeight: "700" } }>{item.item.resident.firstName} {item.item.resident.lastName}</Text>
    //     </View>
    //     <View style={styles.payValider}>
    //       <Ionicons
    //         name={item.item.price == 0 ? "checkmark-outline" : "alert-circle-outline"}
    //         style={item.item.price == 0 ? {color: '#000' , fontSize: 18}: {color:"#fff", fontSize:18}}
    //       />
    //       <Text style={item.item.price == 0 ? { color: "#000", fontWeight:"700" }: { color: "#fff" , fontWeight:"700"}}>{item.item.price}$</Text>
    //     </View>
    //   </View>
    // }
    const renderItem=(item)=>{
        <View><Text>
           hello
            </Text></View>
    }

    console.log("kkkkkkkk",data)
  return (
    <View>
    
    <Nav />
    <View style={styles.containerCardPay}>
       {data && data.length ? data.map((item)=>    <View style={item.price == 0 ? { backgroundColor: "#F8F0FF",
    display: "flex",
    width: 140,
    height: 120,
    borderRadius: 15,
    justifyContent: "space-between"}:  { backgroundColor: "#FD5B5B",
    display: "flex",
    width: 140,
    height: 120,
    borderRadius: 15,
    justifyContent: "space-between"} }>
    
    <View style={styles.titleCard}>
      <Text style={ item.price == 0 ? { color: "#000", fontWeight: "700" }: { color: "#fff", fontWeight: "700" } }>{item.resident.firstName} {item.resident.lastName}</Text>
    </View>
    <View style={styles.payValider}>
      <Ionicons
        name={item.price == 0 ? "checkmark-outline" : "alert-circle-outline"}
        style={item.price == 0 ? {color: '#000' , fontSize: 18}: {color:"#fff", fontSize:18}}
      />
      <Text style={item.price == 0 ? { color: "#000", fontWeight:"700" }: { color: "#fff" , fontWeight:"700"}}>{item.price}$</Text>
    </View>
  </View>) : "nope"}
    </View>
</View>
  )
}

const styles = StyleSheet.create({
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

export default AllResident