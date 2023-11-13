import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Storysection from '../Navscreens/Storysection';
import Home from '../Navscreens/Home';
import { StartScreen,
       LoginScreen,
       RegisterScreen,
       ResetPasswordScreen,
       Dashboard
} from '../screens';

import Mainnav from './Mainnav';
const Stack = createStackNavigator();

function MyStack() {
  return (
     <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen  options={{headerShown:false}} name="StartScreen" component={StartScreen} />
      <Stack.Screen options={{headerShown:false}}  name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false}} name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen options={{headerShown:false}} name="Dashboard" component={Dashboard} />
      <Stack.Screen options={{headerShown:false}} name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Stack.Screen options={{headerShown:false}} name="BottomNAv" component={Mainnav} />
      <Stack.Screen options={{headerShown:true}} name="Home" component={Home} />
      <Stack.Screen options={{headerShown:false}} name="Storysection" component={Storysection} />
      
    </Stack.Navigator>
     </NavigationContainer>
    
  );
}

export default MyStack