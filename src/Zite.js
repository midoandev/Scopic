import React, {useEffect, useState} from 'react';
import { Text, Platform} from 'react-native'; 
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, View } from "native-base";
 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const Stack = createStackNavigator();  
import Login from './Login';
import Register from './Register'; 
import Welcome from './Welcome';
import auth from '@react-native-firebase/auth';
import { SafeAreaProvider,  initialWindowMetrics } from 'react-native-safe-area-context' 
   
function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Dashboard';
    // console.log('route', JSON.stringify(routeName))
    return routeName;
  }

function AppNavigator() {
    return ( 
        <Stack.Navigator initialRouteName={'home'}>  
            <Stack.Screen name="home" component={Welcome} options={{ headerShown: false }}/>

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
    const onAuthStateChanged = (user) => {
        console.log('userFb', user)
        
        setTimeout(() => {
            props.navigation.replace(user == null ?'Auth' : 'App');
        }, 1000);
        
    }

    useEffect(() => { 
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount 
    }, [])

    return (
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Welcome</Text>
        </View>
    )
}



export default function RootStack() {
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'Loading'} screenOptions={{headerShown: false}}>
                <Stack.Screen name="Loading" component={Splash} />
                <Stack.Screen name="Auth" component={AuthStack}/>
                <Stack.Screen name="App" component={AppNavigator} />
            </Stack.Navigator>
                
            {/* <Stack.Screen name="App" component={DrawerNavigator} /> */}
            
        </NavigationContainer>
        </SafeAreaProvider>
    );
}



