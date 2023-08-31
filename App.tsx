import { StyleSheet } from 'react-native';
import { ItemList } from './ItemList';
import { ImageModal } from './ImageModal';
import { DetailsPage } from './DetailsPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { WeatherApp } from './WeatherApp/Weather';
import { WeatherStackParam } from './WeatherApp/WeatherStackParam';
import { ScannerScreen } from './BarCodeScanner/BarCodeScannerScreen';
import { ScannerStackParam } from './BarCodeScanner/ScannerStackParam';
import { ProductDetails } from './BarCodeScanner/ProductDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesPage from './BarCodeScanner/FavoritesPage';
import { Ionicons } from '@expo/vector-icons';

export type StackParamList = {
  Gallery: undefined,
  Details: { id: number; url: string},
  Modal: {id: number; url: string},
}

const Stack = createStackNavigator();
const Weather = createStackNavigator<WeatherStackParam>();
const Scanner = createBottomTabNavigator<ScannerStackParam>();
const Drawer = createDrawerNavigator();
const Details = createStackNavigator();

const WeatherNav = () => {
  return (
    <Weather.Navigator>
      <Weather.Screen name="main" component={WeatherApp}/>
    </Weather.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const ProductDetailsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const ScannerNav = () => {
  return (
    <Scanner.Navigator>
      <Scanner.Screen 
      name="main" 
      component={ScannerScreen}
      options={{
        headerShown: false,
        headerTitle: 'Bar-Code Scanner',
        tabBarLabel: 'QR Scanner',
        unmountOnBlur: true,
        headerStyle: { backgroundColor: "#838081", borderBottomColor: 'black',},
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="qr-code" color={color} size={size} />
        ),
      }}
      />
      <Scanner.Screen
      name="Favorites"
      component={FavoritesPage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="heart" color={color} size={size} /> 
        ),
      }}
      />
      <Scanner.Screen
      name='ProductDetails'
      component={ProductDetails}
      options={{
        headerShown: true,
        title: 'Product Details',
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
      }}
      />
      
    </Scanner.Navigator>
  )
}

const StackNav = () => {
  return (
    <Stack.Navigator initialRouteName='Gallery'>
        <Stack.Screen 
        name="Gallery" 
        component={ItemList}
        options={{
          headerShown: true, 
          headerTitle: 'Gallery View', 
          headerStyle: { backgroundColor: "#838081", borderBottomColor: 'black', shadowOpacity: 0, shadowRadius: 0,},
        }} />
        <Stack.Screen 
        name="Details" 
        component={DetailsPage} 
        options={{
          headerBackTitle: 'Go back',
          headerBackTitleStyle: { color: "black"},
          headerTintColor: 'black',
          headerShown: true, 
          headerTitle: 'Details', 
          headerStyle: { backgroundColor: "#838081", borderBottomColor: 'black', shadowColor: 'black'},
          
        }}/>
        <Stack.Screen 
        name="Modal" 
        component={ImageModal}
        options={{
          headerShown: true, 
          headerTitle: 'Image Close-Up', 
          headerBackTitleStyle: { color: "white",},
          headerBackTitle: 'Close',
          headerTintColor: 'black',
          presentation: 'modal',
          headerStyle: { backgroundColor: "black", borderBottomColor: 'black', shadowOpacity: 0, shadowRadius: 0,},
          headerTitleStyle: { color: 'white',  },
        }} />
      </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'slide',
        headerShown: false
      }}>
        <Drawer.Screen 
        name="Image Gallery" 
        component={StackNav} 
        />
        <Drawer.Screen
        name="Weather"
        component={WeatherNav}
        />
        <Scanner.Screen
        name="Bar-Code Scanner"
        component={ScannerNav}
        />
      </Drawer.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
