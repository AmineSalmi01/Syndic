import { StatusBar } from 'expo-status-bar';
import Preloader from './preloader/Preloader';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import Syndic from './screens/Syndic';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import ResidentRegisterScreen from './screens/ResidentRegisterScreen';
import AuthContext, { AuthProvider } from './components/AuthContext';
import ResidentDashbord from './components/ResidentDashbord';
import AllResident from './screens/AllResident';
import Favouris from './screens/Favouris';

export default function App() {
  const Tab = createBottomTabNavigator();
  const [token, setToken] = useState('');
  const [isloggedin, setIsloggedIn] = useState(false);
  const [loginCredential, setLoginCredential] = useState('');

  const checkToken = async () => {
    const storedToken = await AsyncStorage.getItem('token');
    if (storedToken) {
      setIsloggedIn(true);
      setToken(storedToken); 
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const hideAllResidentButton = () => null; // Custom function to hide the button

  if (isloggedin && token === 'syndic') {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name='SYNDIC'
              component={Syndic}
              initialParams={{ setIsloggedIn }}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='home' style={{ fontSize: 18 }} color={'#000'} />
                ),
                tabBarLabel: '',
              }}
            />
            <Tab.Screen
              name='favouris'
              component={Favouris}
              initialParams={{ setIsloggedIn }}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='bookmark-outline' style={{ fontSize: 18 }} color={'#000'} />
                ),
                tabBarLabel: '',
                unmountOnBlur: true
              }}
            />
            <Tab.Screen
              name='RegisterUser'
              initialParams={{ setIsloggedIn, loginCredential }}
              component={ResidentRegisterScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name='person-add-outline' style={{ fontSize: 18 }} color={'#000'} />
                ),
                tabBarLabel: '',
              }}
            />
            <Tab.Screen
              name='AllResident'
              component={AllResident}
              options={{
                tabBarButton: hideAllResidentButton, // Hide the button in the bottom tab bar
              }}
              initialParams={{ setIsloggedIn }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
  } else if (isloggedin && token !== 'syndic') {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              component={ResidentDashbord}
              initialParams={{ setIsloggedIn }}
              name='RESIDENT'
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name='login'
              component={Preloader}
              initialParams={{ checkToken, isloggedin, setLoginCredential, setToken, token }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
  }
}