import { Container, Input } from 'native-base'
import React, { useCallback, useEffect, useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import database from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Login = props => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [SecurePass, setSecurePass] = useState(true)
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
  
    // Handle user state changes
    const onAuthStateChanged = (user) => {
        console.log('userFb', user)
    //   setUser(user);
    //   if (initializing) setInitializing(false);
    }

    useEffect(() => {  
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount 
    }, [])

    const login = () => {
        auth() .createUserWithEmailAndPassword(email, password) //Pass credential here
        .then((res) => {
            firebase
                .database()
                .ref('users / ')
                .push({
                    user: {
                        email: Email, // pass your name
                        passsword: Password, //pass your email
                        uuid: firebase.auth().currentUser.uid,
                    },
                });
            navigation.navigate('Dashboard');
        })
        .catch((err) => {
            alert(err);
        });
        
    }
  
    return (
        <Container style={{paddingVertical: 20}}>

            <View style={{flex:1, justifyContent: 'center', paddingHorizontal:24}}>

                <View style={{ justifyContent: 'center', alignItems:'center', marginBottom:40}}>
                    <Text style={{color:'#A4AEB8', fontSize: 20, fontWeight: 'bold', letterSpacing: 1}}>Scopic</Text>
                </View>
                <Text style={{fontSize: 24, fontWeight: 'bold', letterSpacing: 1, marginBottom:40, }}>Sign In</Text>
                 
                
                <Text style={{color:'#F04758', fontWeight: '700', letterSpacing: 1, lineHeight:23 }}>Email</Text>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc',height:50, flexDirection:'row', }}> 
                    <TextInput
                        style={{borderBottomWidth:1, borderBottomColor:'#ccc', paddingVertical:12, height:50}}
                        onChangeText={tx => setEmail(tx)}
                        value={Email}
                        placeholder='Your email address' 
                        keyboardType='email-address'
                    />
                </View> 

                <Text style={{color:'#F04758', fontWeight: '700', letterSpacing: 1, lineHeight:23, marginTop:24 }}>Password</Text>
                <View style={{borderBottomWidth:1, borderBottomColor:'#ccc',height:50, flexDirection:'row', }}> 
                    <TextInput
                        onChangeText={tx => setPassword(tx)}
                        value={Password}
                        style={{flex:1 }}
                        placeholder='Your password'
                        keyboardType='default'  
                        secureTextEntry={SecurePass}
                        onChangeText={tx => setPassword(tx)}
                    />
                
                    <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center', width: '10%'}}
                        onPress={() => setSecurePass(prev => !prev)}>
                        <FontAwesome name={SecurePass ? "eye-slash" :"eye"} size={18} color={!SecurePass ? "#F04758" :"#ccc"} />
                    </TouchableOpacity>
                </View>


                <TouchableOpacity activeOpacity={.8}
                style={{backgroundColor:'#F04758', marginTop:24, padding:16, borderRadius:4, alignItems: 'center'}}
                    onPress={() => props.navigation.replace('App')}>
                <Text style={{color:'#fff', fontWeight: '700', letterSpacing: 1,  }}>Sign In</Text>
                </TouchableOpacity>


                <View style={{alignItems:'flex-end', marginTop:40,}}>
                    <Text style={{color:'#F04758', fontWeight: 'bold', letterSpacing: 1, }}>Sign Up</Text>
                </View>
            </View> 
        </Container>
    )
}

export default Login