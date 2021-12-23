import React, {Component, useEffect, useState} from 'react';
import { Text, Platform, ActivityIndicator} from 'react-native'; 
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Container, View } from "native-base";
 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
const Stack = createStackNavigator();  
import Login from './Login';
import Register from './Register'; 
import Welcome from './Welcome';
import auth from '@react-native-firebase/auth'; 
import PageList from './PageList';
import Profile from './Profile';

function AppNavigator(prop) {
    const DataSesi = prop.route.params.DataUser
    return ( 
        <Stack.Navigator initialRouteName={'home'}>   
            <Stack.Screen name="home" component={Welcome} options={({ route, navigation }) => ({
                title: '', headerTransparent: true,
            })}/> 
  
            <Stack.Screen name="pagelist" component={PageList} initialParams={{DataSesi}} options={({ route, navigation }) => ({
                title: 'List',
                headerLeft: () => (
                    <Text onPress={() => navigation.goBack()} style={{color:'#F04758', fontWeight: '700', fontSize:14, paddingHorizontal:12 }}>Back</Text>
                ),
                headerRight: () => (
                    <Text onPress={() => navigation.navigate('profile')} style={{color:'#F04758', fontWeight: '700', fontSize:14, paddingHorizontal:12 }}>Profile</Text>
                ),
            })}/>
                {/* {props => <PageList {...props} DataUser={JSON.stringify(props)} />}
            </Stack.Screen> */}
            
            <Stack.Screen name="profile" component={Profile} initialParams={{DataSesi}} options={({ route, navigation }) => ({
                title: 'Profile',
                headerLeft: () => (
                    <Text onPress={() => navigation.goBack()} style={{color:'#F04758', fontWeight: '700', fontSize:14, paddingHorizontal:12 }}>Back</Text>
                ),
            })}/> 
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


export default function RootStack() {
    const [Loggin, setLoggin] = useState(false)
    const [Load, setLoad] = useState(true)
    const [DataUser, setDataUser] = useState('')
    
    const onAuthStateChanged = (user) => {
        console.log('userFb', user)
        setLoggin(user != null)
        setDataUser(user)
        setLoad(false)
    }

    useEffect(() => { 
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount 
    }, [])
 
    return (  
        Load ?
        <Container style={{justifyContent: 'center'}}>
            <ActivityIndicator size="small" color={'#F04758'}/>
        </Container>
        :
        <NavigationContainer> 
            <Stack.Navigator initialRouteName={Loggin ? 'App':'Auth'} screenOptions={{headerShown: false}}>
            <Stack.Screen initialParams={{DataUser: JSON.stringify(DataUser)}} name="App" component={AppNavigator}/> 
            <Stack.Screen name="Auth" component={AuthStack}/>
            </Stack.Navigator> 
        </NavigationContainer> 
    );
}
 