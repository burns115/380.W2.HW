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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FavoritesPage from './BarCodeScanner/FavoritesPage';
import { Ionicons } from '@expo/vector-icons';
import { ProductDetails } from './BarCodeScanner/ProductDetails';
import Battery from './Battery/Battery';
import { CharCreator } from './Final/CharCreator';
import { CharViewer } from './Final/CharViewer';
import { CharModal } from './Final/CharModal';

export type StackParamList = {
  Gallery: undefined,
  Details: { id: number; url: string},
  Modal: {id: number; url: string},
}

const Stack = createStackNavigator();
const Weather = createStackNavigator<WeatherStackParam>();
const Scanner = createBottomTabNavigator<ScannerStackParam>();
const Drawer = createDrawerNavigator();
const Character = createBottomTabNavigator();
const CharStack = createStackNavigator();

const WeatherNav = () => {
  return (
    <Weather.Navigator>
      <Weather.Screen name="main" component={WeatherApp}/>
    </Weather.Navigator>
  )
}

const Tab = createBottomTabNavigator();

function CharViewerStack()
{
  return (
    <CharStack.Navigator>
      <CharStack.Screen 
      name='CharViewer' 
      component={CharViewer} 
      options={{
        headerShown: false,
      }} />
      <CharStack.Screen options={{
        presentation: "modal",
        title: "Character Details",
        headerStyle: {
          backgroundColor: "black",
        },
        headerTintColor: "white",
        }} name='CharModal' component={CharModal} />
    </CharStack.Navigator>
  )
};

function ProductDetailsStack() 
{
  return (
    <Stack.Navigator>
      <Stack.Screen name="main" 
      component={ScannerScreen}
      options={{
        headerShown: false,
        headerTitle: 'Bar-Code Scanner',
        headerStyle: { backgroundColor: "#838081", borderBottomColor: 'black',},
      }}
      />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  )
};

const CharacterNav = () => {
  return (
    <Character.Navigator initialRouteName="CharCreator" 
    tabBarOptions={{
      style: { backgroundColor: 'black' },
      labelStyle: { color: 'black' },

    }}>
      <Character.Screen name="CharCreator" component={CharCreator} 
      options={{
        headerTitle: 'Character Creator',
        headerTitleStyle: { color: "white" },
        headerStyle: { backgroundColor: "black", borderBottomColor: 'black',},
        tabBarLabel: "Character Creator",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="add-circle-outline" color={'black'} size={size} />
        ),
      }}/>
      <Character.Screen name="CharViewerStack" component={CharViewerStack} 
      options={{
        headerShown: false,
        tabBarLabel: "View Characters",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people-outline" color={'black'} size={size} />
        ),
      }}/>
    </Character.Navigator>
  )
}
  

const ChargerNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Battery" component={Battery} />
    </Stack.Navigator>
  )
}

const ScannerNav = () => {
  return (
    <Scanner.Navigator>
      <Scanner.Screen 
      name="ProductDetailsStack" 
      component={ProductDetailsStack}
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
      listeners={({ navigation }) => ({
        tabPress: (e) => {
          e.preventDefault();
    
          navigation.navigate('ProductDetailsStack', {
            screen: 'ScannerScreen',
          });
        },
      })}
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
        <Drawer.Screen
        name="Bar-Code Scanner"
        component={ScannerNav}
        />
        <Drawer.Screen
        name="Shake to Charge"
        component={ChargerNav}
        />
        <Drawer.Screen
        name="DND Character Creator"
        component={CharacterNav}
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
