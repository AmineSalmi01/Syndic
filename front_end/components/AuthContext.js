import React, { createContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable,] = useState(null);
  const [syndiId, setSyndiId] = useState('');
  const [data, setData] = useState([]);


  const selectResident = async () => {
    try{
      const res = await axios.post('http://192.168.137.101:8000/api/residents' , {syndicID: syndiId});
    //   console.log(res.data);
      setData(res.data);
    }
    catch (error) {
      console.log('Error select data',error)
    }
  }

  return (
    <AuthContext.Provider value={{ globalVariable, setGlobalVariable, syndiId, setSyndiId, selectResident, data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;