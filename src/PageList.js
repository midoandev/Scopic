import { Container, Content, Toast } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, Platform, Dimensions, Switch, View, FlatList } from 'react-native' 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
const { width, height } = Dimensions.get('window');
import Loader from 'react-native-modal-loader';
import { PopupAddList } from './Helper';

 const PageList = props => { 
    const DataUser = JSON.parse(props.route.params.DataSesi)
    const [Load, setLoad] = useState(false)
    const [Swticed, setSwticed] = useState(true)
    const [ShowForm, setShowForm] = useState(false)
    const [List, setList] = useState([])
    const useDatabe = database().ref(`/users/${DataUser.uid}`)

    useEffect(() => {
        const onValueChange = useDatabe.orderByKey('createdAt')
          .on('value', snapshot => {
            console.log('User data: ', snapshot ); 
            let mylist = []
            snapshot.forEach(child => {
                let key = child.key
                let obj = snapshot.child(key).val()
                let value = obj.value
                let trim = value.trim()
                let removeSpace = trim.replace(/ +/g, "");
                let result =  removeSpace.charAt(0).toUpperCase() + removeSpace.slice(1);
                
                mylist.push({id: key, value:result, createdAt: obj.createdAt})
            });
            console.log('m', mylist) 
            setList(mylist)
          });
    
        // Stop listening for updates when no longer required
        return () => useDatabe.off('value', onValueChange);
    }, [DataUser.uid])
 
    const RemoveItem = (item) => {
        Alert.alert(
            'Alert!',
            'Are you sure you want to delete '+item.value+'?',
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { 
                    text: "Yes, delete", 
                    onPress: () => {
                        useDatabe.child(item.id).remove().then(e => {
                            console.log('resRemove', e) 
                            Toast.show({type:'success', text: 'Successfully deleted'})
                        })
                    }
                }
            ],
        );

        
    }
    return (
        <Container style={{padding:24}}> 
            <Loader loading={Load} color="#F04758" />
            <PopupAddList 
                visible={ShowForm} 
                close={() => setShowForm(false)} 
                submit={text => {
                    const d = new Date();
                    let data = { value: text, createdAt: d.toString()} 
                    useDatabe.push(data)
                        .then(() => {
                            setShowForm(false) 
                            Toast.show({type:'success', text:'Successfully added'})
                        })
                        .catch(err => { 
                            setShowForm(false) 
                            Toast.show({type:'danger', text: err})
                        })
                }}
            />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Switch
                    trackColor={{false: '#ccc' }}
                    thumbColor={'#fff'}
                    ios_backgroundColor="#eee"
                    onValueChange={v =>  setSwticed(v) }
                    value={Swticed}
                />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingVertical:16}}
                data={List}
                renderItem={({item, index}) =>( 
                    <Swipeable 
                        renderRightActions={() => 
                            <TouchableOpacity onPress={()=> RemoveItem(item)} activeOpacity={.8} style={{ backgroundColor: '#F15858', justifyContent: 'center', paddingHorizontal:48,  }} >
                                <FontAwesome name='trash-o' size={24} color={'white'} /> 
                            </TouchableOpacity>
                        }
                        onSwipeableRightOpen={() => RemoveItem(item)} 
                    >
                        <View style={{borderBottomColor: '#eee', alignItems: 'center', borderBottomWidth:1, paddingVertical:16, flexDirection: 'row',}} key={index}>
                            <Text style={{fontWeight: '500', fontSize: 16, lineHeight: 20}}>{item.value}</Text>
                        </View>
                    </Swipeable>
                )}
                ListEmptyComponent={() => 
                    <View style={{flex: 1, marginTop:24,flexDirection: 'column', alignItems:'center', justifyContent:'center' ,}}>
                        <Text>Data not found</Text>
                    </View>
                }
                keyExtractor = {item => item.id}
            /> 
            

            <TouchableOpacity style={{width:48, height: 48, borderRadius:48, backgroundColor: '#F15934', alignItems: 'center',
                justifyContent:'center', position: 'absolute', bottom: height*.15, right: 20}}
                onPress={() => setShowForm(true)}>
                <FontAwesome5 name='plus' size={22} color={'white'} />
            </TouchableOpacity>
        </Container>
    )
}
export default PageList