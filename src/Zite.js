import React, {useEffect} from 'react';
import { Text, Platform} from 'react-native'; 
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, View } from "native-base";
 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const Stack = createStackNavigator();  
import Login from './Login';
import Register from './Register';

import Welcome from './Welcome';
   
function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
    // console.log('route', JSON.stringify(routeName))
    return routeName;
  }

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName={'home'}>  
            <Stack.Screen name="home" component={Welcome}/>

        </Stack.Navigator> 
    );
}


function AuthStack() {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}


const Splash = props => {
    useEffect(() => {
        AsyncStorage.getItem('isLoggedIn').then(data => {
            if (Platform.OS == 'ios'){
                props.navigation.replace(data !== '1' ? 'Auth' : 'App');
            } else {
                setTimeout(() => {
                    props.navigation.replace(data !== '1' ? 'Auth' : 'App');
                }, 2000);
            }
            
        })
        
    }, [])
    return (
        <View >
            <Text>Welcome</Text>
        </View>
    )
}



export default function RootStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Loading'} screenOptions={{headerShown: false}}>
                <Stack.Screen name="Loading" component={Splash} />
                <Stack.Screen name="Auth" component={AuthStack}/>
                <Stack.Screen name="App" component={AppNavigator} />
            </Stack.Navigator>
                
            {/* <Stack.Screen name="App" component={DrawerNavigator} /> */}
            
        </NavigationContainer>
    );
}

