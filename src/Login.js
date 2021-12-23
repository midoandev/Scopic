import { Container, Input } from 'native-base'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Alert, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from 'react-native-modal-loader';

const Login = props => {
    
    const refPass= useRef(null)
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [SecurePass, setSecurePass] = useState(true)
    const [Load, setLoad] = useState(false) 
    
    const SubmitLogin = () => {
        setLoad(true)
        console.log(Email, Password)
        if (Email == '' || Password == ''){
            setLoad(false)
            Alert.alert('Error', 'Please fill out the form')
        } else { 
            auth().signInWithEmailAndPassword(Email, Password)
            .then(res => { 
                console.log('success login', res);

                setTimeout(() => {
                    setLoad(false) 
                    props.navigation.replace('App')
                }, 1000);
            })
            .catch(error => { 
                const a = String(error)
                const aa = a.indexOf('] ')
                const b = a.substring(aa+1, a.length - 1) 
                console.log('error', error);
                Alert.alert('Error', b)
                setLoad(false)
            }); 
        }
    }
  
    return (
        <KeyboardAvoidingView behavior={"padding"} style={{justifyContent: 'center', padding:24, flex:1}}>
            <Loader loading={Load} color="#F04758" /> 
            
            <View style={{ justifyContent: 'center', alignItems:'center',flex:.5}}>
                <Text style={{color:'#A4AEB8', fontSize: 20, fontWeight: 'bold', letterSpacing: 1}}>Scopic</Text>
            </View>
            <Text style={{fontSize: 24, fontWeight: 'bold', letterSpacing: 1, marginBottom:40, }}>Sign In</Text>
                
            
            <Text style={{color:'#F04758', fontWeight: '700', letterSpacing: 1, lineHeight:23 }}>Email</Text>
            <View style={{borderBottomWidth:1, borderBottomColor:'#ccc',height:50, flexDirection:'row', }}> 
                <TextInput
                    style={{flex:1 }}
                    onChangeText={tx => setEmail(tx)}
                    value={Email}
                    placeholder='Your email address' 
                    keyboardType='email-address'
                    onSubmitEditing={() => refPass.current.focus()}
                />
            </View> 

            <Text style={{color:'#F04758', fontWeight: '700', letterSpacing: 1, lineHeight:23, marginTop:24 }}>Password</Text>
            <View style={{borderBottomWidth:1, borderBottomColor:'#ccc',height:50, flexDirection:'row', }}> 
                <TextInput
                    ref={refPass}
                    onChangeText={tx => setPassword(tx)} 
                    value={Password}
                    style={{flex:1 }}
                    placeholder='Your password'
                    keyboardType='default'  
                    secureTextEntry={SecurePass}
                    onSubmitEditing={() =>  SubmitLogin()}
                />
            
                <TouchableOpacity style={{alignItems: 'center',justifyContent: 'center', width: '10%'}}
                    onPress={() => setSecurePass(prev => !prev)}>
                    <FontAwesome name={SecurePass ? "eye-slash" :"eye"} size={18} color={!SecurePass ? "#F04758" :"#ccc"} />
                </TouchableOpacity>
            </View>


            <TouchableOpacity activeOpacity={.8}
                style={{backgroundColor:'#F04758', marginTop:24, padding:12, borderRadius:4, alignItems: 'center'}}
                onPress={() => SubmitLogin() }>
            <Text style={{color:'#fff', fontWeight: '700', letterSpacing: 1,  }}>Sign In</Text>
            </TouchableOpacity>


            <View style={{ justifyContent: 'center', alignItems:'flex-end',flex:.5}}>
                <Text onPress={() => props.navigation.push('Register')} style={{color:'#F04758', fontWeight: 'bold', letterSpacing: 1, }}>Sign Up</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login