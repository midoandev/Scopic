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
import { generateTime, PopupAddList } from './Helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PageList = props => { 
    const DataUser = JSON.parse(props.route.params.DataSesi)
    const [Load, setLoad] = useState(false)
    const [Swticed, setSwticed] = useState(true)
    const [ShowForm, setShowForm] = useState(false)
    const [List, setList] = useState([])
    const useDatabe = database().ref(`/users/${DataUser.uid}`)

    useEffect(() => {
        ReadItem()
    }, [Swticed, Load])

    const ReadItem = () => {
        if (Swticed){
            useDatabe.orderByChild("date").once('value').then(snapshot => {
                console.log('User data: ', snapshot ); 
                let mylist = []
                snapshot.forEach(child => {
                    let key = child.key
                    let obj = snapshot.child(key).val()
                    let value = obj.value
                    let trim = value.trim()
                    let removeSpace = trim.replace(/ +/g, "");
                    let result =  removeSpace.charAt(0).toUpperCase() + removeSpace.slice(1);
                    
                    mylist.push({id: key, value:result, date: obj.date})
                });
                console.log('m', mylist) 
                setList(mylist.reverse())
            });
        } else {
            //AsyncStorage.removeItem(DataUser.uid) //for reset asyncstorage
            AsyncStorage.getItem(DataUser.uid).then(vl => {
                console.log('itemm', vl)
                if (vl != null){
                    let parse = JSON.parse(vl)
                    setList(parse)
                } else {
                    setList([])
                }
            })
        }
 
    }
 
    const AddItem = (text) => {
        setLoad(true)
        let data = { value: text, date: Math.round(+new Date()/1000)} 
        if (Swticed){ 
            useDatabe.push(data)
                .then(() => {
                    setShowForm(false) 
                    setLoad(false)
                    Toast.show({type:'success', text:'Successfully added'})
                })
                .catch(err => { 
                    setShowForm(false) 
                    setLoad(false)
                    Toast.show({type:'danger', text: err})
                })
        } else {
            let id = List.length>0 ? List[0].id+1 : 0
            let addId = {...data, id}
            let list = [addId, ...List]
            AsyncStorage.setItem(DataUser.uid, JSON.stringify(list))
                .then(() => { 
                    setShowForm(false) 
                    setLoad(false)
                    Toast.show({type:'success', text:'Successfully added'})
                })
        }
    }

    const DeleteItem = (item) => {
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
                        setLoad(true)
                        if (Swticed){ 
                            useDatabe.child(item.id).remove().then(e => { 
                                setLoad(false)
                                Toast.show({type:'success', text: 'Successfully deleted'})
                            })
                        } else {
                            let changeList = List.filter(ar => ar.id !== item.id) 
                            AsyncStorage.setItem(DataUser.uid, JSON.stringify(changeList))
                                .then(() => {  
                                    setLoad(false)
                                    Toast.show({type:'success', text: 'Successfully deleted'})
                                })
                        }
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
                submit={text => AddItem(text)}
            />
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Switch
                    trackColor={{false: '#ccc', true:'green' }}
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
                    <Swipeable key={index}
                        renderRightActions={() => 
                            <TouchableOpacity onPress={()=> DeleteItem(item)} activeOpacity={.8} style={{ backgroundColor: '#F15858', justifyContent: 'center', paddingHorizontal:48,  }} >
                                <FontAwesome name='trash-o' size={24} color={'white'} /> 
                            </TouchableOpacity>
                        }
                        onSwipeableRightOpen={() => DeleteItem(item)} 
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