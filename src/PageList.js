import { Container, Content } from 'native-base'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, Platform } from 'react-native'

import auth from '@react-native-firebase/auth';
import Loader from 'react-native-modal-loader';

 const Welcome = props => {
    const [Load, setLoad] = useState(false)
    return (
        <Container style={{paddingTop: Platform.OS == 'ios' ? 80 : 20, padding:16}}> 
            <Loader loading={Load} color="#F04758" />  
                <Text>Welcome</Text>  
            <TouchableOpacity activeOpacity={.8}
                style={{backgroundColor:'#F04758', marginTop:24, padding:12, borderRadius:4, alignItems: 'center'}}
                onPress={() => {
                    Alert.alert(
                        'Log Out',
                        'Are you sure want log out?',
                        [
                            {
                                text: "No",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { 
                                text: "Yes", 
                                onPress: () => {
                                    auth().signOut()
                                        .then(() => {        
                                            setLoad(false)
                                            props.navigation.replace('Auth')
                                        })
                                        .catch(err => Alert.alert('Error', err))
                                }
                            }
                        ],
                        );
                    
                }}>
            <Text style={{color:'#fff', fontWeight: '700', letterSpacing: 1,  }}>Log Out</Text>
            </TouchableOpacity>
        </Container>
    )
}
export default Welcome