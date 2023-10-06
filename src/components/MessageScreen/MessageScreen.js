import React, { useEffect, useState } from 'react'
import { ScrollView, Text,View,Image,TouchableOpacity,TextInput, StyleSheet,Modal } from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import ProfileTitle from './ProfileTitle';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from './messageScreenStyle';

import { STRING,IMAGES } from '../../constant/Strings';


const MessageScreen = () => {
  
  const [searchText, setSearchText] = useState("");
  const [allUser, setAllUser] = useState([])
  const [finalUser, setFinalUser] = useState([])
  const [showError,setShowError]=useState(false)
    const route = useRoute()
  const { id,received } = route.params
  
  const navigation = useNavigation()
    
    const getAllUser = () => {
        const usersRequestBuilder = new CometChat.UsersRequestBuilder();
        usersRequestBuilder.limit = 50;
        const usersRequest = usersRequestBuilder.build();
      let temp;
        usersRequest.fetchNext().then((users) => {
            temp = users.filter((ele) => { return( ele.uid != id) })

        }).then(() => {
          getValues(temp)
        }).then(() => {
          
          setAllUser(temp)
        })
    }
  
  

  useEffect(() => {
    getAllUser()
  }, [])
  
  
  
  const getValues = async (temp1) => {
      const value = JSON.parse(await AsyncStorage.getItem('msgData21'));
      let temp2=[]
      value.map((ele) => {
          if (ele.message.length>0) {
              temp2.push(ele)
          }
      })
    temp2.sort((a, b) => {
      return  b.mil-a.mil;
    })
    let final = [];
    if (temp1.length > 0) {
      temp2.forEach(val => {
        temp1.forEach(ele => {
          if ((val.id.split(":")[0].trim() === id && val.id.split(":")[1].trim() === ele.uid.trim()) || (val.id.split(":")[0].trim() === ele.uid.trim() && val.id.split(":")[1].trim() === id)) {
            final.push(ele)
          }
          
        })
      })
    } 
    
   
   
    setFinalUser(final)
    
  }

  //handleSearch
  const handleSearch = (text) => {
    
    const searchedUser = allUser.filter((ele) => ele.name.toLowerCase().includes(text.trim().toLowerCase()))
    if (searchedUser.length > 0) {
      setFinalUser(searchedUser)
      setShowError(false)
    } else {
      setShowError(true)
    } 
  }

  const handleSearchChangeText =(text) => {
    setSearchText(text)
    if (text.trim().length > 0) {
      handleSearch(text)
    } else {
      setShowError(false)
      getAllUser()
    }
    
  }
  return (
      <View style={styles.container}>
          <View >
        <Text style={styles.headerText}>{STRING.MESSAGE_HEADING }</Text>
          <View
            style={styles.searchContainer}>
          <View
              style={styles.searchbox}>
              <TouchableOpacity >
              <Image
              source={IMAGES.SEARCH_IMAGE}
              style={styles.searchImg}
            />
              </TouchableOpacity>
            
          </View>
            <TextInput
            style={styles.searchInput}
              placeholder={STRING.SEARCH_TEXT}
            autoCapitalize="none"
            value={searchText}
            onChangeText={handleSearchChangeText}
              spellCheck={false}
            />
          
          <View
              style={styles.micView}>
            
              </View>
              </View>
              <View style={styles.borderStripe} />
      </View>
      
      
        
      {showError && <Text style={styles.errorMsg}>{ STRING.NO_USER_FOUND}</Text>  } 
          {!showError &&<ScrollView style={styles.msgScroll}>
              {finalUser.map((ele)=><ProfileTitle img={ele.avatar} received={received} myUid={id} uid={ele.uid} names={ele.name} key={ele.uid} />)}
          </ScrollView>}
    </View>
  )
}



export default MessageScreen