import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
// Screens
import Home from '../Navscreens/Home'
import Detail from '../Navscreens/Detail'
import { Dashboard } from '../screens';

//Screen names
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function Mainnav() {
  return (
  
      <Tab.Navigator
        initialRouteName={"Home"}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === detailsName) {
              iconName = focused ? 'people-sharp' : 'people-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'exit' : 'exit-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} color={color} />;
          },
          tabBarStyle: [
            {

            height:80,
            paddingBottom:10,
            // borderRadius:10,
            borderTopEndRadius:20,
            borderTopStartRadius:20,
            // borderBottomLeftRadius:20,
            backgroundColor:'black',
            borderColor:'purple',
            borderWidth:5,

  
            
          },
            null
          ],
        })}
        tabBarOptions={{
          activeTintColor: 'brown',
          inactiveTintColor: 'purple',
          labelStyle:{ fontSize: 10 },
        }}
        >

        <Tab.Screen name="Home" component={Home}
        options={{
           headerShown:false,
          tabBarLabel: 'Categorise',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color='green' size={35} />
          ),
       }}
        />
        <Tab.Screen   options={{
           headerShown:false,  tabBarLabel: 'Profile',}} name="Details" component={Detail} />
        <Tab.Screen options={{
           headerShown:false,  tabBarLabel: 'Logout',}}
         name="Settings" component={Dashboard} />

      </Tab.Navigator>
  );
}

export default Mainnav;