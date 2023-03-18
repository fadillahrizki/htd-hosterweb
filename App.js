import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BankSoal from './screens/BankSoal';
import DetailTransaksi from './screens/DetailTransaksi';
import DetailBankSoal from './screens/DetailBankSoal';
import EditProfile from './screens/EditProfile';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import Transaksi from './screens/Transaksi';
import { useEffect, useState } from 'react';
import Splash from './screens/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Splash"} screenOptions={{title:'HosterWeb', headerTitleAlign:'center'}}>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="BankSoal" component={BankSoal}/>
        <Stack.Screen name="DetailBankSoal" component={DetailBankSoal}/>
        <Stack.Screen name="Transaksi" component={Transaksi}/>
        <Stack.Screen name="DetailTransaksi" component={DetailTransaksi}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
