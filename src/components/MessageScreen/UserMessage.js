import { CometChat } from '@cometchat-pro/react-native-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import {Image, ScrollView, Text,View,TouchableOpacity,TextInput,StyleSheet, Alert} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var obj = require("lodash");
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './userMessageStyle';
import { IMAGES, STRING } from '../../constant/Strings';
import LoadingBar from '../LoadingBar/LoadingBar';

const UserMessage = () => {
    const scrollViewRef = useRef();
    const route = useRoute()
    const {myid,hisid,hisname,received} = route.params
    
    const [msgtxt, setMsgtxt] = useState("")

    const [allmsg, setAllMsg] = useState([])

    const [mili, setMilli] = useState(0)
    
    const [date, setDate] = useState("")
    
    const [msgSent, setMsgSent] = useState(false)
    
    const [msgGroup, setMsgGroup] = useState([])

    const [loading,setLoading] = useState(false)
    
    

    const navigation = useNavigation()
    
    const handleBack = () => {
        navigation.popToTop();
        navigation.navigate("MessageScreen",{id:myid,received:msgSent||received})
    }
    
    
    useEffect(() => {
        
        getValue()
    }, [allmsg])
    useEffect(() => {
        recieveAllMsg()  
        setTimeout(() => {
            scrollViewRef.current.scrollToEnd()  
        },200)
    },[])
    
    //recieve all message
    const recieveAllMsg = () => {
        let UID = hisid;
        let limit = 30;
        let messagesRequest = new CometChat.MessagesRequestBuilder()
												.setUID(UID)
												.setLimit(limit)
												.build();

        messagesRequest.fetchPrevious().then(
            messages => {
                getValue()
            }, error => {
                Alert.alert("Message fetching failed with error:", error);
            }
        );
    }

    //recieve all message
    const getValue = async () => {
        const value = JSON.parse(await AsyncStorage.getItem('msgData21'));
        value.map((ele) => {
            let id = myid + ":" + hisid
            let revid = hisid + ":" + myid
            if (ele.id === id || ele.id === revid) {
                setAllMsg(ele.message)
                const result = obj.groupBy(ele.message, (ele1) => new Date(ele1.split("#$")[1]).getDate()+new Date(ele1.split("#$")[1]).getMonth()+new Date(ele1.split("#$")[1]).getFullYear());
                setMsgGroup(result)
            }
        })
    
    }
    const checkIteminAsync = async (msg) => {
            let id = myid + ":" + hisid
            let revid = hisid + ":" + myid
            const existingData = await AsyncStorage.getItem("msgData21");
            const dataArray = JSON.parse(existingData) || [];
            const temp = dataArray.filter((val) => {
                return val.id === id || val.id===revid;
            });
            
            if (temp.length > 0) {
                const temp1 = dataArray.map((val) => {
                    if (val.id === id || val.id === revid) {
                        val.message = [...val.message, msg]
                        val.mil=(new Date()).getTime()
                    }
                    
                });
                
                await AsyncStorage.setItem("msgData21", JSON.stringify(dataArray)).then(() => {
                   
                    getValue()
                })
            } else {
                let y = { id: id, message: [msg],mil:(new Date()).getTime() }
                dataArray.push(y)
                await AsyncStorage.setItem("msgData21", JSON.stringify(dataArray)).then(() => getValue());
                
            }
            
          
       
    }
    const getInMillis = async() => {
        
CometChat.tagConversation(hisid, 'user').then(
    conversation => {
        setMilli(conversation.lastMessage.rawMessage.sentAt)
    }, error => {
        Alert.alert('error while fetching a conversation', error);
    }
);
    }
    

    const handlelogout = () => {
        setLoading(true)
        CometChat.logout().then(
            () => {
                setLoading(false)
                Alert.alert("Logout success")
                navigation.navigate("Login")
            }, error => {
                setLoading(false)
                Alert.alert("Logout failed with exception:",{error});
              }
          );
        
    }
    
    const handleMsgSend = (msg) => {
        
        setMsgtxt("")
        scrollViewRef.current.scrollToEnd()
        let receiverID = hisid;
        let time=new Date()
        let messageText = myid+"#$"+time.toString()+"#$"+msg;
        let receiverType = CometChat.RECEIVER_TYPE.USER;
        let textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

        if (msg.trim().length > 0) {
            
                CometChat.sendMessage(textMessage).then(
                    message => {    
                        scrollViewRef.current.scrollToEnd()
                        setMsgSent(true)
                            checkIteminAsync(myid+"#$"+time.toString()+"#$"+msg)
                            
                    }, error => {
                        Alert.alert("Message sending failed with error:", error);
                    }
            )
            
            
        }
    }

    const handleMsgText = (text) => setMsgtxt(text)
    const handleSend = ()=>handleMsgSend(msgtxt)
    return (
        <View style={styles.container}>
            {loading && <LoadingBar/>}
            <View style={styles.headerBox}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image style={styles.headerImg} source={IMAGES.BACK_IMAGE} />
                        </TouchableOpacity>
                    <Text style={styles.headerText}>{hisname}</Text>
                    <TouchableOpacity onPress={handlelogout}>
                        <Image style={styles.headerImg} source={IMAGES.LOGOUT_IMAGE} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.msgBoxContainer}>
                <View style={styles.msgBox}>
                    <ScrollView ref={scrollViewRef} style={styles.msgScroll}>
                        {Object.entries(msgGroup).map(([key, value]) => {
                            
                            
                            if (Array.isArray(value)) {
                            
                            return value.map((ele,ind) => (
                                
                        <View key={ele} >
                        
                                
                                    {ind==0 && 
                                        <View style={styles.dateBox}>
                                    <View style={styles.dateStrip} />
                                            <Text style={{ fontSize: 9 }}>{`${new Date(ele.split("#$")[1]).getDate() === (new Date()).getDate() ? "Today" : `${new Date(ele.split("#$")[1]).getDate()}-${new Date(ele.split("#$")[1]).getMonth() + 1}-${new Date(ele.split("#$")[1]).getFullYear().toString().substring(2)}`}`}</Text>
                                            <View style={styles.dateStrip} />
                                </View>
                                    }
                                    
                                
                                <View style={{backgroundColor: ele.split('#$')[0]==myid?'#047BD5':'grey', alignSelf:ele.split('#$')[0]==myid?'flex-end':'flex-start',marginHorizontal:20, marginTop: 20, borderTopLeftRadius: 40,marginEnd:8, borderTopRightRadius: 40, borderBottomLeftRadius: 40,marginBottom:20,flexDirection:'row', }}>
                                <Text numberOfLines={2} style={styles.msgTextDesign}>
                                    {
                                       ele.split("#$")[2]
                                    }
                                </Text>
                                <View style={{flexDirection:'column'}}>
                                    
                                    <Text style={styles.timeFont}>{`${new Date(ele.split("#$")[1]).getHours()}:${new Date(ele.split("#$")[1]).getMinutes()}` }</Text>
                                </View>
                                    </View>
                                    </View>
                   
                            ));
                        }
                    })}
                    </ScrollView>
                </View>
             <View style={styles.bottomScroll}>
          <View
            style={styles.sendBoxContainer}>
          <View
              style={styles.sendBox}>
              <TouchableOpacity onPress={getValue} >
            <Image
              source={IMAGES.ATTACH_IMAGE}
              style={styles.attachImg}
            />
              </TouchableOpacity>
            
          </View>
          
            <TextInput
            style={styles.sendInputbox}
              placeholder={STRING.SEND_MSG}
              autoCapitalize="none"
              value={msgtxt}
              onChangeText={handleMsgText}
              spellCheck={false}
              
            />
          
          <View
              style={styles.sendImgContainer}>
                <TouchableOpacity onPress={handleSend}>
                    <Image
                        source={IMAGES.SEND_IMAGE}
                        style={styles.sendImg}
                    />
                </TouchableOpacity>
          </View>
        </View>
    </View>
    </View>
</View>
  )
}

  
export default UserMessage