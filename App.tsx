

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ListProvider } from './src/contexts/ListContext';
import { StatusBar } from 'expo-status-bar';

export type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  NewProduct: undefined  
  EditProduct: {item: {type: string, name: string, price: string}, index:number}
};

import StartScreen from './src/routes/StartScreen';
import NewProductScreen from './src/routes/NewProductScreen';
import EditProductScreen from './src/routes/EditProductScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <ListProvider>
    <NavigationContainer>
    <StatusBar style="light" backgroundColor='#1976d2' />
      <Stack.Navigator  screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={StartScreen} />
        <Stack.Screen name="NewProduct" component={NewProductScreen} />
        <Stack.Screen name="EditProduct" component={EditProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </ListProvider>
  );
}
export default App;