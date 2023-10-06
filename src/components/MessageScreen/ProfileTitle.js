import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'

import styles from './profileTitlestyle'
import { IMAGES } from '../../constant/Strings';

const ProfileTitle = ({ names, myUid, uid,received,img }) => {
    const navigation = useNavigation()
    const imgs =img|| IMAGES.USER_IMAGE
    const [lastMsg, setLastMsg] = useState("")
    const [time, setTime] = useState("");

    const getValues = async () => {
        const value = JSON.parse(await AsyncStorage.getItem('msgData21'));
        value.map((ele) => {
            let id = myUid + ":" + uid
            let revid = uid + ":" + myUid
            if (ele.id === id || ele.id === revid) {
                let temp=ele.message[ele.message.length-1].split("#$")[2]
                setLastMsg(temp)
                setTime(`${new Date(ele.message[ele.message.length-1].split("#$")[1]).getHours()}:${new Date(ele.message[ele.message.length-1].split("#$")[1]).getMinutes()}`)
            }
        })
        
    }
    
    useEffect(() => {
        getValues()
    }, [])

    const handlePress = () => {
        navigation.popToTop();
        navigation.navigate("UserMessage", { myid: myUid, hisid: uid, hisname: names,"received":received }) 
    }
    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
    <View style={styles.boxContainer}>
                <Image style={styles.circleImg} source={{ uri: imgs }} />
                <View style={styles.flexBox}>
                    <View style={styles.detailsCont}>
                        <Text style={styles.namesStyle}>{names}</Text>
                        <Text numberOfLines={3} style={styles.lastMessage}>{lastMsg}</Text>
                    </View>
                    <Text style={styles.timeText}>{ time}</Text>
                </View>
</View>
        </TouchableOpacity>
  )
}


  
export default ProfileTitle