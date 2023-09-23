import { StyleSheet } from 'react-native';
import { ItemList } from './ItemList';
import { ImageModal } from './ImageModal';
import { DetailsPage } from './DetailsPage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export type StackParamList = {
  Gallery: undefined,
  Details: { id: number; url: string};
  Modal: {id: number; url: string},
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
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
