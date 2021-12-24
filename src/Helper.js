import React, { useEffect, useState } from "react";
import { Dimensions, KeyboardAvoidingView, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
const { width, height } = Dimensions.get('window');

export const generateTime = () => {
    const newDate = new Date();
  
    const date = newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/[^0-9]/g, "");
  
    const time = newDate.getTime().toString();
  
    return date + time;
}
export const PopupAddList = ({ visible, close, submit }) => {
    // let lyn = st.selectedLayanan != '' ? Number(st.selectedLayanan.BiayaTotal) : 0
    // let hrgBrg = Number(st.barang.nilai)*0.0025
    // let asuransi = st.asuransiCheckBox ? Math.ceil(hrgBrg+5000) : 0 
    // let ttl = lyn+asuransi
    const [TextList, setTextList] = useState('')

    useEffect(() => {
        const a = setTextList('')
        return a
    }, [visible])
 
    return(
      <Modal
        animationType={'none'}
        transparent={true}
        visible={visible}
        onRequestClose={() => close()}>
        <KeyboardAvoidingView behavior={"height"} style={{justifyContent: 'flex-end', flex:1, backgroundColor: '#000000AA' }}>
            <View style={{alignSelf: 'baseline', backgroundColor: '#fff', width,shadowColor: 'grey',
                shadowOffset: { width: 2, height: 2 }, shadowOpacity: .4, borderTopLeftRadius: 20,
                borderTopRightRadius: 20,paddingHorizontal: 20, paddingVertical:28,}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom:32}}>
                    <Text style={{fontWeight: '500', fontSize: 18, lineHeight: 18.23, letterSpacing: .25}}>Add to list</Text>
                    <TouchableOpacity onPress={() => close()}>
                        <AntDesign name='closecircleo' size={22} color={'black'} />
                    </TouchableOpacity> 
                </View>
                <View style={{borderWidth:1, borderColor:'#ccc',height:50, borderRadius: 8}}> 
                    <TextInput 
                        style={{flex:1, paddingHorizontal:12}}
                        onChangeText={tx => tx.length < 41 && setTextList(tx)}
                        value={TextList}
                        placeholder='Your text'  
                        onSubmitEditing={() => TextList !=='' && submit(TextList)}
                    />
                </View>
                <View style={{flexDirection:'row', alignItems: 'center', padding:4, justifyContent: 'flex-end'}}>
                    <Text style={{fontWeight: '400', fontSize: 15,  letterSpacing: 2, color: 'darkgreen'}}>{TextList.length}</Text>
                    <Text style={{fontWeight: '400', fontSize: 12,  letterSpacing: 1}}>{'/40'}</Text>
                </View>

                <TouchableOpacity activeOpacity={.8}
                    disabled={TextList==''}
                    style={{backgroundColor:TextList==''?'#ccc':'#F04758', marginTop:16, padding:12, borderRadius:4, alignItems: 'center', marginBottom:16 }}
                    onPress={() => submit(TextList)}>
                    <Text style={{color:'#fff', fontWeight: '700', letterSpacing: 1,  }}>Add</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
      </Modal>
    )
}
