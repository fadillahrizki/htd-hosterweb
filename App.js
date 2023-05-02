import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BankSoal from './screens/BankSoal';
import DetailBankSoal from './screens/DetailBankSoal';
import DetailTransaksi from './screens/DetailTransaksi';
import EditProfile from './screens/EditProfile';
import ForgotPassword from './screens/ForgotPassword';
import Home from './screens/Home';
import Login from './screens/Login';
import PhotoManagement from './screens/PhotoManagement';
import Register from './screens/Register';
import Splash from './screens/Splash';
import Transaksi from './screens/Transaksi';
import { Color } from './styles/global';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Splash"} screenOptions={{title:'INDERI for Doctors', headerTitleAlign:'center', headerTintColor: Color.White, headerStyle:{backgroundColor:Color.Primary}}}>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerShown: false}}/>
        <Stack.Screen name="PhotoManagement" component={PhotoManagement}/>
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
