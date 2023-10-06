import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Image,
    Alert,
    TouchableOpacity,
} from 'react-native';
  

import { CometChat } from '@cometchat-pro/react-native-chat';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import styles from '../LoginScreen/style';
import { STRING,IMAGES} from '../../constant/Strings';
import LoadingBar from '../LoadingBar/LoadingBar';

const Register = () => {
    const [isSignUp, setIsSignUp] = useState(false)
    const navigation = useNavigation()
    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("");
    const [loading,setLoading] = useState(false)
    
    function handleSignUp(uuid,Name) {
        setLoading(true)
        let authKey = STRING.AUTH_KEY;
        let uid = uuid.trim()
        let name = Name.trim()

        let user = new CometChat.User(uid);

        user.setName(name);

        CometChat.createUser(user, authKey).then(
            user => {
            setLoading(false)
            
            Alert.alert(STRING.SIGNUP_SUCCESS_MESSAGE)
                navigation.navigate("Login")
                setIsSignUp(true)
          }, error => {
            setLoading(false)
            Alert.alert(STRING.SIGNUP_ERROR_MESSAGE)
            }
        );
    }
  
  const handleUserId = (text) => { setUuid(text) }
  const handleName = (text) => setName(text)
  const handleSignupCall = () => handleSignUp(uuid, name)
  const handleLoginNavigate = ()=>navigation.navigate("Login")
    return (
    
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        {loading && <LoadingBar/>}
          <Image source={IMAGES.LOGO} style={styles.profileImage} />
          
          <View style={styles.card}>
          <View style={styles.cardBox}>
            <Text style={styles.headerText}>{ STRING.REGISTER_PAGE_HEADING}</Text>
            <TextInput
              style={styles.input}
              placeholder={STRING.USER_ID}
              
              onChangeText={handleUserId}
            />
            <View style={styles.sectionStyle}>
              <TextInput
                style={styles.nameInput}
                placeholder={STRING.NAME}
                onChangeText={handleName}
              />
              
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.registerBtn}
                    onPress={handleSignupCall}
          >
            <Text style={styles.registerText}>{STRING.REGISTER_PAGE_HEADING.split(' ')[0] }</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLoginNavigate}>
            <Text style={styles.loginText}>
              {STRING.OLD_USER}
            </Text>
          </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
     
    );
  };
  
  

export default Register