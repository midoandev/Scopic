import { Container } from 'native-base'
import React, { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Loader from 'react-native-modal-loader';

const Register = props => {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [SecurePass, setSecurePass] = useState(true)
    const [Load, setLoad] = useState(false) 
    
    const signUpHere = () => {
        auth().createUserWithEmailAndPassword(Email, Password)
        .then(respon => {
            console.log('User account created & signed in!')
            setTimeout(() => {
                setLoad(false) 
                props.navigation.replace('App')
            }, 1000);
        })
        .catch(error => { 
            const a = String(error) //set to string
            const aa = a.indexOf('] ') //check index
            const b = a.substring(aa+1, a.length - 1) //get text from error string after indext aa
            console.log('error', error);
            Alert.alert('Error', b)
            setLoad(false)
        }); 
        
    }
  
    return (
        <Container style={{padding:24, paddingTop: 80}}>
            <Loader loading={Load} color="#F04758" />  
            <Text style={{fontSize: 24, fontWeight: 'bold', letterSpacing: 1, marginBottom:40, }}>Sign Up</Text>
                
            
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
                style={{backgroundColor:'#F04758', marginTop:80, padding:12, borderRadius:4, alignItems: 'center'}}
                onPress={() => {
                    if (Email == '' || Password == ''){
                        Alert.alert('Error', 'Please fill out the form')
                    } else {
                        setLoad(true)
                        signUpHere()
                    }
                }}>
            <Text style={{color:'#fff', fontWeight: '700', letterSpacing: 1,}}>Sign Up</Text>
            </TouchableOpacity>


            <View style={{ alignItems:'center', padding:16, flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color:'grey', fontWeight: '500', letterSpacing: 1, }}>Have an account?</Text>
                <Text onPress={() => props.navigation.goBack()} 
                    style={{color:'#F04758', fontWeight: 'bold', paddingHorizontal:4}}>Sign up</Text>
            </View>
        </Container>
    )
}

export default Register
