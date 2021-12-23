import { Container, Content } from 'native-base'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, Platform, Dimensions} from 'react-native'
import auth from '@react-native-firebase/auth';
import Loader from 'react-native-modal-loader';
const { width, height } = Dimensions.get('window');

 const Welcome = props => {
    const [Load, setLoad] = useState(false)
    return (
        <Container style={{paddingVertical:height*.07, paddingHorizontal:24, justifyContent: 'space-between',}}> 
            <Loader loading={Load} color="#F04758" />  
            <Text style={{fontSize: 24, fontWeight: 'bold', letterSpacing: 1, textAlign:'center' }}>Welcome</Text> 
            <Text style={{fontSize: 18, fontWeight: '700', color:'grey', letterSpacing: 1, textAlign:'center' }}>Hi there! Nice to see you.</Text>
            <TouchableOpacity activeOpacity={.8}
                style={{backgroundColor:'#F04758', marginTop:24, padding:12, borderRadius:4, alignItems: 'center'}}
                onPress={() =>  props.navigation.push('pagelist')}>
            <Text style={{color:'#fff', fontWeight: '700', letterSpacing: 1,  }}>List</Text>
            </TouchableOpacity>
        </Container>
    )
}
export default Welcome